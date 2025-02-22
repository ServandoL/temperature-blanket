import { ForecastDatasource } from './datasource/ForecastDatasource';
import { BaseContext } from '@apollo/server';
import { ForecastDay, ForecastItem } from '../__generated__/graphql';

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
