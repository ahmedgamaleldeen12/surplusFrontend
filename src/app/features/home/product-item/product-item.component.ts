import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { BasketService } from '../../basket/basket.service';
import { IProduct } from '../../../core/models/product';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-product-item',
  imports: [CommonModule, ToastModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
  providers: [MessageService],
})
export class ProductItemComponent {
  @Input() product!: any;
  private readonly basketService = inject(BasketService);
  private readonly messageService = inject(MessageService);

  addItemToBasket() {
    this.basketService.addItemToBasket(this.product);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'You successfully add a product order.',
      key: 'tl',
    });
  }
  getSpecsContent(label: string) {
    // let dat: string;
    // if (label.length > 90) {
    // }
  }
}
