import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from '../../../core/models/order';
import { OrdersService } from '../orders.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrderTotalsComponent } from "../../../core/components/order-totals/order-totals.component";
import { BasketSummaryComponent } from "../../../core/components/basket-summary/basket-summary.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders-detailed',
  imports: [CommonModule, OrderTotalsComponent, BasketSummaryComponent],
  templateUrl: './orders-detailed.component.html',
  styleUrl: './orders-detailed.component.scss',
})
export class OrdersDetailedComponent {
  order!: IOrder;

  constructor(
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private orderService: OrdersService,
  ) {
    this.breadcrumbService.set('@OrderDetailed', ' ');
  }

  ngOnInit(): void {
    // debugger;
    console.log(+this.route.snapshot.paramMap.get('id')!);
    this.orderService
      .getOrderDetailed(+this.route.snapshot.paramMap.get('id')!)
      .subscribe(
        (order: any) => {
          this.order = order;
          console.log(order);
          this.breadcrumbService.set(
            '@OrderDetailed',
            `Order# ${order.id} - ${order.status}`,
          );
        },
        (error) => {
          console.log(error);
        },
      );
  }
}
