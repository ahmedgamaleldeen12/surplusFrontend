import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { filter } from 'rxjs';

@Component({
  selector: 'app-tabs',
  imports: [TabsModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
})
export class TabsComponent {
  // activeTab:  = 'login';
  activeTab = signal<'login' | 'register'>('login')
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  constructor() {}

  ngOnInit() {
    this.checkCurrentRoute();
  }

  onTabChange(tab: 'login' | 'register') {
    this.router.navigate(['/auth', tab]);
  }
  checkCurrentRoute() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const lastSegment =
          this.route.snapshot.firstChild?.url[0]?.path?.toLowerCase();
        if (lastSegment === 'register') {
          this.activeTab.set('register');
        } else {
          this.activeTab.set('login');
        }
      });
  }
}
