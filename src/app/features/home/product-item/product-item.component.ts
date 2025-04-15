import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BasketService } from '../../basket/basket.service';
import { IProduct } from '../../../core/models/product';

@Component({
  selector: 'app-product-item',
  imports: [CommonModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {
  @Input() product!: any;

  private basketService!: BasketService;
  addItemToBasket() {
    this.basketService.addItemToBasket(this.product);
  }
}
