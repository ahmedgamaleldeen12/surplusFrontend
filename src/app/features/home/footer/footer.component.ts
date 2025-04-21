import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FooterService } from './footer.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ToastModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  providers: [MessageService],
})
export class FooterComponent implements OnInit {
  newslettersForm!: FormGroup;
  private readonly fb = inject(FormBuilder);
  private readonly footerService = inject(FooterService);
  private readonly messageService = inject(MessageService);

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.newslettersForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      userName: [null, Validators.required],
    });
  }

  async send() {
    if (this.newslettersForm.invalid) return;

     await this.footerService.addProduct(this.newslettersForm.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'You successfully subscribed to our weekly newsletter.',
        });

        this.newslettersForm.reset();
        this.newslettersForm.markAsPristine();
        this.newslettersForm.markAsUntouched();
      },
      error: (err) => {
        console.error(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Failed',
          detail: 'Something went wrong. Please try again.',
        });
      },
    });
  }
}
