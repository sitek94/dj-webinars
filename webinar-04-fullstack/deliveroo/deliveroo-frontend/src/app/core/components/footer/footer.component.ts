import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="bg-neutral-800 text-white">
      <div class="container mx-auto py-12 px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Company Info -->
          <div>
            <h3 class="text-lg font-bold mb-4">Deliveroo</h3>
            <p class="text-neutral-300 mb-4">Professional logistics fleet management solutions for businesses of all sizes.</p>
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="text-lg font-bold mb-4">Quick Links</h3>
            <ul class="space-y-2">
              <li><a routerLink="/" class="text-neutral-300 hover:text-white transition-colors">Home</a></li>
              <li><a routerLink="/delivery-process" class="text-neutral-300 hover:text-white transition-colors">Ship Now</a></li>
              <li><a routerLink="/dashboard" class="text-neutral-300 hover:text-white transition-colors">Dashboard</a></li>
              <li><a routerLink="/auth/login" class="text-neutral-300 hover:text-white transition-colors">Login</a></li>
            </ul>
          </div>

          <!-- Legal -->
          <div>
            <h3 class="text-lg font-bold mb-4">Legal</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-neutral-300 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" class="text-neutral-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" class="text-neutral-300 hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" class="text-neutral-300 hover:text-white transition-colors">GDPR</a></li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h3 class="text-lg font-bold mb-4">Contact Us</h3>
            <ul class="space-y-2">
              <li class="flex items-center space-x-2">
                <span class="material-icons text-sm">email</span>
                <span class="text-neutral-300">contact&#64;deliveroo.example</span>
              </li>
              <li class="flex items-center space-x-2">
                <span class="material-icons text-sm">phone</span>
                <span class="text-neutral-300">+1 (555) 123-4567</span>
              </li>
              <li class="flex items-center space-x-2">
                <span class="material-icons text-sm">location_on</span>
                <span class="text-neutral-300">123 Logistics Way, Shipping City, SC 12345</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Bottom Copyright -->
        <div class="border-t border-neutral-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p class="text-neutral-400 text-sm">© 2025 Deliveroo Logistics. All rights reserved.</p>
          <div class="flex space-x-4 mt-4 md:mt-0">
            <a href="#" class="text-neutral-400 hover:text-white transition-colors">
              <span class="sr-only">Twitter</span>
              <span class="material-icons">twitter</span>
            </a>
            <a href="#" class="text-neutral-400 hover:text-white transition-colors">
              <span class="sr-only">Facebook</span>
              <span class="material-icons">facebook</span>
            </a>
            <a href="#" class="text-neutral-400 hover:text-white transition-colors">
              <span class="sr-only">LinkedIn</span>
              <span class="material-icons">linkedin</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}