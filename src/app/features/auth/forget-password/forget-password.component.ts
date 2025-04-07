import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ApiBaseService } from '../../../core/services/ApiBase.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-forget-password',
  imports: [InputTextModule, FormsModule, CommonModule, ToastModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
  providers: [MessageService],
})
export class ForgetPasswordComponent {
  email: string = '';

  constructor(
    private apiBaseService: ApiBaseService,
    private messageService: MessageService,
    private router: Router
  ) {}

  async onSubmit() {
    if (!this.email) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Missing Email',
        detail: 'Please enter your email.'
      });
      return;
    }


    try {
      const res = await this.apiBaseService.apiClient.accountForgotUsernameOrPasswordCreate(this.email);
      if (res.status === 200) {
        this.messageService.add({
          severity: 'success',
          summary: 'Verification Code Sent',
          detail: res.data.value.message
        });

        this.router.navigate(['./auth/verify-code'], {
          queryParams: { email: this.email, status: 'forgot-password' }
        });
      }
    } catch (err: any) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: err?.response?.data?.title || 'Something went wrong. Please try again.'
      });
    }
  }
}
