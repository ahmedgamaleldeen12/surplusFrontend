import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IAddress } from '../../../core/models/address';
import { AuthService } from '../../../core/services/Auth.service';
import { TextInputComponent } from "../../../core/components/text-input/text-input.component";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CdkStepperModule } from '@angular/cdk/stepper';

@Component({
  selector: 'app-checkout-address',
  standalone: true,
  imports: [
    TextInputComponent,
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    CdkStepperModule
  ],
  templateUrl: './checkout-address.component.html',
  styleUrl: './checkout-address.component.scss'
})
export class CheckoutAddressComponent implements OnInit {
  @Input() checkoutForm!: FormGroup;
  loading = false;

  constructor(
    private accountService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (!this.checkoutForm?.get('addressForm')) {
      console.warn('Address form not initialized.');
    }
  }

  saveUserAddress(): void {
    const addressForm = this.checkoutForm.get('addressForm');
    if (!addressForm?.valid) {
      this.toastr.warning('Please complete all required address fields.');
      return;
    }

    this.loading = true;

    debugger
    console.log('addressForm.value', addressForm.value);

    this.accountService.updateUserAddress(addressForm.value as IAddress)
      .subscribe({
        next: (address: IAddress) => {
          this.toastr.success('Address saved');
          addressForm.reset(address);
          this.loading = false;
        },
        error: (error) => {
          this.toastr.error(error?.message || 'Failed to save address');
          console.error('Address update error:', error);
          this.loading = false;
        }
      });
  }
}
