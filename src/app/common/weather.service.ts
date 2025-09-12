import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  GET_FORECAST_QUERY,
  GET_HISTORY_QUERY,
  MISSING_DAYS_QUERY,
} from './queries';
import {
  ForecastQuery,
  ForecastQueryVariables,
  HistoryQuery,
  HistoryQueryVariables,
  UpdateMissingDaysQuery,
  UpdateMissingDaysQueryVariables,
} from './queries.generated';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {
  UpdateMissingDaysInput,
  UpdateMissingDaysResponse,
} from '../__generated__/types.server';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private readonly apollo: Apollo) {}

  public getMissingDays(
    input: UpdateMissingDaysInput
  ): Observable<UpdateMissingDaysResponse | undefined | null> {
    return this.apollo
      .watchQuery<UpdateMissingDaysQuery, UpdateMissingDaysQueryVariables>({
        query: MISSING_DAYS_QUERY,
        variables: { input },
        fetchPolicy: 'no-cache',
      })
      .valueChanges.pipe(
        map((result) => {
          if (result.errors) {
            throw new Error(result.errors.map((e) => e.message).join(', '));
          }
          return result.data.updateMissingDays;
        })
      );
  }

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
        fetchPolicy: 'no-cache',
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
