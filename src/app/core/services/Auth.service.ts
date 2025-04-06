import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CookiesConstants } from '../constants/CookiesConstants';
import { jwtDecode } from 'jwt-decode';
import { UserRole } from '../types/UserRole';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly cookieService = inject(CookieService);
  constructor() {}
  isAuthenticated(): boolean {
    return true;
  }

  getToken(): string {
    return this.cookieService.get(CookiesConstants.authUserToken);
  }

  getRefreshToken(): string {
    return this.cookieService.get(CookiesConstants.authUserRefreshToken);
  }

  getUserRole(): string | null {
    try {
      const token = this.cookieService.get(CookiesConstants.authUserToken);
      const decoded: any = jwtDecode(token);
      return decoded?.role ?? null;
    } catch (error) {
      return null;
    }
  }
  setTempAuthRole(role: UserRole):void {
    this.cookieService.set(CookiesConstants.tempAuthRole, role)
  }
  getTempAuthRole():UserRole{
    const role = this.cookieService.get(CookiesConstants.tempAuthRole);
    return (role as UserRole) || 'User';
  }
  logOut(): void {
    this.clearCookies();
    window.location.reload();
  }

  private clearCookies(): void {
    [
      CookiesConstants.authUserToken,
      CookiesConstants.authUserRefreshToken,
    ].forEach((cookie) => this.cookieService.delete(cookie, '/'));
    this.cookieService.deleteAll();
  }
}
