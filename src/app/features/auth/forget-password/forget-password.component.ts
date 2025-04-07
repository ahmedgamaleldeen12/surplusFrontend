import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-forget-password',
  imports: [InputTextModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  email: string = '';

  onSubmit() {
    console.log('Reset password requested for:', this.email);
    // Handle password reset logic here
  }
}
