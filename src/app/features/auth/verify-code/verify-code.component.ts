import { Component, OnInit } from '@angular/core';
import { InputOtpModule } from 'primeng/inputotp';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  imports:[InputOtpModule],
  styleUrls: ['./verify-code.component.scss']
})
export class VerifyCodeComponent implements OnInit {

  timeLeft: string = '01:00';
  private timer: any;
  private secondsLeft: number = 60;

  ngOnInit() {
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


  resendCode() {
    this.secondsLeft = 60;
    clearInterval(this.timer);
    this.startTimer();
  }

  verifyCode() {

  }
}
