import { Component, inject } from '@angular/core';
import { FooterComponent } from '../home/footer/footer.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem, MessageService } from 'primeng/api';
import { ProfileService } from './profile.service';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FooterComponent, BreadcrumbModule, FormsModule, ToastModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [MessageService],
})
export class ProfileComponent {
  profile!: User;
  Address: Address = {
    firstName: '',
    street: '',
    city: '',
    country: ''
  };
  profileImageUrl: string = '';
  selectedImage!: File;
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;
  profileForm!: FormGroup;

  private readonly profileService = inject(ProfileService);
  private readonly fb = inject(FormBuilder);
  private readonly messageService = inject(MessageService);

  constructor() {}

  ngOnInit() {
    this.getProfileData();
    this.items = [{ label: 'profile' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }
  initForm() {
    this.profileForm = this.fb.group({});
  }
  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0];
    this.uploadImage();
  }
  async getProfileData() {
    await this.profileService.getProfile().subscribe((res) => {
      this.profile = res;
      this.Address = res.address || {
        firstName: '',
        street: '',
        city: '',
        country: ''
      };
    });
  }
  uploadImage() {
    if (!this.selectedImage) return;
    const formData = new FormData();
    formData.append('file', this.selectedImage);
    this.profileService.updateImage(formData).subscribe((res) => {
      this.getProfileData();
    });
  }
  async updateProfile() {
    let data: User = {
      address: this.Address,
      email: this.profile.email,
      firstName: this.profile.firstName,
      phoneNumber: this.profile.phoneNumber,
      profileImage :this.profile.profileImage
    };
    await this.profileService.updateProfile(data).subscribe((res) => {
        this.getProfileData();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'You successfully update your profile.',
        });
    });
  }
}
export type Address = {
  firstName: string;
  street: string | null;
  city: string | null;
  country: string | null;
};

export type User = {
  firstName: string;
  email: string;
  address: Address;
  profileImage: string;
  phoneNumber: string;
};
