import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthComponent } from "./features/auth/auth.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  ngOnInit(): void {
    document.getElementsByTagName('body')[0].classList.add('blue-theme');
  }
  title = 'surplusFrontend';
}
