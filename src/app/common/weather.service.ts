import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_FORECAST_QUERY, GET_HISTORY_QUERY } from './queries';
import {
  ForecastQuery,
  ForecastQueryVariables,
  HistoryQuery,
  HistoryQueryVariables,
} from './queries.generated';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private readonly apollo: Apollo) {}

  public getHistory(): Observable<HistoryQuery> {
    return this.apollo
      .watchQuery<
        HistoryQuery,
        HistoryQueryVariables
      >({ query: GET_HISTORY_QUERY })
      .valueChanges.pipe(map((data) => data.data));
  }

  public getForecast(
    variables: ForecastQueryVariables
  ): Observable<ForecastQuery> {
    return this.apollo
      .watchQuery<ForecastQuery, ForecastQueryVariables>({
        query: GET_FORECAST_QUERY,
        variables,
      })
      .valueChanges.pipe(map((data) => data.data));
  }
}
