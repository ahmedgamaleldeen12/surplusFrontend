import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IDeliveryMethod } from '../../../core/models/deliveryMethod';
import { BasketService } from '../../basket/basket.service';
import { CheckoutService } from '../checkout.service';
import { CommonModule } from '@angular/common';
import { CdkStepperModule } from '@angular/cdk/stepper';

@Component({
  selector: 'app-checkout-delivery',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CdkStepperModule],
  templateUrl: './checkout-delivery.component.html',
  styleUrl: './checkout-delivery.component.scss'
})
export class CheckoutDeliveryComponent {
  @Input() checkoutForm!: FormGroup;
  deliveryMethods!: IDeliveryMethod[];

  constructor(private checkoutService: CheckoutService, private basketService: BasketService) { }

  ngOnInit(): void {
    this.checkoutService.getDeliveryMethods().subscribe((dm: IDeliveryMethod[]) => {this.deliveryMethods = dm;
    }, error => {
      console.log(error);
    })
  }

  setShippingPrice(deliveryMethod: IDeliveryMethod) {
    this.basketService.setShippingPrice(deliveryMethod);
  }
}
