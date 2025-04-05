import { Component } from '@angular/core';
import { ProductItemComponent } from "../product-item/product-item.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-detail',
  imports: [CommonModule, ProductItemComponent],
  templateUrl: './home-detail.component.html',
  styleUrl: './home-detail.component.scss'
})
export class HomeDetailComponent {
  view: 'grid' | 'list' = 'grid';

  setView(view: 'grid' | 'list') {
    this.view = view;
  }
}
