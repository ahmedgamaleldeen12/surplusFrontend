import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketTotals, IBasketItem } from '../../../core/models/basket';
import { BasketService } from '../basket.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasketSummaryComponent } from "../../../core/components/basket-summary/basket-summary.component";
import { OrderTotalsComponent } from "../../../core/components/order-totals/order-totals.component";

@Component({
  selector: 'app-basket',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, BasketSummaryComponent, OrderTotalsComponent],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent {
  basket$!: Observable<IBasket>;
  basketTotals$!: Observable<IBasketTotals>;

  constructor(private basketService: BasketService) { }

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
