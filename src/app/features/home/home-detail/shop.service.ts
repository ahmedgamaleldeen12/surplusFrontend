import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IBrand } from '../../../core/models/brand';
import { Pagination, IPagination } from '../../../core/models/pagination';
import { IProduct } from '../../../core/models/product';
import { IType } from '../../../core/models/productType';
import { ShopParams } from '../../../core/models/shopParams';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = environment.apiUrl;
  products: IProduct[] = [];
  brands: IBrand[] = [];
  types: IType[] = [];
  pagination = new Pagination();
  shopParams = new ShopParams();
  productCache = new Map();

  constructor(private http: HttpClient) {}

  getProducts(useCache: boolean) {
    if (useCache === false) {
      this.productCache = new Map();
    }

    if (this.productCache.size > 0 && useCache === true) {
      if (this.productCache.has(Object.values(this.shopParams).join('-'))) {
        this.pagination.data = this.productCache.get(
          Object.values(this.shopParams).join('-'),
        );
        return of(this.pagination);
      }
    }

    let params = new HttpParams();

    if (this.shopParams.brandId !== 0) {
      params = params.append('brandId', this.shopParams.brandId.toString());
    }

    if (this.shopParams.typeId !== 0) {
      params = params.append('categoryId', this.shopParams.typeId.toString());
    }

    if (this.shopParams.search) {
      params = params.append('search', this.shopParams.search);
    }

    params = params.append('sort', this.shopParams.sort);
    params = params.append('pageIndex', this.shopParams.pageNumber.toString());
    params = params.append('pageSize', this.shopParams.pageSize.toString());

    return this.http
      .get<IPagination>(this.baseUrl + 'api/' + 'product', {
        observe: 'response',
        params,
      })
      .pipe(
        map((response: any) => {
          this.productCache.set(
            Object.values(this.shopParams).join('-'),
            response.body.data,
          );
          this.pagination = response.body;
          return this.pagination;
        }),
      );
  }

  setShopParams(params: ShopParams) {
    this.shopParams = params;
  }

  getShopParams() {
    return this.shopParams;
  }

  getProduct(id: number) {
    let product: any;
    this.productCache.forEach((products: any) => {
      console.log(product);
      product = products.find((p: any) => p.id === id);
    });

    if (product) {
      return of(product);
    }

    return this.http.get<IProduct>(this.baseUrl + 'api/' + 'product/' + id);
  }

  getBrands() {
    if (this.brands.length > 0) {
      return of(this.brands);
    }
    return this.http
      .get<IBrand[]>(this.baseUrl + 'api/' + 'product/brands')
      .pipe(
        map((response) => {
          this.brands = response;
          return response;
        }),
      );
  }

  getTypes() {
    if (this.types.length > 0) {
      return of(this.types);
    }
    return this.http
      .get<IType[]>(this.baseUrl + 'api/' + 'product/categories')
      .pipe(
        map((response) => {
          this.types = response;
          return response;
        }),
      );
  }
}
