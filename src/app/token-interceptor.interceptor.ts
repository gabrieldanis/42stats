import { HttpInterceptorFn } from '@angular/common/http';
import { ApidataService } from './apidata.service';
import { inject } from '@angular/core';
import { Tokendata } from './tokendata';
import { Observable, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url === 'https://api.intra.42.fr/oauth/token') {
    console.log('found token request:', req);
    return next(req);
  }
  const apiDataService = inject(ApidataService);
  return apiDataService.fetchToken().pipe(
    switchMap((tokenObj) => {
      const accessToken = tokenObj.access_token; // Extract the access token
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('added token:', authReq);
      return next(authReq);
    }),
  );
};
