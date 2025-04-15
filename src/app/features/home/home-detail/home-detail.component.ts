import { Component, OnInit } from '@angular/core';
import { ProductItemComponent } from "../product-item/product-item.component";
import { CommonModule } from '@angular/common';
import { ApiBaseService } from '../../../core/services/ApiBase.service';
import { ProductToReturnDto } from '../../../data/api/data-contracts';

@Component({
  selector: 'app-home-detail',
  imports: [CommonModule, ProductItemComponent],
  templateUrl: './home-detail.component.html',
  styleUrl: './home-detail.component.scss'
})
export class HomeDetailComponent implements OnInit {
  products: ProductToReturnDto[] = [];

  private readonly baseService!: ApiBaseService;
  async ngOnInit() {
    await this.getProducts();
  }

  view: 'grid' | 'list' = 'grid';

  async getProducts() {
    let res = await this.baseService.apiClient.productList();
    this.products = res.data.data!;
  }

  setView(view: 'grid' | 'list') {
    this.view = view;
  }
}
