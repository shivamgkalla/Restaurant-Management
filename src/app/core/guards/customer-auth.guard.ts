import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { CustomerAuthService } from '../services/customer-auth.service';

/** Protects customer menu — requires customer login. */
export const customerAuthGuard: CanActivateFn = () => {
  const customerAuth = inject(CustomerAuthService);
  const router = inject(Router);

  return customerAuth.isLoggedIn$.pipe(
    take(1),
    map(loggedIn => {
      if (!loggedIn) {
        void router.navigate(['/order/login']);
        return false;
      }
      return true;
    }),
  );
};

/** Customer login page — redirect to menu if already signed in. */
export const customerGuestGuard: CanActivateFn = () => {
  const customerAuth = inject(CustomerAuthService);
  const router = inject(Router);

  return customerAuth.isLoggedIn$.pipe(
    take(1),
    map(loggedIn => {
      if (loggedIn) {
        void router.navigate(['/order']);
        return false;
      }
      return true;
    }),
  );
};
