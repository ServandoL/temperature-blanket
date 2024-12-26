import Koa from 'koa';
import { MongoRepo } from './mongo.js';
import Router from '@koa/router';
import { $Weather, IWeather } from './common.js';

await MongoRepo.prepare({ appName: 'temperature-blanket' });
const app = new Koa();
const router = new Router();
// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

router.get('/health', async (ctx) => {
  const start = Date.now();
  const ms = Date.now() - start;
  ctx.status = 200;
  ctx.body = {
    status: 'ok',
    uptimeMs: ms,
  };
});

router.get('/forecast', async (ctx, next) => {
  // Get the current date
  let currentDate = new Date();
  // Set the date to the beginning of the current year
  let startOfYear = new Date(currentDate.getFullYear(), 0, 1);
  // Convert to epoch time (in seconds)
  let epochTimeStartOfYear = Math.floor(startOfYear.getTime() / 1000);
  // Set the date to the end of the current year
  let endOfYear = new Date(currentDate.getFullYear(), 11, 31, 23, 59, 59);
  // Convert to epoch time (in seconds)
  let epochTimeEndOfYear = Math.floor(endOfYear.getTime() / 1000);
  const data = await MongoRepo.instance
    .collection<IWeather>($Weather)
    .find({
      'location.localtime_epoch': {
        $gte: epochTimeStartOfYear,
        $lte: epochTimeEndOfYear,
      },
    })
    .toArray();
  ctx.status = 200;
  ctx.body = {
    data,
  };
});

// response
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
