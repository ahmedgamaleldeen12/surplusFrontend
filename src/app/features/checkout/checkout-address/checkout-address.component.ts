import { Component, Input } from '@angular/core';
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
  imports: [TextInputComponent, CommonModule, ReactiveFormsModule, RouterLink, CdkStepperModule],
  templateUrl: './checkout-address.component.html',
  styleUrl: './checkout-address.component.scss'
})
export class CheckoutAddressComponent {
  @Input() checkoutForm!: FormGroup;

  constructor(private accountService: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  saveUserAddress() {
    this.accountService.updateUserAddress(this.checkoutForm.get('addressForm')!.value).subscribe((address: IAddress) => {
      this.toastr.success('Address saved');
      this.checkoutForm.get('addressForm')!.reset(address);
    }, error => {
      this.toastr.error(error.message);
      console.log(error);
    })
  }
}
