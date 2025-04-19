import { Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from '../home/footer/footer.component';
import { TableModule } from 'primeng/table';
import { AuthService } from '../../core/services/Auth.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Select } from 'primeng/select';
import { FloatLabel } from 'primeng/floatlabel';
import { ShopService } from '../home/home-detail/shop.service';
import { IType } from '../../core/models/productType';
@Component({
  selector: 'app-business-home',
  templateUrl: './business-home.component.html',
  styleUrls: ['./business-home.component.scss'],
  imports: [
    FooterComponent,
    TableModule,
    Select,
    FloatLabel,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class BusinessHomeComponent implements OnInit {
  listings: Listing[] = [
    {
      date: '11/11/2022',
      name: 'Fire&Blood',
      brandName: 'George R.R Martin',
      price: 3456,
      status: 'Accepted',
      quantity: 3456,
    },
    {
      date: '22/10/2022',
      name: 'Bridge of clay',
      brandName: 'Markus Suzak',
      price: 2800,
      status: 'Declined',
      quantity: 3456,
    },
    {
      date: '22/05/2022',
      name: 'Do Epic Shit',
      brandName: 'Ankur Warikoo',
      price: 120,
      status: 'Pending',
      quantity: 3456,
    },
    {
      date: '14/07/2020',
      name: "My Sister's Keeper",
      brandName: 'Jodi Picoult',
      price: 15,
      status: 'Pending',
      quantity: 3456,
    },
    {
      date: '12/04/2021',
      name: 'Atomic Habits',
      brandName: 'James Clear',
      price: 33983,
      status: 'Accepted',
      quantity: 3456,
    },
    {
      date: '02/02/2022',
      name: 'Dune',
      brandName: 'Frank Herbert',
      price: 11832,
      status: 'Declined',
      quantity: 3456,
    },
  ];

  private readonly authService = inject(AuthService);
  private readonly shopService = inject(ShopService);

  private readonly fb = inject(FormBuilder);
  userName!: string;
  productForm!: FormGroup;
  categoryId!: number;
  categories: IType[] = [];
  constructor() {}

  async ngOnInit() {
    this.initForm();
    this.userName = this.authService.getUserName();
    await this.getTypes();
  }
  initForm() {
    this.productForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, Validators.required],
      quantity: [null, Validators.required],
      categoryId: [null, Validators.required],
    });
  }

  getTypes() {
    this.shopService.getTypes().subscribe(
      (response) => {
        this.categories = response;
      },
      (error) => {
        console.log(error);
      },
    );
  }
  addNewProduct(){
    console.log(this.productForm.value);

  }
}

export interface Listing {
  date: string;
  name: string;
  brandName: string;
  price: number;
  status: string;
  quantity: number;
}
