import { Component, inject, OnInit, signal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiBaseService } from '../../../core/services/ApiBase.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../../core/services/Auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  imports: [InputTextModule, PasswordModule, ToastModule, FormsModule, CommonModule, ReactiveFormsModule],
  styleUrls: ['./change-password.component.scss'],
  providers: [MessageService],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;
  loading: boolean = false;

  private readonly fb = inject(FormBuilder);
  private readonly apiBaseService = inject(ApiBaseService);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);
  private readonly route = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);

  email = signal<string>('');

  constructor() {}

  ngOnInit() {
    this.initForm();

    this.email.set(this.route.snapshot.queryParamMap.get('email') || '');
  }

  initForm() {
    this.changePasswordForm = this.fb.group({
      CurrentPassword: [null, [Validators.required, Validators.minLength(8)]],
      newPassword: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, [Validators.required]],
    });

    this.changePasswordForm.get('confirmPassword')?.setValidators([
      Validators.required,
      this.passwordMatcher.bind(this),
    ]);
  }

  passwordMatcher(control: any) {
    if (this.changePasswordForm) {
      const newPassword = this.changePasswordForm.get('newPassword')?.value;
      return control.value === newPassword ? null : { passwordMismatch: true };
    }
    return null;
  }

  async changePassword() {
    if (this.changePasswordForm.invalid) {
      Object.keys(this.changePasswordForm.controls).forEach((field) => {
        const control = this.changePasswordForm.get(field);
        control?.markAsTouched();
        control?.markAsDirty();
      });
      return;
    }

    this.loading = true;

    const data = {
      email: this.email(),
      newPassword: this.changePasswordForm.get('newPassword')?.value,
      CurrentPassword: this.changePasswordForm.get('CurrentPassword')?.value,
    };

    debugger

    try {
      const res = await this.apiBaseService.apiClient.accountResetPasswordUpdate(data);
      if (res.data) {
        this.messageService.add({
          severity: 'success',
          summary: 'Password reset Successful',
          detail: res.data?.value?.message || 'Password reset successfully.'
        });
        this.router.navigate(['/auth/login']);
      }
    } catch (error) {
      this.loading = false;
      this.messageService.add({
        severity: 'error',
        summary: 'Password reset failed',
        detail: 'Password reset failed.',
      });
    }
  }
}
