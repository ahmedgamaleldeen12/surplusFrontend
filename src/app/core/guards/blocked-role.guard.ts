import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/Auth.service';

export const blockedRoleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const blockedRoles = route.data?.['blockedRoles'] as string[] | undefined;
  const userRole = authService.getUserRole();

  if (blockedRoles && blockedRoles.includes(userRole!)) {
    // Custom redirects based on role
    if (userRole === 'BusinessManager') {
      return router.parseUrl('/supplier');
    }
    if (userRole === 'Admin') {
      return router.parseUrl('/admin-panel');
    }

    return router.parseUrl('/auth/login');
  }

  return true;
};
