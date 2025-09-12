export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Forecast = {
  __typename?: 'Forecast';
  forecastday?: Maybe<Array<Maybe<ForecastDay>>>;
};

export type ForecastConditionDetail = {
  __typename?: 'ForecastConditionDetail';
  code?: Maybe<Scalars['Float']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  text?: Maybe<Scalars['String']['output']>;
};

export type ForecastCurrent = {
  __typename?: 'ForecastCurrent';
  cloud?: Maybe<Scalars['Float']['output']>;
  condition?: Maybe<ForecastConditionDetail>;
  dewpoint_c?: Maybe<Scalars['Float']['output']>;
  dewpoint_f?: Maybe<Scalars['Float']['output']>;
  feelslike_c?: Maybe<Scalars['Float']['output']>;
  feelslike_f?: Maybe<Scalars['Float']['output']>;
  gust_kph?: Maybe<Scalars['Float']['output']>;
  gust_mph?: Maybe<Scalars['Float']['output']>;
  heatindex_c?: Maybe<Scalars['Float']['output']>;
  heatindex_f?: Maybe<Scalars['Float']['output']>;
  humidity?: Maybe<Scalars['Float']['output']>;
  is_day?: Maybe<Scalars['Float']['output']>;
  last_updated?: Maybe<Scalars['String']['output']>;
  last_updated_epoch?: Maybe<Scalars['Float']['output']>;
  precip_in?: Maybe<Scalars['Float']['output']>;
  precip_mm?: Maybe<Scalars['Float']['output']>;
  pressure_in?: Maybe<Scalars['Float']['output']>;
  pressure_mb?: Maybe<Scalars['Float']['output']>;
  temp_c?: Maybe<Scalars['Float']['output']>;
  temp_f?: Maybe<Scalars['Float']['output']>;
  uv?: Maybe<Scalars['Float']['output']>;
  vis_km?: Maybe<Scalars['Float']['output']>;
  vis_miles?: Maybe<Scalars['Float']['output']>;
  wind_degree?: Maybe<Scalars['Float']['output']>;
  wind_dir?: Maybe<Scalars['String']['output']>;
  wind_kph?: Maybe<Scalars['Float']['output']>;
  wind_mph?: Maybe<Scalars['Float']['output']>;
  windchill_c?: Maybe<Scalars['Float']['output']>;
  windchill_f?: Maybe<Scalars['Float']['output']>;
};

export type ForecastDay = {
  __typename?: 'ForecastDay';
  astro?: Maybe<ForecastDayAstroDetail>;
  date?: Maybe<Scalars['String']['output']>;
  date_epoch?: Maybe<Scalars['Float']['output']>;
  day?: Maybe<ForecastDayDetail>;
  hour?: Maybe<Array<Maybe<ForecastDayHour>>>;
};

export type ForecastDayAstroDetail = {
  __typename?: 'ForecastDayAstroDetail';
  is_moon_up?: Maybe<Scalars['Float']['output']>;
  is_sun_up?: Maybe<Scalars['Float']['output']>;
  moon_illumination?: Maybe<Scalars['Float']['output']>;
  moon_phase?: Maybe<Scalars['String']['output']>;
  moonrise?: Maybe<Scalars['String']['output']>;
  moonset?: Maybe<Scalars['String']['output']>;
  sunrise?: Maybe<Scalars['String']['output']>;
  sunset?: Maybe<Scalars['String']['output']>;
};

export type ForecastDayDetail = {
  __typename?: 'ForecastDayDetail';
  avghumidity?: Maybe<Scalars['Float']['output']>;
  avgtemp_c?: Maybe<Scalars['Float']['output']>;
  avgtemp_f?: Maybe<Scalars['Float']['output']>;
  avgvis_km?: Maybe<Scalars['Float']['output']>;
  avgvis_miles?: Maybe<Scalars['Float']['output']>;
  condition?: Maybe<ForecastConditionDetail>;
  daily_chance_of_rain?: Maybe<Scalars['Float']['output']>;
  daily_chance_of_snow?: Maybe<Scalars['Float']['output']>;
  daily_will_it_rain?: Maybe<Scalars['Float']['output']>;
  daily_will_it_snow?: Maybe<Scalars['Float']['output']>;
  maxtemp_c?: Maybe<Scalars['Float']['output']>;
  maxtemp_f?: Maybe<Scalars['Float']['output']>;
  maxwind_kph?: Maybe<Scalars['Float']['output']>;
  maxwind_mph?: Maybe<Scalars['Float']['output']>;
  mintemp_c?: Maybe<Scalars['Float']['output']>;
  mintemp_f?: Maybe<Scalars['Float']['output']>;
  totalprecip_in?: Maybe<Scalars['Float']['output']>;
  totalprecip_mm?: Maybe<Scalars['Float']['output']>;
  totalsnow_cm?: Maybe<Scalars['Float']['output']>;
  uv?: Maybe<Scalars['Float']['output']>;
};

