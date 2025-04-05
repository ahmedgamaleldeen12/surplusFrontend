import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CookiesConstants } from '../constants/CookiesConstants';

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

  getUserRole(): void {

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
