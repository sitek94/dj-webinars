import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-neutral-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8 animate-fade-in">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-neutral-800">Forgot Password</h2>
          <p class="mt-2 text-neutral-600">Enter your email and we'll send you a reset link</p>
        </div>

        @if (submitted) {
          <div class="bg-success-50 text-success-500 p-4 rounded-md mb-6 animate-fade-in">
            <p class="text-center font-medium">Reset link sent!</p>
            <p class="text-center text-sm mt-2">If an account exists with this email, you will receive password reset instructions.</p>
          </div>

          <div class="text-center mt-6">
            <a routerLink="/auth/login" class="btn btn-primary w-full">
              Return to Login
            </a>
          </div>
        } @else {
          <form [formGroup]="forgotPasswordForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <!-- Email Field -->
            <div>
              <label for="email" class="form-label">Email</label>
              <input 
                type="email" 
                id="email" 
                formControlName="email"
                class="form-control" 
                autocomplete="email" 
                [class.border-error-500]="isFieldInvalid('email')" />
              
              @if (isFieldInvalid('email')) {
                <p class="mt-1 text-sm text-error-500">Please enter a valid email address</p>
              }
            </div>

            <!-- Submit Button -->
            <div>
              <button 
                type="submit" 
                [disabled]="isLoading || !forgotPasswordForm.valid"
                class="w-full btn btn-primary py-3 flex justify-center items-center">
                @if (isLoading) {
                  <span class="mr-2">
                    <span class="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                  </span>
                }
                Send Reset Link
              </button>
            </div>

            <div class="text-center mt-4">
              <a routerLink="/auth/login" class="text-primary-500 hover:text-primary-600 transition-colors">
                Back to Login
              </a>
            </div>
          </form>
        }
      </div>
    </div>
  `
})
export class ForgotPasswordComponent {
  private fb = inject(FormBuilder);

  forgotPasswordForm: FormGroup;
  isLoading = false;
  submitted = false;

  constructor() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  isFieldInvalid(field: string): boolean {
    const formControl = this.forgotPasswordForm.get(field);
    return formControl !== null && formControl.invalid && (formControl.dirty || formControl.touched);
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      this.isLoading = true;

      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        this.submitted = true;
      }, 1500);
    } else {
      this.forgotPasswordForm.markAllAsTouched();
    }
  }
}