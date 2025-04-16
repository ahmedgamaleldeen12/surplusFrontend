import { Component } from '@angular/core';
import { FooterComponent } from "../home/footer/footer.component";
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-profile',
  imports: [FooterComponent,BreadcrumbModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  items: MenuItem[] | undefined;

    home: MenuItem | undefined;

    ngOnInit() {
        this.items = [
            { label: 'profile' },
        ];

        this.home = { icon: 'pi pi-home', routerLink: '/' };
    }
}
