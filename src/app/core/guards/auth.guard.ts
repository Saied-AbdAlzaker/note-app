import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const PLATEFORM_ID = inject(PLATFORM_ID);
  const router = inject(Router);
  if (isPlatformBrowser(PLATEFORM_ID)) {
    if (localStorage.getItem("token")) {
      return true;
    } else{
      router.navigate(['/signin']);
      return false;
    }
  }
  return false;
};
