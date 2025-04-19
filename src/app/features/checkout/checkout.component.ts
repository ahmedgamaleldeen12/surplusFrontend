import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { IBasketTotals } from '../../core/models/basket';
import { BasketService } from '../basket/basket.service';
import { AuthService } from '../../core/services/Auth.service';
import { CommonModule } from '@angular/common';
import { StepperComponent } from "../../core/components/stepper/stepper.component";
import { CheckoutAddressComponent } from "./checkout-address/checkout-address.component";
import { CheckoutDeliveryComponent } from "./checkout-delivery/checkout-delivery.component";
import { CheckoutReviewComponent } from "./checkout-review/checkout-review.component";
import { CheckoutPaymentComponent } from "./checkout-payment/checkout-payment.component";
import { OrderTotalsComponent } from "../../core/components/order-totals/order-totals.component";
import { CdkStepperModule } from '@angular/cdk/stepper';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CdkStepperModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  checkoutForm!: FormGroup;
  basketTotals$!: Observable<IBasketTotals>;

  constructor(private fb: FormBuilder, private accountService: AuthService, private basketService: BasketService) { }

  ngOnInit(): void {
    this.createCheckoutForm();
    this.getAddressFormValues();
    this.getDeliveryMethodValue();
    this.basketTotals$ = this.basketService.basketTotal$;
  }

  createCheckoutForm() {
    this.checkoutForm = this.fb.group({
      addressForm: this.fb.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        street: [null, Validators.required],
        city: [null, Validators.required],
        country: [null, Validators.required],
      }),
      deliveryForm: this.fb.group({
        deliveryMethod: [null, Validators.required]
      }),
      paymentForm: this.fb.group({
        nameOnCard: [null, Validators.required]
      })
    })
  }

  getAddressFormValues() {
    this.accountService.getUserAddress().subscribe((address: any) => {
      if (address) {
        this.checkoutForm.get('addressForm')!.patchValue(address);
      }
    }, (error: any) => {
      console.log(error);
    })
  }

  getDeliveryMethodValue() {
    const basket = this.basketService.getCurrentBasketValue();
    if (basket.deliveryMethodId !== null) {
      this.checkoutForm.get('deliveryForm')!.get('deliveryMethod')!.patchValue(basket.deliveryMethodId!.toString());
    }
  }
}
