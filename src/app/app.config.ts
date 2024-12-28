import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  provideZoneChangeDetection,
} from '@angular/core';
import { InMemoryCache } from '@apollo/client/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { apolloInterceptorInterceptor } from './common/apollo-interceptor.interceptor';
import { loggerInterceptorInterceptor } from './common/logger-interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        apolloInterceptorInterceptor,
        loggerInterceptorInterceptor,
      ])
    ),
    provideApollo(() => {
      const httpLink = inject(HttpLink);
      return {
        link: httpLink.create({ uri: 'http://localhost:3000/graphql' }),
        cache: new InMemoryCache(),
        // other options...
      };
    }),
  ],
};
