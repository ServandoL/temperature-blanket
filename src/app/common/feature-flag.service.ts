import { inject, Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject, catchError, map, Observable, of, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  AppFlagsResponse,
  FlagDescription,
  Flags,
  PublishEvents,
} from './interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FeatureFlagService {
  private readonly _defaultFlag = {
    name: 'App-blanket',
    enabled: true,
  };
  private _socket: Socket | undefined;
  private _http = inject(HttpClient);
  private _featureFlags = new BehaviorSubject<FlagDescription[]>([]);

  constructor() {
    if (environment.enableFeatureFlags) {
      this._socket = io('http://localhost:3000?room=temperature-blanket');
      this._socket.on('connect', () => {
        console.log({
          location: FeatureFlagService.name + '.connect',
          message: 'Connected to server',
        });
      });
      this._socket.on('disconnect', () => {
        console.warn({
          location: FeatureFlagService.name + '.disconnect',
          message: 'Disconnected from server',
        });
      });
      this._socket.on(PublishEvents.FLAG, (flag: FlagDescription) => {
        console.log({
          location: FeatureFlagService.name + '.socket.on',
          message: flag,
        });
        this._featureFlags.next(
          this._featureFlags
            .getValue()
            .map((f) => (f.name === flag.name ? flag : f))
        );
      });
      this.initializeFlags();
    } else {
      this._featureFlags.next([this._defaultFlag]);
    }
  }

  private initializeFlags() {
    this.getFlags()
      .pipe(take(1))
      .subscribe((response) => {
        console.log({
          location: FeatureFlagService.name + '.initializeFlags',
          message: response,
        });
        if (response && response.flags.length) {
          this._featureFlags.next(response.flags);
        }
      });
  }

  get featureFlags$(): Observable<FlagDescription[]> {
    return this._featureFlags.asObservable();
  }

  getFlagFor(flagName: Flags): Observable<FlagDescription | null> {
    return this._featureFlags.pipe(
      map((flags) => flags.find((flag) => flag.name === flagName)),
      map((flag) => {
        if (!flag) {
          return null;
        }
        return flag;
      })
    );
  }

  getFlags(): Observable<AppFlagsResponse | null> {
    return this._http
      .get<AppFlagsResponse>(`http://localhost:3000/flags/temperature-blanket`)
      .pipe(
        map((response) => response),
        catchError((error) => {
          console.error('Error fetching flags:', error);
          return [];
        })
      );
  }
}
