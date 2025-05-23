import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IBasket } from '../../../core/models/basket';
import { BasketService } from '../../basket/basket.service';
import { CheckoutService } from '../checkout.service';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from '../../../core/components/text-input/text-input.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

declare var Stripe: any;

@Component({
  selector: 'app-checkout-payment',
  imports: [TextInputComponent, CommonModule, ReactiveFormsModule, CdkStepperModule, ToastModule],
  templateUrl: './checkout-payment.component.html',
  styleUrl: './checkout-payment.component.scss',
  providers: [MessageService],
})
export class CheckoutPaymentComponent {
  @Input() checkoutForm!: FormGroup;
  @ViewChild('cardNumber', { static: true }) cardNumberElement!: ElementRef;
  @ViewChild('cardExpiry', { static: true }) cardExpiryElement!: ElementRef;
  @ViewChild('cardCvc', { static: true }) cardCvcElement!: ElementRef;
  stripe: any;
  cardNumber: any;
  cardExpiry: any;
  cardCvc: any;
  cardErrors: any;
  cardHandler = this.onChange.bind(this);
  loading = false;
  cardNumberValid = false;
  cardExpiryValid = false;
  cardCvcValid = false;

  private readonly messageService = inject(MessageService);

  constructor(private basketService: BasketService, private checkoutService: CheckoutService,
    private toastr: ToastrService, private router: Router) { }

  ngAfterViewInit(): void {
    this.stripe = Stripe('pk_test_51R7GAqH8fwIrcqc8aXYgNf4yB9puIUkQyUgi8QfwxPKy4paxJ47OfeWX2lCQ3uelsQP3qgkxYo3N4S3E27g8xILf00d5KrKbue');
    const elements = this.stripe.elements();

    this.cardNumber = elements.create('cardNumber');
    this.cardNumber.mount(this.cardNumberElement.nativeElement);
    this.cardNumber.addEventListener('change', this.cardHandler);

    this.cardExpiry = elements.create('cardExpiry');
    this.cardExpiry.mount(this.cardExpiryElement.nativeElement);
    this.cardExpiry.addEventListener('change', this.cardHandler);

    this.cardCvc = elements.create('cardCvc');
    this.cardCvc.mount(this.cardCvcElement.nativeElement);
    this.cardCvc.addEventListener('change', this.cardHandler);
  }

  ngOnDestroy(): void {
    this.cardNumber.destroy();
    this.cardExpiry.destroy();
    this.cardCvc.destroy();
  }

  onChange(event: any) {
    if (event.error) {
      this.cardErrors = event.error.message;
    } else {
      this.cardErrors = null;
    }
    switch(event.elementType) {
      case 'cardNumber':
        this.cardNumberValid = event.complete;
        break;
      case 'cardExpiry':
        this.cardExpiryValid = event.complete;
        break;
      case 'cardCvc':
        this.cardCvcValid = event.complete;
        break;
    }
  }

  async submitOrder() {
    // debugger;
    this.loading = true;
    const basket = this.basketService.getCurrentBasketValue();
    try {
      const createdOrder = await this.createOrder(basket); // api
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Order created' });
      this.basketService.deleteLocalBasket(basket.id);
      setTimeout(() => {
        this.router.navigate(['/marketplace']);
      }, 1000);
      // const paymentResult = await this.confirmPaymentWithStripe(basket);
      // if (paymentResult.paymentIntent) {
      //   // if (true) {
      //   this.basketService.deleteLocalBasket(basket.id);
      //   const navigationExtras: NavigationExtras = { state: createdOrder };
      //   this.router.navigate(['checkout/success'], navigationExtras);
      // } else {
      //   this.toastr.error(paymentResult.error.message);
      // }
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  }

  private async confirmPaymentWithStripe(basket: any) {
    // debugger
    console.log(this.cardNumber)
    console.log(this.checkoutForm.get('paymentForm')!.get('nameOnCard')!.value)

    return this.stripe.confirmCardPayment(basket.clientSecret, { // then stripe will call webhook endpoint
      payment_method: {
        card: this.cardNumber,
        billing_details: {
          name: this.checkoutForm.get('paymentForm')!.get('nameOnCard')!.value
        }
      }
    });
  }

  private async createOrder(basket: IBasket) {
    const orderToCreate = this.getOrderToCreate(basket);
    return this.checkoutService.createOrder(orderToCreate).toPromise();
  }


  private getOrderToCreate(basket: IBasket) {
    return {
      basketId: basket.id,
      deliveryMethodId: +this.checkoutForm.get('deliveryForm')!.get('deliveryMethod')!.value,
      ShippingAddress: this.checkoutForm.get('addressForm')!.value
    };
  }
}
