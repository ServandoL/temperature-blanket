import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Forecast: ResolverTypeWrapper<Forecast>;
  ForecastConditionDetail: ResolverTypeWrapper<ForecastConditionDetail>;
  ForecastCurrent: ResolverTypeWrapper<ForecastCurrent>;
  ForecastDay: ResolverTypeWrapper<ForecastDay>;
  ForecastDayAstroDetail: ResolverTypeWrapper<ForecastDayAstroDetail>;
  ForecastDayDetail: ResolverTypeWrapper<ForecastDayDetail>;
  ForecastDayHour: ResolverTypeWrapper<ForecastDayHour>;
  ForecastInput: ForecastInput;
  ForecastItem: ResolverTypeWrapper<ForecastItem>;
  ForecastResponse: ResolverTypeWrapper<ForecastResponse>;
  HistoryLocation: ResolverTypeWrapper<HistoryLocation>;
  HistoryResponse: ResolverTypeWrapper<HistoryResponse>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdateMissingDaysInput: UpdateMissingDaysInput;
  UpdateMissingDaysResponse: ResolverTypeWrapper<UpdateMissingDaysResponse>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  Float: Scalars['Float']['output'];
  Forecast: Forecast;
  ForecastConditionDetail: ForecastConditionDetail;
  ForecastCurrent: ForecastCurrent;
  ForecastDay: ForecastDay;
  ForecastDayAstroDetail: ForecastDayAstroDetail;
  ForecastDayDetail: ForecastDayDetail;
  ForecastDayHour: ForecastDayHour;
  ForecastInput: ForecastInput;
  ForecastItem: ForecastItem;
  ForecastResponse: ForecastResponse;
  HistoryLocation: HistoryLocation;
  HistoryResponse: HistoryResponse;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Query: {};
  String: Scalars['String']['output'];
  UpdateMissingDaysInput: UpdateMissingDaysInput;
  UpdateMissingDaysResponse: UpdateMissingDaysResponse;
}>;