export type ForecastDayHour = {
  __typename?: 'ForecastDayHour';
  chance_of_rain?: Maybe<Scalars['Float']['output']>;
  chance_of_snow?: Maybe<Scalars['Float']['output']>;
  cloud?: Maybe<Scalars['Float']['output']>;
  condition?: Maybe<ForecastConditionDetail>;
  dewpoint_c?: Maybe<Scalars['Float']['output']>;
  dewpoint_f?: Maybe<Scalars['Float']['output']>;
  feelslike_c?: Maybe<Scalars['Float']['output']>;
  feelslike_f?: Maybe<Scalars['Float']['output']>;
  gust_kph?: Maybe<Scalars['Float']['output']>;
  gust_mph?: Maybe<Scalars['Float']['output']>;
  heatindex_c?: Maybe<Scalars['Float']['output']>;
  heatindex_f?: Maybe<Scalars['Float']['output']>;
  humidity?: Maybe<Scalars['Float']['output']>;
  is_day?: Maybe<Scalars['Float']['output']>;
  precip_in?: Maybe<Scalars['Float']['output']>;
  precip_mm?: Maybe<Scalars['Float']['output']>;
  pressure_in?: Maybe<Scalars['Float']['output']>;
  pressure_mb?: Maybe<Scalars['Float']['output']>;
  snow_cm?: Maybe<Scalars['Float']['output']>;
  temp_c?: Maybe<Scalars['Float']['output']>;
  temp_f?: Maybe<Scalars['Float']['output']>;
  time?: Maybe<Scalars['String']['output']>;
  time_epoch?: Maybe<Scalars['Float']['output']>;
  uv?: Maybe<Scalars['Float']['output']>;
  vis_km?: Maybe<Scalars['Float']['output']>;
  vis_miles?: Maybe<Scalars['Float']['output']>;
  will_it_rain?: Maybe<Scalars['Float']['output']>;
  will_it_snow?: Maybe<Scalars['Float']['output']>;
  wind_degree?: Maybe<Scalars['Float']['output']>;
  wind_dir?: Maybe<Scalars['String']['output']>;
  wind_kph?: Maybe<Scalars['Float']['output']>;
  wind_mph?: Maybe<Scalars['Float']['output']>;
  windchill_c?: Maybe<Scalars['Float']['output']>;
  windchill_f?: Maybe<Scalars['Float']['output']>;
};

export type ForecastInput = {
  /** yyyy-mm-dd format */
  dt?: InputMaybe<Scalars['String']['input']>;
  q: Scalars['String']['input'];
};

export type ForecastItem = {
  __typename?: 'ForecastItem';
  _id?: Maybe<Scalars['ID']['output']>;
  current?: Maybe<ForecastCurrent>;
  forecast?: Maybe<Forecast>;
  location?: Maybe<HistoryLocation>;
};

export type ForecastResponse = {
  __typename?: 'ForecastResponse';
  data?: Maybe<ForecastItem>;
};

export type HistoryLocation = {
  __typename?: 'HistoryLocation';
  country?: Maybe<Scalars['String']['output']>;
  lat?: Maybe<Scalars['Float']['output']>;
  localtime?: Maybe<Scalars['String']['output']>;
  localtime_epoch?: Maybe<Scalars['Float']['output']>;
  lon?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  region?: Maybe<Scalars['String']['output']>;
  tz_id?: Maybe<Scalars['String']['output']>;
};

export type HistoryResponse = {
  __typename?: 'HistoryResponse';
  data?: Maybe<Array<Maybe<ForecastItem>>>;
};

export type Query = {
  __typename?: 'Query';
  forecast?: Maybe<ForecastResponse>;
  forecastHistoryByDate?: Maybe<ForecastResponse>;
  history?: Maybe<HistoryResponse>;
  updateMissingDays?: Maybe<UpdateMissingDaysResponse>;
};


export type QueryForecastArgs = {
  input: ForecastInput;
};


export type QueryForecastHistoryByDateArgs = {
  input: ForecastInput;
};


export type QueryUpdateMissingDaysArgs = {
  input: UpdateMissingDaysInput;
};

export type UpdateMissingDaysInput = {
  /** mm format */
  month: Scalars['Int']['input'];
  /** yyyy format */
  year: Scalars['Int']['input'];
};

export type UpdateMissingDaysResponse = {
  __typename?: 'UpdateMissingDaysResponse';
  datesMissing?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  success?: Maybe<Scalars['Boolean']['output']>;
};
