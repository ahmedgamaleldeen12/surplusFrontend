import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/Auth.service';
// import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const blockedRoles = route.data['blockedRoles'] as string[];
  const userRole = authService.getUserRole();

  if (userRole && blockedRoles.includes(userRole)) {
    return router.parseUrl('/auth/login');
  }

  return true; 
};
