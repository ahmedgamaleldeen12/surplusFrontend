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
import { BusinessService } from './Business.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
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
    ToastModule,
    CommonModule
  ],
  providers: [MessageService],
})
export class BusinessHomeComponent implements OnInit {
naviagte() {
throw new Error('Method not implemented.');
}
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
  private readonly businessService = inject(BusinessService);
  private readonly messageService = inject(MessageService);

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
      picture: [this.selectedFile, Validators.required],
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
  addNewProduct() {
    const formData = new FormData();
    const formValue = this.productForm.value;
    formData.append('name', formValue.name);
    formData.append('description', formValue.description);
    formData.append('price', formValue.price);
    formData.append('quantity', formValue.quantity);
    formData.append('categoryId', formValue.categoryId);
    formData.append('picture', formValue.picture);
    this.businessService.addProduct(formData).subscribe((res) => {
      if (res) {
        this.productForm.reset();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'You successfully add a product order.',
        });
      }
    });
  }
  selectedFile!: File | null;

  uploadSuccess = false;
imagePreviewUrl: string | null = null;

onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    this.productForm.patchValue({ picture: file });
    this.productForm.get('picture')?.updateValueAndValidity();
    this.uploadSuccess = true;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviewUrl = reader.result as string;
    };
    reader.readAsDataURL(file);

    setTimeout(() => {
      this.uploadSuccess = false;
    }, 2000);
  }
}

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.selectedFile = file;
      this.productForm.patchValue({ picture: file });
      this.productForm.get('picture')?.updateValueAndValidity();
    }
  }
  onDragOver(event: DragEvent) {
    event.preventDefault();
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
