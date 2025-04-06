import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ApiBaseService } from '../../../core/services/ApiBase.service';
import { UserRole } from '../../../core/types/UserRole';
import { AuthService } from '../../../core/services/Auth.service';
import { NgClass } from '@angular/common';
import { RegisterDto } from '../../../data/api/data-contracts';

@Component({
  selector: 'app-register',
  imports: [
    InputTextModule,
    PasswordModule,
    NgClass,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm!: FormGroup;

  tempRole = signal<UserRole>('User');

  private readonly fb = inject(FormBuilder);
  private readonly apiBaseService = inject(ApiBaseService);
  private readonly cookiService = inject(CookieService);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }
  get username() {
    return this.registerForm.get('username');
  }

  ngOnInit() {
    this.initForm();
    this.tempRole.set(this.authService.getTempAuthRole());
  }

  initForm() {
    this.registerForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  async register() {
    this.markControlAsTouchedAndDirty('email');
    this.markControlAsTouchedAndDirty('username');
    this.markControlAsTouchedAndDirty('password');

    if (this.registerForm.invalid) {
      return;
    }
    let data: RegisterDto = {
      firstName: this.username?.value,
      email: this.email?.value,
      password: this.password?.value,
      role: this.tempRole(),
      lastName: 'ddd',
    };
    let res = await this.apiBaseService.apiClient.accountRegisterCreate(data);
    if (res.data) {
      console.log(res);
    }
  }

  //#region  helpers
  private markControlAsTouchedAndDirty(controlName: string): void {
    const control = this.registerForm.get(controlName);
    if (control?.errors) {
      control.markAsTouched();
      control.markAsDirty();
    }
  }
  //#endregion
}
