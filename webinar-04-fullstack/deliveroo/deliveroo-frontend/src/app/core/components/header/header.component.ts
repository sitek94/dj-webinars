import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header [class]="scrolled ? 'bg-white shadow-md' : 'bg-transparent'" class="fixed w-full z-10 transition-all duration-300">
      <div class="container mx-auto px-4 py-3 flex justify-between items-center">
        <!-- Logo -->
        <a routerLink="/" class="flex items-center space-x-2">
          <span class="text-primary-500 text-2xl font-bold">Deliveroo</span>
        </a>

        <!-- Navigation Options -->
        <nav class="hidden md:flex items-center space-x-6">
          @if (authService.isAuthenticated()) {
            <a 
              routerLink="/dashboard" 
              routerLinkActive="text-primary-500 font-medium" 
              class="text-neutral-600 hover:text-primary-500 transition-colors">
              Dashboard
            </a>
            <a 
              routerLink="/fleet" 
              routerLinkActive="text-primary-500 font-medium" 
              class="text-neutral-600 hover:text-primary-500 transition-colors">
              Fleet
            </a>
            <a 
              routerLink="/personnel" 
              routerLinkActive="text-primary-500 font-medium" 
              class="text-neutral-600 hover:text-primary-500 transition-colors">
              Personnel
            </a>
          }
        </nav>

        <!-- Login / User Controls -->
        <div class="flex items-center">
          @if (authService.isAuthenticated()) {
            <button (click)="logout()" class="btn btn-outline">
              Log Out
            </button>
          } @else {
            <a routerLink="/auth/login" class="btn btn-primary">
              Login
            </a>
          }
        </div>

        <!-- Mobile Menu Button -->
        <button 
          (click)="toggleMobileMenu()" 
          class="md:hidden text-neutral-800 focus:outline-none"
          aria-label="Toggle menu">
          <span class="material-icons">{{ isMobileMenuOpen ? 'close' : 'menu' }}</span>
        </button>
      </div>

      <!-- Mobile Menu -->
      @if (isMobileMenuOpen) {
        <div class="md:hidden bg-white shadow-lg animate-fade-in">
          <div class="container mx-auto px-4 py-3">
            <nav class="flex flex-col space-y-4">
              @if (authService.isAuthenticated()) {
                <a 
                  routerLink="/dashboard" 
                  routerLinkActive="text-primary-500 font-medium" 
                  class="text-neutral-600 hover:text-primary-500 transition-colors py-2"
                  (click)="toggleMobileMenu()">
                  Dashboard
                </a>
                <a 
                  routerLink="/fleet" 
                  routerLinkActive="text-primary-500 font-medium" 
                  class="text-neutral-600 hover:text-primary-500 transition-colors py-2"
                  (click)="toggleMobileMenu()">
                  Fleet
                </a>
                <a 
                  routerLink="/personnel" 
                  routerLinkActive="text-primary-500 font-medium" 
                  class="text-neutral-600 hover:text-primary-500 transition-colors py-2"
                  (click)="toggleMobileMenu()">
                  Personnel
                </a>
              }
            </nav>
          </div>
        </div>
      }
    </header>
    <!-- Spacer to prevent content from being hidden under the fixed header -->
    <div class="h-16"></div>
  `,
})
export class HeaderComponent {
  authService = inject(AuthService);
  scrolled = false;
  isMobileMenuOpen = false;

  @HostListener('window:scroll')
  onWindowScroll() {
    this.scrolled = window.scrollY > 20;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  logout() {
    this.authService.logout();
  }
}