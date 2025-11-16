import { inject, Injectable } from '@angular/core';
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
import { Observable, tap } from 'rxjs';
import {
  ForecastInput,
  UpdateMissingDaysInput,
} from '../__generated__/types.server';
import { ApolloQueryResult } from '@apollo/client';
import { AppLoadingService } from './app-loading.service';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly _pollInterval = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  private _loadingService = inject(AppLoadingService);
  private readonly apollo = inject(Apollo);

  public getMissingDays(
    input: UpdateMissingDaysInput
  ): Observable<ApolloQueryResult<UpdateMissingDaysQuery>> {
    this._loadingService.loading.set(true);
    return this.apollo
      .watchQuery<UpdateMissingDaysQuery, UpdateMissingDaysQueryVariables>({
        query: MISSING_DAYS_QUERY,
        variables: { input },
        fetchPolicy: 'no-cache',
      })
      .valueChanges.pipe(
        tap((response) => this._loadingService.loading.set(response.loading))
      );
  }

  public getHistory(
    input?: ForecastInput
  ): Observable<ApolloQueryResult<HistoryQuery>> {
    this._loadingService.loading.set(true);
    return this.apollo
      .watchQuery<HistoryQuery, HistoryQueryVariables>({
        query: GET_HISTORY_QUERY,
        fetchPolicy: 'cache-and-network',
        variables: { input },
      })
      .valueChanges.pipe(
        tap((response) => this._loadingService.loading.set(response.loading))
      );
  }

  public getForecast(
    variables: ForecastQueryVariables
  ): Observable<ApolloQueryResult<ForecastQuery>> {
    this._loadingService.loading.set(true);
    return this.apollo
      .watchQuery<ForecastQuery, ForecastQueryVariables>({
        query: GET_FORECAST_QUERY,
        variables,
        fetchPolicy: 'cache-and-network',
        pollInterval: this._pollInterval,
      })
      .valueChanges.pipe(
        tap((response) => this._loadingService.loading.set(response.loading))
      );
  }
}
