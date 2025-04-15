import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-order-totals',
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './order-totals.component.html',
  styleUrl: './order-totals.component.scss'
})
export class OrderTotalsComponent {
  @Input() shippingPrice!: number;
  @Input() subtotal!: number;
  @Input() total!: number;

  constructor() { }

  ngOnInit(): void {
  }
}
