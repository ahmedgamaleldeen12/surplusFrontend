import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';

interface Banner {
  title: string;
  subtitle: string;
  discount: string;
  image: string;
}

@Component({
  selector: 'app-carousel',
  imports: [CommonModule, CarouselModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {
  banners: Banner[] = [
    {
      title: 'SMART WEARABLE.',
      subtitle: 'Best Deal Online on smart watches',
      discount: 'UP to 80% OFF',
      image: 'assets/images/smartwatch.png'
    },
    {
      title: 'SMART WEARABLE.',
      subtitle: 'Best Deal Online on smart watches',
      discount: 'UP to 80% OFF',
      image: 'assets/images/smartwatch.png'
    },
    {
      title: 'SMART WEARABLE.',
      subtitle: 'Best Deal Online on smart watches',
      discount: 'UP to 80% OFF',
      image: 'assets/images/smartwatch.png'
    },
    {
      title: 'SMART WEARABLE.',
      subtitle: 'Best Deal Online on smart watches',
      discount: 'UP to 80% OFF',
      image: 'assets/images/smartwatch.png'
    }
  ];

  responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1
    }
  ];
}
