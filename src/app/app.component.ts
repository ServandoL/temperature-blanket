import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { WeatherService } from './common/weather.service';
import {
  BehaviorSubject,
  delay,
  map,
  Observable,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { ForecastQuery, HistoryQuery } from './common/queries.generated';
import {
  AsyncPipe,
  DatePipe,
  NgClass,
  NgIf,
  NgOptimizedImage,
} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { FeatureFlagService } from './common/feature-flag.service';
import { FlagDescription, Flags } from './common/interfaces';
import { MissingDaysPipe } from './common/missing-days.pipe';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GetTemperatureClassPipe } from './common/get-temperature-class.pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [WeatherService],
  imports: [
    DatePipe,
    NgClass,
    NgIf,
    AsyncPipe,
    NgOptimizedImage,
    MissingDaysPipe,
    GetTemperatureClassPipe,
  ],
})
export class AppComponent implements OnInit {
  title = 'temperature-blanket';
  history$: Observable<HistoryQuery | HttpErrorResponse>;
  forecast$: Observable<ForecastQuery | HttpErrorResponse>;
  today = signal<Date>(new Date());
  response = signal<HistoryQuery | undefined>(undefined);
  isTextHidden = signal<boolean>(true);
  apiError = signal<HttpErrorResponse | undefined>(undefined);
  loading = signal<boolean>(false);
  featureFlags$: Observable<FlagDescription[]>;
  $appFlag: Observable<FlagDescription | null>;
  missingDays = signal<string[]>([]);
  private fetch$ = new BehaviorSubject<number>(0);
  private _service = inject(WeatherService);
  private _featureFlagService = inject(FeatureFlagService);
  private _destroy = inject(DestroyRef);

  constructor() {
    this.history$ = this._service.getHistory().pipe(takeUntilDestroyed());
    this.forecast$ = this._service
      .getForecast({
        input: { q: environment.zipCode },
      })
      .pipe(takeUntilDestroyed());
    this.featureFlags$ =
      this._featureFlagService.featureFlags$.pipe(takeUntilDestroyed());
    this.$appFlag = this._featureFlagService
      .getFlagFor(Flags.APP_BLANKET)
      .pipe(takeUntilDestroyed());
  }

  ngOnInit() {
    this.featureFlags$
      .pipe(takeUntilDestroyed(this._destroy))
      .subscribe((flags) => {
        console.log({ location: 'AppComponent.ngOnInit', message: flags });
      });
    this.fetch$
      .pipe(
        takeUntilDestroyed(this._destroy),
        tap(() => this.loading.set(true)),
        delay(250),
        switchMap(() => {
          return this.forecast$.pipe(
            takeUntilDestroyed(this._destroy),
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
          this.loading.set(false);
          if (history.hasOwnProperty('error')) {
            this.apiError.set(history as HttpErrorResponse);
          } else {
            this.response.set(history as ForecastQuery);
          }
        })
      )
      .subscribe();
    this.fetch$.next(Date.now());
  }

  updateMissingDays() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    this._service
      .getMissingDays({
        month,
        year,
      })
      .pipe(take(1), delay(1000))
      .subscribe((result) => {
        this.refresh();
        this.missingDays.set((result?.datesMissing as string[]) ?? []);
      });
  }

  refresh() {
    this.missingDays.set([]);
    this.today.set(new Date());
    this.fetch$.next(Date.now());
  }

  toggleText() {
    this.isTextHidden.set(!this.isTextHidden());
  }
}
