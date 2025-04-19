import { Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from '../home/footer/footer.component';
import { TableModule } from 'primeng/table';
import { AuthService } from '../../core/services/Auth.service';
import {FormBuilder,FormGroup,FormsModule,ReactiveFormsModule,Validators} from '@angular/forms';
import { Select } from 'primeng/select';
import { FloatLabel } from 'primeng/floatlabel';
import { ShopService } from '../home/home-detail/shop.service';
import { IType } from '../../core/models/productType';
import { BusinessService } from './Business.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';

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
    CommonModule,
  ],
  providers: [MessageService, DatePipe],
})
export class BusinessHomeComponent implements OnInit {
  listings: ProductToReturnDto[] = [];

  private readonly authService = inject(AuthService);
  private readonly shopService = inject(ShopService);
  private readonly businessService = inject(BusinessService);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);
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
    await this.getpreviosOrders();
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
    formData.append('userId', this.authService.getUserId());

    this.businessService.addProduct(formData).subscribe((res) => {
      if (res) {
        this.productForm.reset();
        this.imagePreviewUrl = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'You successfully add a product order.',
        });
        this.ngOnInit();
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
  naviagte() {
    this.router.navigate(['./profile']);
  }
  async getpreviosOrders() {
    await this.businessService.getPagedProducts().subscribe((res) => {
      this.listings = res;
    });
  }
  productStatusMap = {
    [ProductStatus.Pending]: 'Pending',
    [ProductStatus.Accepted]: 'Accepted',
    [ProductStatus.Declined]: 'Declined',
  };
  getStatusLabel(status: ProductStatus): string {
    return this.productStatusMap[status] || 'Unknown';
  }
  getCategoryLabel(id:number){
    return this.categories.find(c=> c.id == id)?.name
  }
}

export interface ProductToReturnDto {
  id: number;
  name: string;
  description: string;
  pictureUrl: string;
  price: number;
  date: string;
  quantity: number;
  categoryId: number;
  category: string;
  status: ProductStatus;
}

export enum ProductStatus {
  Pending = 0,
  Accepted = 1,
  Declined = 2,
}
