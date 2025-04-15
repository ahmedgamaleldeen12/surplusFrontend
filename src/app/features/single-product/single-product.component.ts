import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../home/header/header.component";

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss'],
  imports: [HeaderComponent]
})
export class SingleProductComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  price = 3850;
  currency = 'SAR';
  tax = 672;

  addToCart() {
    console.log('Added to cart');
  }
}
