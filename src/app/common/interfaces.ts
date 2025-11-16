export interface WeatherApiResponse {
  location: ILocation;
  forecast: IForecast[];
}

export interface IForecast {
  forecastday: IForecastDay[];
}

export interface IForecastDay {
  date: string;
  date_epoch: number;
  day: IForecastDayDetail;
}

export interface IForecastDayDetail {
  avgtemp_f: number;
  mintemp_f: number;
  maxtemp_f: number;
  condition: IForecastCondition;
}

export interface IForecastCondition {
  text: string;
  icon: string;
  code: number;
}

export interface ILocation {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

export interface AppFlagsResponse {
  appName: string;
  flags: FlagDescription[];
}

export interface FlagDescription {
  name: string;
  enabled: boolean;
}

export enum PublishEvents {
  FLAG = 'flag',
}

export enum Flags {
  APP_BLANKET = 'App-blanket',
}

export interface ITime {
  year: number;
  month: number;
  date: number;
}
