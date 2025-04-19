import { AdminPanelService } from './admin-panel.service';
import { Component, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ProductStatus, ProductToReturnDto } from '../business-home/business-home.component';
import { CommonModule, DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/Auth.service';
import { ShopService } from '../home/home-detail/shop.service';
import { IType } from '../../core/models/productType';

@Component({
  selector: 'app-admin-panel',
  imports: [TableModule, CommonModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss',
  providers: [MessageService, DatePipe ],
})
export class AdminPanelComponent {
  listings: ProductToReturnDto[] = [];
  categories: IType[] = [];

  private readonly authService = inject(AuthService);
  private readonly shopService = inject(ShopService);
  private readonly adminPanelService = inject(AdminPanelService);
  // private readonly businessService = inject(BusinessService);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);

  async ngOnInit() {
    await this.getTypes();
    await this.getOrders();

  }
  async getOrders(){
    await this.adminPanelService.getSupplierOrders().subscribe((res)=>{
      this.listings = res;
    })
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
   getStatusLabel(status: ProductStatus): string {
      return this.productStatusMap[status] || 'Unknown';
    }
    getCategoryLabel(id:number){
      return this.categories.find(c=> c.id == id)?.name
    }
      productStatusMap = {
        [ProductStatus.Pending]: 'Pending',
        [ProductStatus.Accepted]: 'Accepted',
        [ProductStatus.Declined]: 'Declined',
      };
}
