import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '/temperature-blanket/',
    loadComponent: () => import('./app.component').then((m) => m.AppComponent),
  },
];