export type ForecastResolvers<ContextType = any, ParentType extends ResolversParentTypes['Forecast'] = ResolversParentTypes['Forecast']> = ResolversObject<{
  forecastday?: Resolver<Maybe<Array<Maybe<ResolversTypes['ForecastDay']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ForecastConditionDetailResolvers<ContextType = any, ParentType extends ResolversParentTypes['ForecastConditionDetail'] = ResolversParentTypes['ForecastConditionDetail']> = ResolversObject<{
  code?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  icon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ForecastCurrentResolvers<ContextType = any, ParentType extends ResolversParentTypes['ForecastCurrent'] = ResolversParentTypes['ForecastCurrent']> = ResolversObject<{
  cloud?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  condition?: Resolver<Maybe<ResolversTypes['ForecastConditionDetail']>, ParentType, ContextType>;
  dewpoint_c?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  dewpoint_f?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  feelslike_c?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  feelslike_f?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  gust_kph?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  gust_mph?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  heatindex_c?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  heatindex_f?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  humidity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  is_day?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  last_updated?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  last_updated_epoch?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  precip_in?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  precip_mm?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  pressure_in?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  pressure_mb?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  temp_c?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  temp_f?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  uv?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  vis_km?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  vis_miles?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  wind_degree?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  wind_dir?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  wind_kph?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  wind_mph?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  windchill_c?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  windchill_f?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ForecastDayResolvers<ContextType = any, ParentType extends ResolversParentTypes['ForecastDay'] = ResolversParentTypes['ForecastDay']> = ResolversObject<{
  astro?: Resolver<Maybe<ResolversTypes['ForecastDayAstroDetail']>, ParentType, ContextType>;
  date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  date_epoch?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  day?: Resolver<Maybe<ResolversTypes['ForecastDayDetail']>, ParentType, ContextType>;
  hour?: Resolver<Maybe<Array<Maybe<ResolversTypes['ForecastDayHour']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ForecastDayAstroDetailResolvers<ContextType = any, ParentType extends ResolversParentTypes['ForecastDayAstroDetail'] = ResolversParentTypes['ForecastDayAstroDetail']> = ResolversObject<{
  is_moon_up?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  is_sun_up?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  moon_illumination?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  moon_phase?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  moonrise?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  moonset?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sunrise?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sunset?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ForecastDayDetailResolvers<ContextType = any, ParentType extends ResolversParentTypes['ForecastDayDetail'] = ResolversParentTypes['ForecastDayDetail']> = ResolversObject<{
  avghumidity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  avgtemp_c?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  avgtemp_f?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  avgvis_km?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  avgvis_miles?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  condition?: Resolver<Maybe<ResolversTypes['ForecastConditionDetail']>, ParentType, ContextType>;
  daily_chance_of_rain?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  daily_chance_of_snow?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  daily_will_it_rain?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  daily_will_it_snow?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  maxtemp_c?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  maxtemp_f?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  maxwind_kph?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  maxwind_mph?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  mintemp_c?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  mintemp_f?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  totalprecip_in?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  totalprecip_mm?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  totalsnow_cm?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  uv?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ForecastDayHourResolvers<ContextType = any, ParentType extends ResolversParentTypes['ForecastDayHour'] = ResolversParentTypes['ForecastDayHour']> = ResolversObject<{
  chance_of_rain?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  chance_of_snow?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  cloud?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  condition?: Resolver<Maybe<ResolversTypes['ForecastConditionDetail']>, ParentType, ContextType>;
  dewpoint_c?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  dewpoint_f?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  feelslike_c?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  feelslike_f?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  gust_kph?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  gust_mph?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  heatindex_c?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  heatindex_f?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  humidity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  is_day?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  precip_in?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  precip_mm?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  pressure_in?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  pressure_mb?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  snow_cm?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  temp_c?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  temp_f?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  time?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  time_epoch?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  uv?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  vis_km?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  vis_miles?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  will_it_rain?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  will_it_snow?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  wind_degree?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  wind_dir?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  wind_kph?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  wind_mph?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  windchill_c?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  windchill_f?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ForecastItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['ForecastItem'] = ResolversParentTypes['ForecastItem']> = ResolversObject<{
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  current?: Resolver<Maybe<ResolversTypes['ForecastCurrent']>, ParentType, ContextType>;
  forecast?: Resolver<Maybe<ResolversTypes['Forecast']>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['HistoryLocation']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ForecastResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ForecastResponse'] = ResolversParentTypes['ForecastResponse']> = ResolversObject<{
  data?: Resolver<Maybe<ResolversTypes['ForecastItem']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type HistoryLocationResolvers<ContextType = any, ParentType extends ResolversParentTypes['HistoryLocation'] = ResolversParentTypes['HistoryLocation']> = ResolversObject<{
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lat?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  localtime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  localtime_epoch?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  lon?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  region?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tz_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type HistoryResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['HistoryResponse'] = ResolversParentTypes['HistoryResponse']> = ResolversObject<{
  data?: Resolver<Maybe<Array<Maybe<ResolversTypes['ForecastItem']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  forecast?: Resolver<Maybe<ResolversTypes['ForecastResponse']>, ParentType, ContextType, RequireFields<QueryForecastArgs, 'input'>>;
  forecastHistoryByDate?: Resolver<Maybe<ResolversTypes['ForecastResponse']>, ParentType, ContextType, RequireFields<QueryForecastHistoryByDateArgs, 'input'>>;
  history?: Resolver<Maybe<ResolversTypes['HistoryResponse']>, ParentType, ContextType>;
  updateMissingDays?: Resolver<Maybe<ResolversTypes['UpdateMissingDaysResponse']>, ParentType, ContextType, RequireFields<QueryUpdateMissingDaysArgs, 'input'>>;
}>;

export type UpdateMissingDaysResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateMissingDaysResponse'] = ResolversParentTypes['UpdateMissingDaysResponse']> = ResolversObject<{
  datesMissing?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Forecast?: ForecastResolvers<ContextType>;
  ForecastConditionDetail?: ForecastConditionDetailResolvers<ContextType>;
  ForecastCurrent?: ForecastCurrentResolvers<ContextType>;
  ForecastDay?: ForecastDayResolvers<ContextType>;
  ForecastDayAstroDetail?: ForecastDayAstroDetailResolvers<ContextType>;
  ForecastDayDetail?: ForecastDayDetailResolvers<ContextType>;
  ForecastDayHour?: ForecastDayHourResolvers<ContextType>;
  ForecastItem?: ForecastItemResolvers<ContextType>;
  ForecastResponse?: ForecastResponseResolvers<ContextType>;
  HistoryLocation?: HistoryLocationResolvers<ContextType>;
  HistoryResponse?: HistoryResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  UpdateMissingDaysResponse?: UpdateMissingDaysResponseResolvers<ContextType>;
}>;

