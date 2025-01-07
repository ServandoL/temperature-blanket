import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from './common/weather.service';
import { concatMap, map, Observable, Subscription } from 'rxjs';
import { ForecastQuery, HistoryQuery } from './common/queries.generated';
import { DatePipe, NgClass, NgForOf } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [WeatherService],
  imports: [DatePipe, NgForOf, NgClass],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'temperature-blanket';
  private _subs: Subscription[] = [];
  history$: Observable<HistoryQuery>;
  forecast$: Observable<ForecastQuery>;
  today = new Date();
  response: HistoryQuery | undefined;

  constructor(private service: WeatherService) {
    this.history$ = this.service.getHistory();
    this.forecast$ = this.service.getForecast({ input: { q: '75080' } });
  }

  ngOnInit() {
    this._subs.push(
      this.forecast$
        .pipe(
          concatMap((forecast) => {
            return this.history$.pipe(
              map((history) => ({
                forecast,
                history,
              }))
            );
          })
        )
        .subscribe(({ forecast, history }) => {
          this.response = history;
        })
    );
  }

  ngOnDestroy() {
    this._subs.forEach((sub) => sub.unsubscribe());
  }

  getClassForTemperature(temp: number): string {
    if (temp > 105) return 'color-105-plus';
    if (temp < 30) return 'color-29-minus';
    const lowerBound = Math.floor(temp / 5) * 5;
    const upperBound = lowerBound + 4;
    return `color-${lowerBound}-${upperBound}`;
  }
}
