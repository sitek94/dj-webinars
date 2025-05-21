import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-neutral-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8 animate-fade-in">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-neutral-800">Welcome back</h2>
          <p class="mt-2 text-neutral-600">Sign in to your account</p>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <!-- Error message -->
          @if (error) {
            <div class="bg-error-50 text-error-500 p-3 rounded-md mb-4 animate-fade-in">
              {{ error }}
            </div>
          }

          <!-- Email/Username Field -->
          <div>
            <label for="email" class="form-label">Email or Username</label>
            <input 
              type="text" 
              id="email" 
              formControlName="email"
              class="form-control" 
              autocomplete="email" 
              [class.border-error-500]="isFieldInvalid('email')" />
            
            @if (isFieldInvalid('email')) {
              <p class="mt-1 text-sm text-error-500">Please enter a valid email or username</p>
            }
          </div>

          <!-- Password Field -->
          <div>
            <div class="flex justify-between items-center">
              <label for="password" class="form-label">Password</label>
              <a routerLink="/auth/forgot-password" class="text-sm text-primary-500 hover:text-primary-600 transition-colors">
                Forgot your password?
              </a>
            </div>
            <input 
              [type]="showPassword ? 'text' : 'password'" 
              id="password" 
              formControlName="password"
              class="form-control pr-10" 
              autocomplete="current-password"
              [class.border-error-500]="isFieldInvalid('password')" />
            
            @if (isFieldInvalid('password')) {
              <p class="mt-1 text-sm text-error-500">Password is required</p>
            }
          </div>

          <!-- Remember Me Checkbox -->
          <div class="flex items-center">
            <input 
              id="remember-me" 
              name="remember-me" 
              type="checkbox"
              formControlName="rememberMe"
              class="h-4 w-4 text-primary-500 border-neutral-300 rounded focus:ring-primary-500" />
            <label for="remember-me" class="ml-2 block text-sm text-neutral-700">
              Remember me
            </label>
          </div>

          <!-- Submit Button -->
          <div>
            <button 
              type="submit" 
              [disabled]="isLoading || !loginForm.valid"
              class="w-full btn btn-primary py-3 flex justify-center items-center">
              @if (isLoading) {
                <span class="mr-2">
                  <span class="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                </span>
              }
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup;
  isLoading = false;
  showPassword = false;
  error: string | null = null;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  isFieldInvalid(field: string): boolean {
    const formControl = this.loginForm.get(field);
    return formControl !== null && formControl.invalid && (formControl.dirty || formControl.touched);
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.error = null;

      // Simulate API call
      setTimeout(() => {
        const { email, password } = this.loginForm.value;
        const success = this.authService.login(email, password);

        if (success) {
          this.router.navigate(['/dashboard']);
        } else {
          this.error = 'Invalid email or password. Please try again.';
        }
        this.isLoading = false;
      }, 1000);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}