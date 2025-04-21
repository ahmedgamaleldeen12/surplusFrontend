import { Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { HomeComponent } from './features/home/home.component';
import { blockedRoleGuard } from './core/guards/blocked-role.guard';
import { VerifyCodeComponent } from './features/auth/verify-code/verify-code.component';
import { ForgetPasswordComponent } from './features/auth/forget-password/forget-password.component';
import { ChangePasswordComponent } from './features/auth/change-password/change-password.component';
import { BusinessHomeComponent } from './features/business-home/business-home.component';
import { ProfileComponent } from './features/profile/profile.component';
import { BasketComponent } from './features/basket/basket/basket.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { AdminPanelComponent } from './features/admin-panel/admin-panel.component';
import { authGuard } from './core/guards/auth.guard';
import { allowedRoleGuard } from './core/guards/allowed-role.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'marketplace',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
        title: 'Login',
      },
      {
        path: 'register',
        component: RegisterComponent,
        title: 'Register',
      },
      {
        path: 'verify-code',
        component: VerifyCodeComponent,
        title: 'Verify Code',
      },
      {
        path: 'forget-password',
        component: ForgetPasswordComponent,
        title: 'Forget Password',
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
        title: 'Change Password',
      },
    ],
  },
  {
    path: 'marketplace',
    component: HomeComponent,
    title: 'Marketplace',
    canActivate: [blockedRoleGuard],
    data: { blockedRoles: ['BusinessManager', 'Admin'] },
  },
  {
    path: 'supplier',
    component: BusinessHomeComponent,
    title: 'Supplier Home',
    canActivate: [allowedRoleGuard],
    data: { allowedRoles: ['BusinessManager'] },
  },
  {
    canActivate: [authGuard],
    path: 'profile',
    component: ProfileComponent,
    title: 'Profile',
  },
  {
    path: 'basket',
    component: BasketComponent,
    title: 'basket',
  },
  {
    canActivate: [authGuard],
    path: 'checkout',
    component: CheckoutComponent,
    title: 'checkout'
  },
  {
    canActivate: [authGuard, allowedRoleGuard],
    path: 'admin-panel',
    component: AdminPanelComponent,
    title: 'Admin Panel',
    data: { allowedRoles: ['Admin'] }
  }
];
