import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getOrdersForUser() {
    return this.http.get(this.baseUrl + 'api/' + 'orders');
  }

  getOrderDetailed(id: number) {
    return this.http.get(this.baseUrl + 'api/' + 'orders/' + id);
  }
}
