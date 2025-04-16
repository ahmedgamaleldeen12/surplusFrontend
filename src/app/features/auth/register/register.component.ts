import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
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
import { TabsComponent } from '../tabs/tabs.component';

@Component({
  selector: 'app-register',
  imports: [
    InputTextModule,
    PasswordModule,
    NgClass,
    FormsModule,
    ReactiveFormsModule,
    TabsComponent,
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
  get rpassword() {
    return this.registerForm.get('rpassword');
  }
  get username() {
    return this.registerForm.get('username');
  }

  ngOnInit() {
    this.initForm();
    this.tempRole.set(this.authService.getTempAuthRole());
  }

  initForm() {
    this.registerForm = this.fb.group(
      {
        email: [null, [Validators.required, Validators.email]],
        username: [null, Validators.required],
        password: [
          null,
          [
            Validators.required,
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/),
          ],
        ],
        rpassword: [null, Validators.required],
      },
      { validators: this.passwordMatchValidator } // ✅ Apply at group level
    );
  }

  async register() {
    this.markControlAsTouchedAndDirty('email');
    this.markControlAsTouchedAndDirty('username');
    this.markControlAsTouchedAndDirty('password');
    this.markControlAsTouchedAndDirty('rpassword');
    console.log(this.password);

    if (this.registerForm.invalid) {
      return;
    }
    let data: RegisterDto = {
      firstName: this.username?.value,
      email: this.email?.value,
      password: this.password?.value,
      role: this.tempRole(),
    };
    let res = await this.apiBaseService.apiClient.accountRegisterCreate(data);
    if (res.data) {
      this.router.navigate(['./auth/verify-code'], {
        queryParams: { email: this.email?.value },
      });
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
  private passwordMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('rpassword')?.value;
    if (password !== confirmPassword) {
      form.get('rpassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    } else {
      return null;
    }
  }
  //#endregion
}
