import * as Types from '../__generated__/types.server';

export type ForecastQueryVariables = Types.Exact<{
  input: Types.ForecastInput;
}>;


export type ForecastQuery = { __typename?: 'Query', forecast?: { __typename?: 'ForecastResponse', data?: { __typename?: 'ForecastItem', _id?: string | null, forecast?: { __typename?: 'Forecast', forecastday?: Array<{ __typename?: 'ForecastDay', date?: string | null, date_epoch?: number | null, day?: { __typename?: 'ForecastDayDetail', avgtemp_f?: number | null } | null } | null> | null } | null } | null } | null };

export type HistoryQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type HistoryQuery = { __typename?: 'Query', history?: { __typename?: 'HistoryResponse', data?: Array<{ __typename?: 'ForecastItem', _id?: string | null, forecast?: { __typename?: 'Forecast', forecastday?: Array<{ __typename?: 'ForecastDay', date?: string | null, date_epoch?: number | null, day?: { __typename?: 'ForecastDayDetail', avgtemp_f?: number | null } | null } | null> | null } | null } | null> | null } | null };

export type UpdateMissingDaysQueryVariables = Types.Exact<{
  input: Types.UpdateMissingDaysInput;
}>;


export type UpdateMissingDaysQuery = { __typename?: 'Query', updateMissingDays?: { __typename?: 'UpdateMissingDaysResponse', success?: boolean | null, datesMissing?: Array<string | null> | null } | null };
