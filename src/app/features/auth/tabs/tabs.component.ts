import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  imports: [],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
})
export class TabsComponent {
  activeTab = signal<'login' | 'register'>('login');
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
    const currentPath = this.route.snapshot.firstChild?.url[0]?.path?.toLowerCase();

    if (currentPath === 'register') {
      if (this.activeTab() !== 'register') {
        this.activeTab.set('register');
      }
    } else {
      if (this.activeTab() !== 'login') {
        this.activeTab.set('login');
      }
    }
  }
}
