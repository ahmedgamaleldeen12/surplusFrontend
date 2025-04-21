import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from './profile.component';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/services/Auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  baseUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);
  constructor() {}


  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}api/Account/profile`);
  }
  updateImage(formData : FormData){
    return this.http.post(`${this.baseUrl}api/Account/upload-profile-image`, formData)
  }
  updateProfile(data : User){
    return this.http.put(`${this.baseUrl}api/Account/profile`, data)
  }
}
