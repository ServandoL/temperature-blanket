import { MongoRepo } from './mongo.js';
import { $Weather } from './common.js';
import {
  ForecastInput,
  ForecastItem,
  ForecastResponse,
  HistoryResponse,
} from './__generated__/graphql.js';
import { to } from 'await-to-js';
import fetch from 'node-fetch';
import { toError } from './utils.js';
import { log } from './index.js';
import { GraphQLError } from 'graphql';
import { ObjectId } from 'mongodb';

export async function getForecast(
  input: ForecastInput
): Promise<ForecastResponse> {
  const loc = 'getForecast';
  const key = process.env['WEATHER_API_KEY'];
  if (!key) throw new Error('No key provided');
  const base = new URL('http://api.weatherapi.com/v1/forecast.json');
  if (!input.q) throw new GraphQLError('q is required');
  base.searchParams.set('key', key);
  base.searchParams.set('q', input.q);
  const [baseError, baseResult] = await to(fetch(base));
  if (baseError) {
    log.error({ loc, ...toError(baseError as Error) });
    throw new GraphQLError(baseError.message);
  }
  if (!baseResult) {
    log.warn({ loc, message: 'No Result' });
    throw new GraphQLError('No Result.');
  }
  if (!baseResult.ok) {
    log.warn({
      loc,
      message: 'Error Response.',
      reason: baseResult.statusText,
    });
    throw new GraphQLError(baseResult.statusText);
  }
  const data = (await baseResult.json()) as ForecastItem;
  const day = data.current?.last_updated?.slice(0, 10);
  const [error, found] = await to(
    MongoRepo.instance.collection<ForecastItem>($Weather).findOne({
      'current.last_updated': { $regex: day },
    })
  );
  if (error) {
    log.error({ loc, error: toError(error as Error) });
    throw new GraphQLError(error.message);
  }
  if (!found) {
    const _id = new ObjectId() as any;
    const [error, _] = await to(
      MongoRepo.instance
        .collection<ForecastItem>($Weather)
        .insertOne({ _id, ...data })
    );
    if (error) {
      log.error({ loc, error: toError(error as Error) });
      throw new GraphQLError(error.message);
    }
    const out: ForecastResponse = {
      data: { _id, ...data },
    };
    return out;
  }
  const [updateError, _] = await to(
    MongoRepo.instance.collection<ForecastItem>($Weather).findOneAndUpdate(
      {
        'current.last_updated': { $regex: day },
      },
      {
        $set: {
          ...data,
        },
      }
    )
  );
  if (updateError) {
    log.error({ loc, error: toError(updateError as Error) });
    throw new GraphQLError(updateError.message);
  }
  const out: ForecastResponse = {
    data: { ...data, ...found },
  };
  return out;
}

export async function getForecastHistory(): Promise<HistoryResponse> {
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
    .collection<ForecastItem>($Weather)
    .find({
      'location.localtime_epoch': {
        $gte: epochTimeStartOfYear,
        $lte: epochTimeEndOfYear,
      },
    })
    .toArray();
  const out: HistoryResponse = {
    data,
  };
  return out;
}
