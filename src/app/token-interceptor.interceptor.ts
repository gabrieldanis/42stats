import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { ApidataService } from './apidata.service';
import { inject } from '@angular/core';
import { Tokendata } from './tokendata';
import { catchError, Observable, switchMap, tap, throwError } from 'rxjs';
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

  if (accessToken) {
    req = addAuthorizationHeader(req, accessToken);
  }
  // else
  // {
  //   return authToken.fetchToken().pipe(
  //     tap((tokendata) => {
  //       console.log(`get first token ${tokendata}`);
  //     }),
  //     switchMap((token) => {
  //       authToken.setAccessToken(token.access_token);
  //       // req = addAuthorizationHeader(req, token.access_token);
  //       return next(req);
  //     }),
  //   );
  // }

  return next(req).pipe(
    tap((x) => {
      console.log(x);
    }),
    catchError((error) => {
      if (error.status === 401) {
        return authToken.fetchToken().pipe(
          switchMap((resp) => {
            if (resp && resp.access_token) {
              authToken.setAccessToken(resp.access_token);
              req = addAuthorizationHeader(req, resp.access_token);
              return next(req);
            } else {
              return throwError(() => new Error('Requesting API Token failed'));
            }
          }),
        );
      } else {
        return throwError(() => new Error('Requesting API Token failed'));
      }
    }),
  );
};
