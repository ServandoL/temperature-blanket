import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_FORECAST_QUERY, GET_HISTORY_QUERY } from './queries';
import {
  ForecastQuery,
  ForecastQueryVariables,
  HistoryQuery,
  HistoryQueryVariables,
} from './queries.generated';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private readonly apollo: Apollo) {}

  public getHistory(): Observable<HistoryQuery | HttpErrorResponse> {
    return this.apollo
      .watchQuery<
        HistoryQuery,
        HistoryQueryVariables
      >({ query: GET_HISTORY_QUERY, fetchPolicy: 'no-cache' })
      .valueChanges.pipe(
        map((data) => data.data),
        catchError((err) => {
          console.error(err);
          return of(
            new HttpErrorResponse({
              error: err,
            })
          );
        })
      );
  }

  public getForecast(
    variables: ForecastQueryVariables
  ): Observable<ForecastQuery | HttpErrorResponse> {
    return this.apollo
      .watchQuery<ForecastQuery, ForecastQueryVariables>({
        query: GET_FORECAST_QUERY,
        variables,
        fetchPolicy: 'no-cache'
      })
      .valueChanges.pipe(
        map((data) => data.data),
        catchError((err) => {
          console.error(err);
          return of(
            new HttpErrorResponse({
              error: err,
            })
          );
        })
      );
  }
}
