import { Product } from './../../../core/types/UserRole';
import { CommonModule } from '@angular/common';
import { Component, inject, input, Input } from '@angular/core';
import { BasketService } from '../../basket/basket.service';
import { IProduct } from '../../../core/models/product';

@Component({
  selector: 'app-product-item',
  imports: [CommonModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  @Input() product!: any;

  private basketService = inject(BasketService);
  addItemToBasket() {
    debugger
    console.log(this.product);
    this.basketService.addItemToBasket(this.product);
  }
}
