import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { TabsComponent } from "./tabs/tabs.component";

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet, TabsModule, TabsComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

}
