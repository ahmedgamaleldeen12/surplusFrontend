import { inject, Injectable } from '@angular/core';
import { Api } from '../../data/api/Api';
import { AuthService } from './Auth.service';
import { CookieService } from 'ngx-cookie-service';
import { AxiosResponse } from 'axios';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiBaseService {
  apiClient!: Api;
  private isRefreshing = false; // Mutex flag
  private refreshPromise: Promise<any> | null = null; // Store refresh token request

  private readonly authService = inject(AuthService);
  private readonly cookieService = inject(CookieService);
  constructor() {
    this.#initClient();
  }

  #initClient() {
    this.apiClient = new Api({ baseURL: environment.apiUrl });

    this.apiClient.instance.interceptors.request.use((req) => {
      let token = this.cookieService.get('surplusToken');
      if (token) {
        req.headers['Authorization'] = `${token}`;
      }
      req.headers['Access-Control-Allow-Origin'] = '*';
      return req;
    });

    this.apiClient.instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error) => {
        if (error.response.status === 401) {
          return this.handle401Error(error);
        }
        return Promise.reject(error);
      },
    );
  }

  private async handle401Error(error: any) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshPromise = this.refreshToken(); // Store refresh request
    }

    try {
      await this.refreshPromise; // Wait for refresh token request to complete
      return this.apiClient.instance.request(error.config); // Retry failed request again
    } catch (refreshError) {
      this.authService.logOut();
      return Promise.reject(refreshError);
    } finally {
      this.isRefreshing = false;
      this.refreshPromise = null;
    }
  }

  private async refreshToken() {
    const refreshToken = this.authService.getRefreshToken();
    const accessToken = this.authService.getToken();

    const res = await this.apiClient.accountRefreshUserTokenList();

    //update cookie data
  }
}
