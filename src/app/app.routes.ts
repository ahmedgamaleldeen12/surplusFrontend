import { Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { HomeComponent } from './features/home/home.component';
import { roleGuard } from './core/guards/role.guard';
import { VerifyCodeComponent } from './features/auth/verify-code/verify-code.component';
import { ForgetPasswordComponent } from './features/auth/forget-password/forget-password.component';
import { ChangePasswordComponent } from './features/auth/change-password/change-password.component';
import { SingleProductComponent } from './features/single-product/single-product.component';
import { BusinessHomeComponent } from './features/business-home/business-home.component';
import { ProfileComponent } from './features/profile/profile.component';

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
    canActivate: [roleGuard],
    data: { blockedRoles: ['BusinessManager'] }, //  block only BusinessManager
  },
  {
    path: 'product',
    component: SingleProductComponent,
    title: 'product',
    canActivate: [roleGuard],
    data: { blockedRoles: ['BusinessManager'] }, //  block only BusinessManager
  },
  {
    path: 'supplier',
    component: BusinessHomeComponent,
    title: 'supplier home',
  },
  {
    path: 'profile',
    component: ProfileComponent,
    title: 'Profile',
  },

];
