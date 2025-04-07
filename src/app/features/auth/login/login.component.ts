import { Component, inject, OnInit, signal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Checkbox } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { NgClass } from '@angular/common';
import { ApiBaseService } from '../../../core/services/ApiBase.service';
import { CookieService } from 'ngx-cookie-service';
import { CookiesConstants } from '../../../core/constants/CookiesConstants';
import { Router } from '@angular/router';
import { UserRole } from '../../../core/types/UserRole';
import { AuthService } from '../../../core/services/Auth.service';
import { TabsComponent } from "../tabs/tabs.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    InputTextModule,
    Checkbox,
    PasswordModule,
    ReactiveFormsModule,
    FormsModule,
    NgClass,
    TabsComponent
],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  tempRole = signal<UserRole>('User');
  isRequestFired = false;

  private readonly fb = inject(FormBuilder);
  private readonly apiBaseService = inject(ApiBaseService);
  private readonly cookiService = inject(CookieService);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  constructor() {}

  ngOnInit() {
    this.initForm();
    this.tempRole.set(this.authService.getTempAuthRole());
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  async login() {
    if (this.isRequestFired) return;

    this.markControlAsTouchedAndDirty('email');
    this.markControlAsTouchedAndDirty('password');

    if (this.loginForm.invalid) {
      return;
    }

    this.isRequestFired = true;

    try {
      const res = await this.apiBaseService.apiClient.accountLoginCreate({
        userName: this.email?.value,
        password: this.password?.value,
      });

      if (res.data.jwt) {
        this.cookiService.set(
          CookiesConstants.authUserToken,
          res.data.jwt,
          undefined,
          '/',
          undefined,
          false,
          'Lax',
        );
        this.router.navigate(['./marketplace']);
      }
    } catch (err) {

    } finally {
      this.isRequestFired = false;
    }
  }

  //#region  helpers
  private markControlAsTouchedAndDirty(controlName: string): void {
    const control = this.loginForm.get(controlName);
    if (control?.errors) {
      control.markAsTouched();
      control.markAsDirty();
    }
  }
  //#endregion
}
