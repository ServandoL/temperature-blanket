import { RESTDataSource } from '@apollo/datasource-rest';
import {
  ForecastInput,
  ForecastItem,
  ForecastResponse,
  HistoryResponse,
  UpdateMissingDaysInput,
  UpdateMissingDaysResponse,
} from '../../__generated__/graphql.js';
import { to } from 'await-to-js';
import { log } from '../index.js';
import { toError } from '../utils.js';
import { MongoRepo } from '../mongo.js';
import { $Weather } from '../common.js';
import { AnyBulkWriteOperation, Document, Filter, ObjectId } from 'mongodb';
import { GraphQLError } from 'graphql';
import { GetHistoryByDateInput, UpdateMissingDaysAggregateResponse, } from '../interfaces.js';

export class ForecastDatasource extends RESTDataSource {
  override baseURL = 'http://api.weatherapi.com/v1/';
  private readonly key;

  constructor() {
    super();
    const key = process.env['WEATHER_API_KEY'];
    if (!key) throw new Error('No key provided');
    this.key = key;
  }

  async updateMissingDays(
    input: UpdateMissingDaysInput
  ): Promise<UpdateMissingDaysResponse> {
    const loc = ForecastDatasource.name + '.updateMissingDays';
    if (input.month <= 0 || input.month >= 13) {
      throw new GraphQLError(
        'Invalid range for month. Please enter within 1 and 12.'
      );
    }
    const today = this.getToday();
    const formattedMonth = input.month.toString().padStart(2, '0');
    const daysInMonths = this.getDaysInMonth(input.month, input.year);
    const datesMap = new Map<
      string,
      UpdateMissingDaysAggregateResponse | undefined
    >();
    for (const day of daysInMonths) {
      const date = `${input.year}-${formattedMonth}-${day}`;
      if (date === today) break;
      datesMap.set(date, undefined);
    }
    const aggregate: Document[] = [
      {
        $match: {
          'forecast.forecastday.date': {
            $regex: `${input.year}-${formattedMonth}-*`,
          },
        },
      },
      {
        $unwind:
          /**
           * path: Path to the array field.
           * includeArrayIndex: Optional name for index.
           * preserveNullAndEmptyArrays: Optional
           *   toggle to unwind null and empty values.
           */
          {
            path: '$forecast.forecastday',
          },
      },
    ];
    const [mongoE, mongoD] = await to(
      MongoRepo.instance
        .collection<ForecastItem>($Weather)
        .aggregate<UpdateMissingDaysAggregateResponse>(aggregate)
        .toArray()
    );
    if (mongoE) {
      log.error({ loc, ...toError(mongoE) });
      throw new GraphQLError(mongoE.message);
    }
    for (const day of mongoD) {
      const key = day.forecast?.forecastday?.date;
      if (!key) continue;
      datesMap.set(key, day);
    }
    const missing: string[] = [];
    for (const [k, v] of datesMap.entries()) {
      if (!v) missing.push(k);
    }
    const promises = missing.map((date) =>
      this.getForecastHistoryByDate({
        q: '75080',
        dt: date,
      })
    );
    const data = (await Promise.all(promises)).filter(
      (data) => data?.forecast?.forecastday?.length
    );
    const bulkwriteRequest: AnyBulkWriteOperation[] = data.map((toInsert) => {
      const req: AnyBulkWriteOperation = {
        insertOne: {
          document: toInsert as any,
        },
      };
      return req;
    });
    if (!bulkwriteRequest.length) {
      if (missing.length) {
        return {
          success: true,
          datesMissing: [...missing, 'Dates not found in API.'],
        };
      }
      return {
        success: true,
        datesMissing: ['Dates not found in API.'],
      };
    }
    const [bulkError, bulkResult] = await to(
      MongoRepo.instance
        .collection<ForecastItem>($Weather)
        .bulkWrite(bulkwriteRequest)
    );
    if (bulkError) {
      log.error({ loc, ...toError(bulkError) });
      throw new GraphQLError(bulkError.message);
    }
    if (bulkResult?.hasWriteErrors()) {
      log.warn({
        loc,
        message: 'Bulkwrite has errors.',
        errors: bulkResult?.getWriteErrors(),
      });
      return {
        success: false,
        datesMissing: missing,
      };
    } else {
      return {
        success: true,
        datesMissing: missing,
      };
    }
  }

