import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IBasket,
  IBasketTotals,
  IBasketItem,
} from '../../../core/models/basket';
import { BasketService } from '../basket.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasketSummaryComponent } from '../../../core/components/basket-summary/basket-summary.component';
import { OrderTotalsComponent } from '../../../core/components/order-totals/order-totals.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/Auth.service';

@Component({
  selector: 'app-basket',
  imports: [
    CommonModule,
    FormsModule,
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
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
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
  handleAuthNavigate() {
    if (this.authService.isAuthenticated() && this.authService.getUserRole() == 'User') {
      this.router.navigate(['./checkout']);
    } else {
      this.authService.setTempAuthRole('User');
      this.router.navigate(['./auth/login']);
    }
  }
}
