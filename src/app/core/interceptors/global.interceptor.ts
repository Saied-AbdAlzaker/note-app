import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environments/environment';

export const globalInterceptor: HttpInterceptorFn = (req, next) => {
   let platForm = inject(PLATFORM_ID);

  if (isPlatformBrowser(platForm)) {
    if (localStorage.getItem('token') !== null) {
      req = req.clone({
        setHeaders: { token: localStorage.getItem('token') || '' }
      })
    }
  }

  return next(req);

// const cookieService = inject(CookieService);

  // if (cookieService.check('token')) {
  //   if (req.url.includes('cart') || req.url.includes('wishlist') || req.url.includes('orders')) {
  //     req = req.clone({
  //       setHeaders: {
  //         token: cookieService.get('token')
  //       }
  //     })
  //   }

  // }
  // return next(req);
};
