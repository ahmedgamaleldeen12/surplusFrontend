import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CookiesConstants } from '../constants/CookiesConstants';
import { jwtDecode } from 'jwt-decode';
import { UserRole } from '../types/UserRole';
import { IAddress } from '../models/address';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.apiUrl;

  private readonly cookieService = inject(CookieService);
  private readonly http = inject(HttpClient);

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
  setTempAuthRole(role: UserRole): void {
    this.cookieService.set(CookiesConstants.tempAuthRole, role);
  }
  getTempAuthRole(): UserRole {
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
  getUserAddress() {
    return this.http.get<IAddress>(this.baseUrl + 'account/address');
  }

  updateUserAddress(address: IAddress) {
    return this.http.put<IAddress>(this.baseUrl + 'account/address', address);
  }
  getUserName(): string {
    const token = this.cookieService.get(CookiesConstants.authUserToken);
    const decoded: any = jwtDecode(token);
    return decoded.given_name ?? '';
  }
}
