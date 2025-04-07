import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  imports: [InputTextModule, PasswordModule],
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
