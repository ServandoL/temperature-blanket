import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppLoadingService {
  loading = signal<boolean>(false);
  constructor() {}
}
