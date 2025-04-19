import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  addProduct(formData: FormData) {
    return this.http.post(this.baseUrl + 'api/Product', formData, {
      headers: {
        'accept': 'text/plain'
      }
    });
  }

}
