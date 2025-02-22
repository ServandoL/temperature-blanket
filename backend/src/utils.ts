import Koa from 'koa';
import { log } from './index.js';

export function toError(error?: Error) {
  return {
    name: error?.name,
    message: error?.message,
    stack: error?.stack,
    cause: error?.cause,
  };
}

export function shouldTraceHeaders(ctx: Koa.Context): boolean {
  const copy = JSON.parse(JSON.stringify(ctx.headers));
  const getIntrospectionQuery = (ctx.request.body as { query?: string })?.query;
  const isQuery =
    getIntrospectionQuery?.match('query IntrospectionQuery')?.length === 1;
  const isHealthCheck = ctx.request.URL.pathname.toLowerCase().startsWith('/health');
  const shouldTrace = [isQuery, isHealthCheck].every(check => !check);
  log.info('server.koa.request', { headers: copy, request: ctx.request.body });
  return shouldTrace;
}
