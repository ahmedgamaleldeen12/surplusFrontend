import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {IBasket,IBasketTotals,IBasketItem} from '../../../core/models/basket';
import { BasketService } from '../basket.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasketSummaryComponent } from '../../../core/components/basket-summary/basket-summary.component';
import { OrderTotalsComponent } from '../../../core/components/order-totals/order-totals.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-basket',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
    BasketSummaryComponent,
    OrderTotalsComponent,
  ],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
})
export class BasketComponent {
  basket$!: Observable<IBasket>;
  basketTotals$!: Observable<IBasketTotals>;
  private readonly basketService = inject(BasketService);
  constructor() {}

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
    this.basketTotals$ = this.basketService.basketTotal$;
  }

  removeBasketItem(item: IBasketItem) {
    this.basketService.removeItemFromBasket(item);
  }

  incrementItemQuantity(item: IBasketItem) {
    this.basketService.incrementItemQuantity(item);
  }

  decrementItemQuantity(item: IBasketItem) {
    this.basketService.decrementItemQuantity(item);
  }
}