  async getForecastHistoryByDate(
    input: GetHistoryByDateInput
  ): Promise<ForecastItem | undefined> {
    const loc = ForecastDatasource.name + '.getForecastHistoryByDate';
    if (!input.dt) {
      throw new GraphQLError('Input dt is required.');
    }
    const params = `history.json?q=${input.q}&key=${this.key}&dt=${input.dt}`;
    const [baseError, baseResult] = await to(this.get<ForecastItem>(params));
    if (baseError) {
      console.error({ loc, ...toError(baseError) });
      throw new GraphQLError(baseError.message);
    }
    return baseResult;
  }

  async getForecast(input: ForecastInput): Promise<ForecastResponse> {
    const loc = ForecastDatasource.name + '.getForecast';
    const params = `forecast.json?q=${input.q}&key=${this.key}`;
    const [baseError, baseResult] = await to(this.get<ForecastItem>(params));
    if (baseError) {
      log.error({ loc, ...toError(baseError as Error) });
      throw new GraphQLError(baseError.message);
    }
    if (!baseResult) {
      log.warn({ loc, message: 'No Result' });
      throw new GraphQLError('No Result.');
    }
    const day = baseResult.current?.last_updated?.slice(0, 10);
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
          .insertOne({ _id, ...baseResult })
      );
      if (error) {
        log.error({ loc, error: toError(error as Error) });
        throw new GraphQLError(error.message);
      }

      return {
        data: { _id, ...baseResult },
      };
    }
    const [updateError, _] = await to(
      MongoRepo.instance.collection<ForecastItem>($Weather).findOneAndUpdate(
        {
          'current.last_updated': { $regex: day },
        },
        {
          $set: {
            ...baseResult,
          },
        }
      )
    );
    if (updateError) {
      log.error({ loc, error: toError(updateError as Error) });
      throw new GraphQLError(updateError.message);
    }

    return {
      data: { ...baseResult, ...found },
    };
  }

  async getForecastHistory(input?: ForecastInput): Promise<HistoryResponse> {
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
    if (input?.dt) {
      const { year, month } = input.dt;
      if (month <= 0 || month >= 13) {
        throw new GraphQLError(
          'Invalid range for month. Please enter within 1 and 12.'
        );
      }
      startOfYear = new Date(year, 0, 1);
      epochTimeStartOfYear = Math.floor(startOfYear.getTime() / 1000);
      endOfYear = new Date(year, 11, 31, 23, 59, 59);
      epochTimeEndOfYear = Math.floor(endOfYear.getTime() / 1000);
    }
    const query: Filter<ForecastItem> = {
      'location.localtime_epoch': {
        $gte: epochTimeStartOfYear,
        $lte: epochTimeEndOfYear,
      },
    };
    const data = await MongoRepo.instance
      .collection<ForecastItem>($Weather)
      .find(query)
      .sort({ 'forecast.forecastday.date': 1 })
      .toArray();

    return {
      data,
    };
  }

  private getToday() {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
  }

  private getDaysInMonth(month: number, year: number): string[] {
    // Create an empty array to store the days
    const days: string[] = [];

    // Use the Date object to get the number of days in the month
    const date = new Date(year, month, 0);
    const daysInMonth = date.getDate();

    // Push each day of the month to the array
    for (let day = 1; day <= daysInMonth; day++) {
      const formatted = day.toString().padStart(2, '0');
      days.push(formatted);
    }
    return days;
  }
}
