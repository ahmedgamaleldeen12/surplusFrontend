import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthComponent } from "./features/auth/auth.component";
import { BasketService } from './features/basket/basket.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    document.getElementsByTagName('body')[0].classList.add('blue-theme');
    this.loadBasket();
  }
  title = 'surplus';

  loadBasket() {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this.basketService.getBasket(basketId).subscribe(() => {
        console.log('initialised basket');
      }, error => {
        console.log(error);
      })
    }
  }
}
