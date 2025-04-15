import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket } from '../../../core/models/basket';
import { BasketService } from '../../basket/basket.service';
import { ToastrService } from 'ngx-toastr';
import { CdkStepper } from '@angular/cdk/stepper';
import { BasketSummaryComponent } from "../../../core/components/basket-summary/basket-summary.component";
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout-review',
  imports: [BasketSummaryComponent, CommonModule, AsyncPipe],
  templateUrl: './checkout-review.component.html',
  styleUrl: './checkout-review.component.scss'
})
export class CheckoutReviewComponent {
  @Input() appStepper!: CdkStepper;
  basket$!: Observable<IBasket>;

  constructor(private basketService: BasketService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  createPaymentIntent() {
    return this.basketService.createPaymentIntent().subscribe((response: any) => {
      this.appStepper.next();
    }, error => {
      console.log(error);
    })
  }
}
