import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InputOtpModule } from 'primeng/inputotp';
import { ApiBaseService } from '../../../core/services/ApiBase.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  imports: [InputOtpModule, FormsModule, CommonModule, ToastModule],
  styleUrls: ['./verify-code.component.scss'],
  providers: [MessageService],
})
export class VerifyCodeComponent implements OnInit {
  timeLeft: string = '01:00';
  private timer: any;
  private secondsLeft: number = 60;

  email: string = '';
  status: string = '';
  code: string = '';

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly apiBaseService = inject(ApiBaseService);
  private readonly messageService = inject(MessageService);

  ngOnInit() {
    this.email = this.route.snapshot.queryParamMap.get('email') || '';
    this.status = this.route.snapshot.queryParamMap.get('status') || '';
    this.startTimer();
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.secondsLeft--;
      const minutes = Math.floor(this.secondsLeft / 60);
      const seconds = this.secondsLeft % 60;
      this.timeLeft = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

      if (this.secondsLeft <= 0) {
        clearInterval(this.timer);
      }
    }, 1000);
  }


  async resendCode() {
    if (!this.email) return;

    this.secondsLeft = 60;
    clearInterval(this.timer);
    this.startTimer();

    try {
      const res = await this.apiBaseService.apiClient.accountResendEmailConfirmationLinkCreate(this.email);

      if (res.status === 200) {
        // debugger
        this.messageService.add({
          severity: 'success',
          summary: 'Verification Resent Successful',
          detail: res.data?.value?.message || 'The verification code has been resent successfully.'
        });
      }
    } catch (error) {
      console.error('Resend code failed', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to resend code. Please try again.'
      });
    }
  }


  async verifyCode() {
    if (!this.code || !this.email) return;

    try {
      const res = await this.apiBaseService.apiClient.accountConfirmEmailUpdate({
        email: this.email,
        code: this.code
      });

      if (res.status === 200) {
        // debugger
        this.messageService.add({
          severity: 'success',
          summary: 'Verification Successful',
          detail: res.data?.value?.message || 'The verification code successfully.'
        });
        debugger
        if (this.status == 'forgot-password')
          this.router.navigate(['./auth/change-password'], {
            queryParams: { email: this.email }
          });
        else
          this.router.navigate(['./marketplace']);
      }
    } catch (err) {
      this.messageService.add({
        severity: 'error',
        summary: 'Verification Failed',
        detail: 'The code is incorrect or expired.'
      });
    }
  }
}
