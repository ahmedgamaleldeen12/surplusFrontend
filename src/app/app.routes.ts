import { Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { HomeComponent } from './features/home/home.component';
import { roleGuard } from './core/guards/role.guard';
import { VerifyCodeComponent } from './features/auth/verify-code/verify-code.component';
import { ForgetPasswordComponent } from './features/auth/forget-password/forget-password.component';
import { ChangePasswordComponent } from './features/auth/change-password/change-password.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
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
    title: 'Market Place',
    canActivate: [roleGuard],
    data: { blockedRoles: ['BusinessManager'] }, //  block only BusinessManager
  },
];
