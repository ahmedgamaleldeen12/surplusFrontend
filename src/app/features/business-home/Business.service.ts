import { AuthService } from './../../core/services/Auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ProductToReturnDto } from './business-home.component';

@Injectable({
  providedIn: 'root',
})
export class BusinessService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService : AuthService) {}
  addProduct(formData: FormData) {
    return this.http.post(this.baseUrl + 'api/Product', formData, {
      headers: { accept: 'text/plain' },
    });
  }
  getPagedProducts() {
    return this.http.get<ProductToReturnDto[]>(this.baseUrl + 'api/Product/supplier-products', {
      params: new HttpParams().set('userId', this.authService.getUserId()),
      headers: new HttpHeaders({ 'Accept': 'text/plain' })
    });
  }
}
