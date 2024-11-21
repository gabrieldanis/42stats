import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { ApidataService } from './apidata.service';
import { inject } from '@angular/core';
import { Tokendata } from './tokendata';
import {
  catchError,
  Observable,
  switchMap,
  tap,
  throwError,
  timer,
} from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthTokenService } from './auth-token.service';

function addAuthorizationHeader(
  request: HttpRequest<any>,
  accessToken: string,
) {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = inject(AuthTokenService);
  const accessToken = authToken.getAccessToken();
  const delay = 500;

  if (accessToken) {
    req = addAuthorizationHeader(req, accessToken);
  }

  return timer(delay).pipe(
    switchMap(() => {
      return next(req).pipe(
        catchError((error) => {
          if (error.status === 401) {
            return authToken.fetchToken().pipe(
              switchMap((resp) => {
                if (resp && resp.access_token) {
                  authToken.setAccessToken(resp.access_token);
                  req = addAuthorizationHeader(req, resp.access_token);
                  return next(req);
                } else {
                  return throwError(
                    () => new Error('invalid token, trying to get new one'),
                  );
                }
              }),
            );
          } else {
            return throwError(
              () => new Error('http request from 42 API failed'),
            );
          }
        }),
      );
    }),
  );
};
