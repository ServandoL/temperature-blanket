import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

export const apolloInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const headers = new HttpHeaders({
    'content-type': 'application/json',
    'x-apollo-operation-name': 'temperature-blanket-ui',
    'apollo-require-preflight': 'true',
  });
  const reqWithHeader = req.clone({
    headers,
  });
  return next(reqWithHeader);
};
