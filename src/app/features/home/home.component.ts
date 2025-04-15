import { ApiBaseService } from './../../core/services/ApiBase.service';
import { Component, inject } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { CarouselComponent } from "./carousel/carousel.component";
import { HomeDetailComponent } from "./home-detail/home-detail.component";
import { FooterComponent } from "./footer/footer.component";
import { CommonModule } from '@angular/common';
import { Product } from '../../core/types/UserRole';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HeaderComponent, CarouselComponent, HomeDetailComponent, FooterComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private readonly _apiBaseService = inject(ApiBaseService);
  async test(){
    let res =  await this._apiBaseService.apiClient.productCategoriesList();
  }
  
}
