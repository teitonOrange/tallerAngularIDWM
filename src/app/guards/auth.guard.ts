import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthServicesService } from '../auth/services/auth-services.service';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const authService = inject(AuthServicesService);
  const router = inject(Router);
  const expectedRole = childRoute.data['expectedRole'];

  if (authService.isAuth() && expectedRole.hasRole(expectedRole)){
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
