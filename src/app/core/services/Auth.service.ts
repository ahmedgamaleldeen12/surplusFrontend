import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CookiesConstants } from '../constants/CookiesConstants';
import { jwtDecode } from 'jwt-decode';
import { UserRole } from '../types/UserRole';
import { IAddress } from '../models/address';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, of, ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<any>(1);
  currentUser$ = this.currentUserSource.asObservable();

  private readonly cookieService = inject(CookieService);
  private readonly http = inject(HttpClient);

  constructor(private router: Router) {}
  isAuthenticated(): boolean {
    return true;
  }

  loadCurrentUser(token: string) {
    if (token == null) {
      this.currentUserSource.next(null);
      return of(null);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get(this.baseUrl + 'account', {headers}).pipe(
      map((user: any) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    )
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
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
  getUserAddress() {
    return this.http.get<IAddress>(this.baseUrl + 'account/address');
  }

  updateUserAddress(address: IAddress) {
    return this.http.put<IAddress>(this.baseUrl + 'account/address', address);
  }
}
