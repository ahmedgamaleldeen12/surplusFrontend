import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './profile.component';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}


  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}api/Account/profile`);
  }
  updateImage(formData : FormData){
    return this.http.post(`${this.baseUrl}api/Account/upload-profile-image`, formData)
  }
  updateProfile(data : User){
    // debugger
    return this.http.put(`${this.baseUrl}api/Account/profile`, data)
  }
}
