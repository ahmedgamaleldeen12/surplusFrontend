import { Component, OnInit } from '@angular/core';
import { ProductItemComponent } from "../product-item/product-item.component";
import { CommonModule } from '@angular/common';
import { Slider } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../core/types/UserRole';
import { ApiBaseService } from '../../../core/services/ApiBase.service';
import { ProductToReturnDto } from '../../../data/api/data-contracts';
import { HttpClient } from '@angular/common/http';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-home-detail',
  imports: [CommonModule, ProductItemComponent , Slider , FormsModule],
  templateUrl: './home-detail.component.html',
  styleUrl: './home-detail.component.scss'
})
export class HomeDetailComponent implements OnInit {
  products: ProductToReturnDto[] = [];

  private readonly http!: HttpClient;
  totalCount!: number;

  private readonly baseService!: ApiBaseService;
  async ngOnInit() {
    await this.getProducts();
  }

  constructor(private shopService: ShopService) {}

  view: 'grid' | 'list' = 'grid';

  async getProducts(useCache?: false) {
    this.shopService.getProducts(useCache!).subscribe(response => {
      this.products = response.data;
      this.totalCount = response.count;
    }, error => {
      console.log(error);
    })
  }

  setView(view: 'grid' | 'list') {
    this.view = view;
  }
  rangeValues: number[] = [665, 1120];
  Products: Product[] =
  [
    {
      image: 'https://fdn2.gsmarena.com/vv/pics/huawei/huawei-p20-lite-1.jpg',
      brand: 'Huawei',
      sku: 'SKU:1283123',
      title: 'Huawei P20 Lite Edition X',
      specs: 'Kirin 659 - Mali-T830 MP2 GPU - 4 GB RAM - 64 GB - 5.84" IPS LCD 1080x2280',
      price: 1140,
    },
    {
      image: 'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s22-ultra-5g-1.jpg',
      brand: 'Samsung',
      sku: 'SKU:2387124',
      title: 'Samsung Galaxy S22 Ultra',
      specs: 'Snapdragon 8 Gen 1 - 12 GB RAM - 256 GB - 6.8" AMOLED 3080 × 1440',
      price: 3999,
    },
    {
      image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-air-spacegray-select-20220606?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1654122880566',
      brand: 'Apple',
      sku: 'SKU:9843721',
      title: 'Apple MacBook Air M2',
      specs: 'Apple M2 - 10-core GPU - 16 GB RAM - 1 TB SSD - 13.6" Retina 2560x1664',
      price: 5999,
    },
    {
      image: 'https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-13-ultra-1.jpg',
      brand: 'Xiaomi',
      sku: 'SKU:5637281',
      title: 'Xiaomi 13 Ultra',
      specs: 'Snapdragon 8 Gen 2 - 12 GB RAM - 512 GB - 6.73" AMOLED 1440x3200',
      price: 4499,
    },
    {
      image: 'https://fdn2.gsmarena.com/vv/pics/google/google-pixel-8-pro-1.jpg',
      brand: 'Google',
      sku: 'SKU:7821349',
      title: 'Google Pixel 8 Pro',
      specs: 'Google Tensor G3 - 12 GB RAM - 256 GB - 6.7" LTPO OLED 1344x2992',
      price: 3899,
    },
    {
      image: 'https://fdn2.gsmarena.com/vv/pics/sony/sony-xperia-1-v-1.jpg',
      brand: 'Sony',
      sku: 'SKU:1345283',
      title: 'Sony Xperia 1 V',
      specs: 'Snapdragon 8 Gen 2 - 12 GB RAM - 256 GB - 6.5" OLED 1644x3840',
      price: 4999,
    },
    {
      image: 'https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-11-1.jpg',
      brand: 'OnePlus',
      sku: 'SKU:8752387',
      title: 'OnePlus 11',
      specs: 'Snapdragon 8 Gen 2 - 16 GB RAM - 512 GB - 6.7" AMOLED 1440x3216',
      price: 3499,
    },
    {
      image: 'https://fdn2.gsmarena.com/vv/pics/asus/asus-rog-phone7-ultimate-1.jpg',
      brand: 'ASUS',
      sku: 'SKU:2631872',
      title: 'ASUS ROG Phone 7 Ultimate',
      specs: 'Snapdragon 8 Gen 2 - 16 GB RAM - 512 GB - 6.78" AMOLED 2448x1080',
      price: 4799,
    },
    {
      image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/ipad-pro-11-select-cell-spacegray-202210_GEO_SG?wid=470&hei=556&fmt=png-alpha&.v=1664411050343',
      brand: 'Apple',
      sku: 'SKU:1298371',
      title: 'iPad Pro 11-inch (M2)',
      specs: 'Apple M2 - 8-core GPU - 8 GB RAM - 256 GB - 11" Liquid Retina',
      price: 4299,
    },
    {
      image: 'https://fdn2.gsmarena.com/vv/pics/motorola/motorola-edge-40-1.jpg',
      brand: 'Motorola',
      sku: 'SKU:9821374',
      title: 'Motorola Edge 40',
      specs: 'Dimensity 8020 - 8 GB RAM - 256 GB - 6.55" P-OLED 1080x2400',
      price: 1999,
    },
    {
      image: 'https://fdn2.gsmarena.com/vv/pics/oppo/oppo-find-x6-pro-1.jpg',
      brand: 'Oppo',
      sku: 'SKU:5738172',
      title: 'Oppo Find X6 Pro',
      specs: 'Snapdragon 8 Gen 2 - 16 GB RAM - 512 GB - 6.82" AMOLED 1440x3168',
      price: 4799,
    },
    {
      image: 'https://fdn2.gsmarena.com/vv/pics/nothing/nothing-phone-2-1.jpg',
      brand: 'Nothing',
      sku: 'SKU:2873518',
      title: 'Nothing Phone (2)',
      specs: 'Snapdragon 8+ Gen 1 - 12 GB RAM - 512 GB - 6.7" OLED 1080x2412',
      price: 2299,
    },
    {
      image: 'https://fdn2.gsmarena.com/vv/pics/vivo/vivo-x90-pro-plus-1.jpg',
      brand: 'Vivo',
      sku: 'SKU:1234851',
      title: 'Vivo X90 Pro+',
      specs: 'Snapdragon 8 Gen 2 - 12 GB RAM - 256 GB - 6.78" AMOLED 1440x3200',
      price: 4399,
    },
    {
      image: 'https://fdn2.gsmarena.com/vv/pics/lenovo/lenovo-tab-extreme-1.jpg',
      brand: 'Lenovo',
      sku: 'SKU:3647283',
      title: 'Lenovo Tab Extreme',
      specs: 'Dimensity 9000 - 12 GB RAM - 256 GB - 14.5" OLED 3000x1876',
      price: 3699,
    },
    {
      image: 'https://fdn2.gsmarena.com/vv/pics/honor/honor-magic5-pro-1.jpg',
      brand: 'Honor',
      sku: 'SKU:1928374',
      title: 'Honor Magic5 Pro',
      specs: 'Snapdragon 8 Gen 2 - 12 GB RAM - 512 GB - 6.81" OLED 1312x2848',
      price: 4199,
    }
 ];
}
