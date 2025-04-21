import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/Auth.service';

export const allowedRoleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const allowedRoles = route.data?.['allowedRoles'] as string[] | undefined;
  const userRole = authService.getUserRole();

  if (allowedRoles && !allowedRoles.includes(userRole!)) {
    return router.parseUrl('/auth/login');
  }

  return true;
};
