import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { Checkbox } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports:[InputTextModule, Checkbox , PasswordModule]
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
