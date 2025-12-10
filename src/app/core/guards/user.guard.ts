import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userGuard: CanActivateFn = (route, state) => {
  const PLATEFORM_ID = inject(PLATFORM_ID);
  const router = inject(Router);
  if (isPlatformBrowser(PLATEFORM_ID)) {
    if (localStorage.getItem('token') == null) {
      return true;
    } else {
      router.navigate(['/home']);
      return false;
    }
  }
  return false;
};
