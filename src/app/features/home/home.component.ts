import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { CarouselComponent } from "./carousel/carousel.component";
import { HomeDetailComponent } from "./home-detail/home-detail.component";
import { FooterComponent } from "./footer/footer.component";
import { CommonModule } from '@angular/common';
import { HeaderCategoriesComponent } from "./header-categories/header-categories.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, HeaderComponent, CarouselComponent, HomeDetailComponent, FooterComponent, HeaderCategoriesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
