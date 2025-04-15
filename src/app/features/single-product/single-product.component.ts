import { Component, model, OnInit } from '@angular/core';
import { HeaderComponent } from '../home/header/header.component';
import { FooterComponent } from '../home/footer/footer.component';
import { CommonModule } from '@angular/common';
import { GalleriaModule } from 'primeng/galleria';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss'],
  imports: [
    HeaderComponent,
    FooterComponent,
    CommonModule,
    GalleriaModule,
    FormsModule
  ],
})
export class SingleProductComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  images = [
    {
      itemImageSrc: 'https://primeng.org/images/galleria/galleria1.jpg',
      thumbnailImageSrc: 'https://primeng.org/images/galleria/galleria1s.jpg',
      alt: 'Laptop Image 1',
      title: 'MacBook - Front View'
    },
    {
      itemImageSrc: 'https://primeng.org/images/galleria/galleria2.jpg',
      thumbnailImageSrc: 'https://primeng.org/images/galleria/galleria2s.jpg',
      alt: 'Laptop Image 2',
      title: 'MacBook - Keyboard Close-up'
    },
    {
      itemImageSrc: 'https://primeng.org/images/galleria/galleria3.jpg',
      thumbnailImageSrc: 'https://primeng.org/images/galleria/galleria3s.jpg',
      alt: 'Laptop Image 3',
      title: 'MacBook - Open View'
    },
    {
      itemImageSrc: 'https://primeng.org/images/galleria/galleria4.jpg',
      thumbnailImageSrc: 'https://primeng.org/images/galleria/galleria4s.jpg',
      alt: 'Laptop Image 4',
      title: 'MacBook - Side Profile'
    }
  ];



  responsiveOptions: any[] = [
      {
          breakpoint: '1300px',
          numVisible: 4
      },
      {
          breakpoint: '575px',
          numVisible: 1
      }
  ];

}
