import {
  Component,
  DestroyRef,
  inject,
  linkedSignal,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { WeatherService } from './common/weather.service';
import { BehaviorSubject, delay, map, switchMap, take } from 'rxjs';
import { ForecastQuery, HistoryQuery } from './common/queries.generated';
import { DatePipe, NgClass, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { FeatureFlagService } from './common/feature-flag.service';
import { FlagDescription, Flags, ITime } from './common/interfaces';
import { MissingDaysPipe } from './common/missing-days.pipe';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { GetTemperatureClassPipe } from './common/get-temperature-class.pipe';
import { FormsModule } from '@angular/forms';
import { Utils } from './common/Utils';
import { AppLoadingService } from './common/app-loading.service';
import { ForecastInput } from './__generated__/types.server';
import { YearSelectPipe } from './common/year-select.pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [WeatherService],
  imports: [
    NgClass,
    NgIf,
    MissingDaysPipe,
    GetTemperatureClassPipe,
    FormsModule,
    YearSelectPipe,
  ],
})
export class AppComponent implements OnInit {
  title = 'temperature-blanket';
  readonly SELECTABLE_YEARS: ITime[] = Array.from({ length: 10 })
    .fill(0)
    .map((_, i) => {
      const time = new Date();
      const year = time.getUTCFullYear() - i;
      const date = time.getUTCDate();
      const month = time.getUTCMonth() + 1;
      return { year, month, date };
    });
  history: Signal<HistoryQuery | HttpErrorResponse | undefined>;
  forecast: Signal<ForecastQuery | HttpErrorResponse | undefined>;
  featureFlags: Signal<FlagDescription[]>;
  appFlag: Signal<FlagDescription | null>;
  response = signal<HistoryQuery | undefined>(undefined);
  isTextHidden = signal<boolean>(true);
  apiError = signal<HttpErrorResponse | undefined>(undefined);
  loading = signal<boolean>(false);
  today = signal<Date>(new Date());
  selectedYear = signal<string | undefined>(undefined);
  inputYear = linkedSignal<ITime | undefined>(() => {
    const dt = this.selectedYear();
    return dt ? (JSON.parse(dt) as ITime) : undefined;
  });
  missingDays = signal<string[]>([]);
  protected readonly JSON = JSON;
  private fetch$ = new BehaviorSubject<number>(0);
  private _service = inject(WeatherService);
  private _featureFlagService = inject(FeatureFlagService);
  private _destroy = inject(DestroyRef);
  private _loadingService = inject(AppLoadingService);

  constructor() {
    this.history = toSignal(this._service.getHistory(), {
      initialValue: undefined,
    });
    this.forecast = toSignal(
      this._service.getForecast({
        input: { q: environment.zipCode },
      }),
      {
        initialValue: undefined,
      }
    );
    this.featureFlags = toSignal(this._featureFlagService.featureFlags$, {
      initialValue: [],
    });
    this.appFlag = toSignal(
      this._featureFlagService.getFlagFor(Flags.APP_BLANKET),
      {
        initialValue: null,
      }
    );
  }

  ngOnInit() {
    this.fetch$
      .pipe(
        takeUntilDestroyed(this._destroy),
        delay(250),
        switchMap(() => {
          const dt = this.inputYear();
          const input: ForecastInput | undefined = dt
            ? {
                q: environment.zipCode,
                dt,
              }
            : undefined;
          return this._service
            .getHistory(input)
            .pipe(takeUntilDestroyed(this._destroy));
        }),
        map((history) => {
          Utils.handleQueryError(history);
          this.response.set(history.data);
          this.loading.set(this._loadingService.loading());
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
        Utils.handleQueryError(result);
        this.refresh();
        this.missingDays.set(
          (result?.data?.updateMissingDays?.datesMissing as string[]) ?? []
        );
      });
  }

  refresh() {
    this.missingDays.set([]);
    this.fetch$.next(Date.now());
  }

  toggleText() {
    this.isTextHidden.set(!this.isTextHidden());
  }

  handleYearChange() {
    this.fetch$.next(Date.now());
  }
}
