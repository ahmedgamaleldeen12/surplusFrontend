import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ProductItemComponent } from '../product-item/product-item.component';
import { CommonModule } from '@angular/common';
import { Slider } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { ShopService } from './shop.service';
import { IBrand } from '../../../core/models/brand';
import { CustomPaginatorComponent } from '../../../shared/custom-paginator/custom-paginator.component';
import { ShopParams } from '../../../core/models/shopParams';
import { IType } from '../../../core/models/productType';
import { IProduct } from '../../../core/models/product';

@Component({
  selector: 'app-home-detail',
  imports: [
    CommonModule,
    ProductItemComponent,
    Slider,
    FormsModule,
  ],
  templateUrl: './home-detail.component.html',
  styleUrl: './home-detail.component.scss',
})
export class HomeDetailComponent implements OnInit {
  products: IProduct[] = [];
  brands: IBrand[] = [];
  types: IType[] = [];
  totalCount!: number;
  shopParams: ShopParams;
  rangeValues: number[] = [665, 1120];
  sortOptions = [
    { name: 'Price: Low to high', value: 'priceAsc' },
    { name: 'Price: High to low', value: 'priceDesc' },
  ];
  @ViewChild('search', { static: false }) searchTerm!: ElementRef;
  private readonly shopService = inject(ShopService);
  async ngOnInit() {
    await this.getProducts(true);
    // await this.getBrands();
    await this.getTypes();
  }

  constructor() {
    this.shopParams = this.shopService.getShopParams();
  }

  view: 'grid' | 'list' = 'grid';

  async getProducts(useCache: boolean = false) {
    this.shopService.getProducts(useCache!).subscribe(
      (response) => {
        this.products = response.data;
        this.totalCount = response.count;
      },
      (error) => {
        console.log(error);
      },
    );
  }
  getBrands() {
    this.shopService.getBrands().subscribe(
      (response) => {
        this.brands = [{ id: 0, name: 'All' }, ...response];
      },
      (error) => {
        console.log(error);
      },
    );
  }
  setView(view: 'grid' | 'list') {
    this.view = view;
  }
  onSearch() {
    const params = this.shopService.getShopParams();
    params.search = this.searchTerm.nativeElement.value;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  getTypes() {
    this.shopService.getTypes().subscribe(
      (response) => {
        this.types = [{ id: 0, name: 'All' }, ...response];
      },
      (error) => {
        console.log(error);
      },
    );
  }

  onBrandSelected(brandId: number) {
    const params = this.shopService.getShopParams();
    params.brandId = brandId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    const params = this.shopService.getShopParams();
    params.typeId = typeId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onSortSelected(sort: string) {
    const params = this.shopService.getShopParams();
    params.sort = sort;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  // onPageChanged(event: any) {
  //   const params = this.shopService.getShopParams();
  //   if (params.pageNumber !== event) {
  //     params.pageNumber = event;
  //     this.shopService.setShopParams(params);
  //     this.getProducts(true);
  //   }
  // }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.shopService.setShopParams(this.shopParams);
    this.getProducts();
  }
}
