import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserRole } from '../../../core/types/UserRole';
import { AuthService } from '../../../core/services/Auth.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private readonly  router = inject(Router);
  private readonly  auth = inject(AuthService);


  navigate(url : string , tempRole ?: UserRole ){
    if(tempRole){
      this.auth.setTempAuthRole(tempRole);
    }
    this.router.navigate([url])
  }
}
