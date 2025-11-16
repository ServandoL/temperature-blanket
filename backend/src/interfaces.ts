import { ForecastDatasource } from './datasource/ForecastDatasource';
import { BaseContext } from '@apollo/server';
import {
  ForecastDay,
  ForecastInput,
  ForecastItem,
} from '../__generated__/graphql.js';

export interface AppContext extends BaseContext {
  dataSources: AppDataSources;
}

export interface AppDataSources {
  forecast: ForecastDatasource;
}

export interface UpdateMissingDaysAggregateResponse
  extends Omit<ForecastItem, 'forecast'> {
  forecast?: {
    forecastday?: ForecastDay;
  };
}

export interface GetHistoryByDateInput extends Omit<ForecastInput, 'dt'> {
  dt?: string;
}
