import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  addProduct(data: any) {
    return this.http.post(this.baseUrl + 'api/NewLetter', data, {
      responseType: 'text' as 'json' // 👈 This tells Angular not to expect JSON
    });
  }
}
