import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component';
import { BasketService } from './features/basket/basket.service';
import { AuthService } from './core/services/Auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'surplusFrontend';
  constructor(
    private basketService: BasketService,
    private accountService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadBasket();
    // this.loadCurrentUser();
    document.getElementsByTagName('body')[0].classList.add('blue-theme');
  }

  // loadCurrentUser() {
  //   const token = this.accountService.getToken();
  //   this.accountService.loadCurrentUser(token!).subscribe((res: any) => {
  //     console.log('loaded user');
  //   }, (error: any) => {
  //     console.log(error);
  //   })
  // }

  loadBasket() {
    debugger
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this.basketService.getBasket(basketId).subscribe(
        () => {
          console.log('initialised basket');
        },
        (error) => {
          console.log(error);
        },
      );
    }
  }
}
