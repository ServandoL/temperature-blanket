import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from './common/weather.service';
import {
  BehaviorSubject,
  delay,
  map,
  Observable,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { ForecastQuery, HistoryQuery } from './common/queries.generated';
import {
  AsyncPipe,
  DatePipe,
  NgClass,
  NgForOf,
  NgIf,
  NgOptimizedImage,
} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { FeatureFlagService } from './common/feature-flag.service';
import { FlagDescription, Flags } from './common/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [WeatherService],
  imports: [DatePipe, NgForOf, NgClass, NgIf, AsyncPipe, NgOptimizedImage],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'temperature-blanket';
  private onDestroy$ = new Subject<void>();
  private fetch$ = new BehaviorSubject<number>(0);
  history$: Observable<HistoryQuery | HttpErrorResponse>;
  forecast$: Observable<ForecastQuery | HttpErrorResponse>;
  today = new Date();
  response: HistoryQuery | undefined;
  isTextVisible = true;
  error$ = new BehaviorSubject<HttpErrorResponse | undefined>(undefined);
  loading$ = new BehaviorSubject<boolean>(false);
  featureFlags$: Observable<FlagDescription[]>;
  $appFlag: Observable<FlagDescription | null>;

  constructor(
    private service: WeatherService,
    private featureFlagService: FeatureFlagService
  ) {
    this.history$ = this.service.getHistory();
    this.forecast$ = this.service.getForecast({
      input: { q: environment.zipCode },
    });
    this.featureFlags$ = this.featureFlagService.featureFlags$;
    this.$appFlag = this.featureFlagService.getFlagFor(Flags.APP_BLANKET);
  }

  ngOnInit() {
    this.featureFlags$.pipe(takeUntil(this.onDestroy$)).subscribe((flags) => {
      console.log({ location: 'AppComponent.ngOnInit', message: flags });
    });
    this.fetch$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(() => this.loading$.next(true)),
        delay(250),
        switchMap(() => {
          return this.forecast$.pipe(
            switchMap((forecast) =>
              this.history$.pipe(
                map((history) => ({
                  forecast,
                  history,
                }))
              )
            )
          );
        }),
        map(({ forecast, history }) => {
          this.loading$.next(false);
          if (history.hasOwnProperty('error')) {
            this.error$.next(history as HttpErrorResponse);
          } else {
            this.response = history as ForecastQuery;
          }
        })
      )
      .subscribe();
    this.fetch$.next(Date.now());
  }

  refresh() {
    this.fetch$.next(Date.now());
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  getClassForTemperature(temp: number): string {
    if (temp > 105) return 'color-105-plus';
    if (temp < 30) return 'color-29-minus';
    const lowerBound = Math.floor(temp / 5) * 5;
    const upperBound = lowerBound + 4;
    return `color-${lowerBound}-${upperBound}`;
  }

  toggleText() {
    this.isTextVisible = !this.isTextVisible;
  }
}
