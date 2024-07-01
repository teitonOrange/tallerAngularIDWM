import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthServicesService } from '../services/auth-services.service';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const authService = inject(AuthServicesService);
  const router = inject(Router);

  if (authService.isAuth() ){
    return true;
  } else {
    router.navigate(['/auth/']);
    return false;
  }
};
