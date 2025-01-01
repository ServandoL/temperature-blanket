import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { gql } from 'graphql-tag';
import * as fs from 'node:fs';
import Koa from 'koa';
import * as http from 'node:http';
import { ApolloServer } from '@apollo/server';
import { MongoRepo } from './mongo.js';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import { toError } from './utils.js';
import pino from 'pino';
import { resolvers } from './resolvers.js';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { koaMiddleware } from '@as-integrations/koa';

export const log = pino();

(async () => {
  const PORT = +(process.env['PORT'] ?? '9001');
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const schemaPath = path.join(__dirname, 'schema.graphql');
  const typeDefs = gql`
    ${fs.readFileSync(schemaPath, 'utf8')}
  `;
  const app = new Koa();
  const httpServer = http.createServer(app.callback());
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: process.env['INTROSPECTION'] === 'true',
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await MongoRepo.prepare({ appName: 'blanket-api' });
  await server.start();

  app.use(
    cors({
      origin: '*',
    })
  );
  app.use(json());
  app.use(bodyParser());
  app.use(async (ctx, next) => {
    if (ctx.path === '/health') {
      ctx.status = 200;
      ctx.body = { message: 'ok', uptime: process.uptime() + ' seconds' };
    } else await next();
  });
  // Default error handling
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (error) {
      const message = (error as Error)?.message ?? 'INTERNAL SERVER ERROR';
      log.error({
        loc: 'default',
        error: toError(error as Error),
      });
      ctx.status = 500;
      ctx.body = JSON.stringify({ error: message });
    }
  });

  // Req/Res Trace
  app.use(async (ctx, next) => {
    const headers = {
      ...JSON.parse(JSON.stringify({ ...ctx.request.headers })),
    };
    const toTrace = !ctx.request.URL.pathname
      .toLowerCase()
      .startsWith('/health');
    if (toTrace) {
      log.info({ loc: 'server.koa.request', headers, body: ctx.request.body });
    }
    await next();
    if (toTrace) {
      log.info({ loc: 'server.koa.response', body: ctx.response.body });
    }
  });
  app.use(koaMiddleware(server));
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );
  log.info({ loc: 'server', message: 'Listening on port ' + PORT });
})().catch((err) => {
  log.error({ loc: 'server', error: toError(err) });
});
