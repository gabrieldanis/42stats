import { HttpInterceptorFn } from '@angular/common/http';
import { switchMap, tap, timer } from 'rxjs';

export const delayInterceptor: HttpInterceptorFn = (req, next) => {
  const delay = 400;
  if (req.url === 'https://api.intra.42.fr/oauth/token') {
    return next(req);
  }

  return timer(delay).pipe(
    tap(() => console.log('delay active')),
    switchMap(() => {
      return next(req);
    }),
  );
};
