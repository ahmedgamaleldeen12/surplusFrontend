import { Component } from '@angular/core';
import { FooterComponent } from '../home/footer/footer.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FooterComponent, BreadcrumbModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  profile: any = {};
  profileImageUrl: string = '';
  selectedImage!: File;

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getProfile();

    this.items = [{ label: 'profile' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  getProfile() {
    this.http
      .get<any>('http://localhost:5049/api/Account/profile')
      .subscribe((res) => {
        this.profile = res;
        this.profileImageUrl = res.profileImage;
      });
  }

  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  uploadImage() {
    if (!this.selectedImage) return;
    const formData = new FormData();
    formData.append('file', this.selectedImage);

    this.http
      .post('http://localhost:5049/api/Account/upload-profile-image', formData)
      .subscribe(() => {
        this.getProfile(); // Refresh profile image
      });
  }
}
