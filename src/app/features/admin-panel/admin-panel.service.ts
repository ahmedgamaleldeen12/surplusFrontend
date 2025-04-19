import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductToReturnDto } from '../business-home/business-home.component';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminPanelService {
  private readonly http = inject(HttpClient);
    baseUrl = environment.apiUrl;

  constructor() { }

  getSupplierOrders(){
   return this.http.get<ProductToReturnDto[]>(this.baseUrl + 'api/Product/pending', {
      headers: new HttpHeaders({ 'Accept': 'text/plain' })
    });
  }

}
