import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WeatherApiResponse} from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private _base= new URL("http://api.weatherapi.com/v1");
  private _key='83346658b8e94f0092b213822242612';
  constructor(private _http: HttpClient) { }

  public getForecast() {
    const endpoint = this._base.toString() + "/forecast.json";
    const url = new URL(endpoint);
    url.searchParams.set("key", this._key);
    url.searchParams.set("q", "75080");
  }

}
