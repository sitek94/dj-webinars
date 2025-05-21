import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="animate-fade-in">
      <!-- Hero Section -->
      <section class="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20 md:py-32">
        <div class="container mx-auto px-4">
          <div class="max-w-3xl">
            <h1 class="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Reliable Logistics Solutions for Your Business
            </h1>
            <p class="text-xl md:text-2xl mb-8 text-primary-50">
              Streamline your deliveries with our state-of-the-art fleet management system.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <a 
                routerLink="/delivery-process" 
                class="btn bg-white text-primary-700 hover:bg-primary-50 hover:text-primary-800 font-semibold text-base px-6 py-3 rounded-lg shadow-lg transition-all">
                Ship Now
              </a>
              <a 
                href="#features" 
                class="btn bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold text-base px-6 py-3 rounded-lg transition-all">
                Learn More
              </a>
            </div>
          </div>
        </div>
        <!-- Decorative element -->
        <div class="absolute right-0 bottom-0 w-1/3 h-1/2 bg-primary-400 opacity-10 rounded-tl-full"></div>
      </section>

      <!-- Features Section -->
      <section id="features" class="py-20 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-bold mb-4">Why Choose Deliveroo?</h2>
            <p class="text-neutral-600 max-w-2xl mx-auto">Our comprehensive logistics solution helps you manage your fleet efficiently, saving time and money.</p>
          </div>

          <div class="grid md:grid-cols-3 gap-8">
            <!-- Feature 1 -->
            <div class="card p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div class="bg-primary-100 text-primary-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="material-icons text-3xl">speed</span>
              </div>
              <h3 class="text-xl font-semibold mb-3">Real-Time Tracking</h3>
              <p class="text-neutral-600">Monitor your fleet in real-time with accurate GPS tracking and instant notifications.</p>
            </div>

            <!-- Feature 2 -->
            <div class="card p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div class="bg-primary-100 text-primary-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="material-icons text-3xl">assignment_turned_in</span>
              </div>
              <h3 class="text-xl font-semibold mb-3">Efficient Route Planning</h3>
              <p class="text-neutral-600">Optimize delivery routes to save fuel and time with our advanced algorithm.</p>
            </div>

            <!-- Feature 3 -->
            <div class="card p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div class="bg-primary-100 text-primary-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="material-icons text-3xl">insights</span>
              </div>
              <h3 class="text-xl font-semibold mb-3">Comprehensive Analytics</h3>
              <p class="text-neutral-600">Make data-driven decisions with detailed reports and performance insights.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- How It Works Section -->
      <section class="py-20 bg-neutral-50">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold mb-16 text-center">How It Works</h2>

          <div class="grid md:grid-cols-4 gap-8">
            <!-- Step 1 -->
            <div class="flex flex-col items-center">
              <div class="bg-primary-500 text-white w-12 h-12 rounded-full flex items-center justify-center mb-6 relative">
                <span class="font-semibold">1</span>
                <div class="hidden md:block absolute h-0.5 bg-primary-300 w-full right-0 top-1/2 -z-10 translate-x-1/2"></div>
              </div>
              <h3 class="text-lg font-semibold mb-2 text-center">Sign Up</h3>
              <p class="text-neutral-600 text-center">Create your account and register your business.</p>
            </div>

            <!-- Step 2 -->
            <div class="flex flex-col items-center">
              <div class="bg-primary-500 text-white w-12 h-12 rounded-full flex items-center justify-center mb-6 relative">
                <span class="font-semibold">2</span>
                <div class="hidden md:block absolute h-0.5 bg-primary-300 w-full right-0 top-1/2 -z-10 translate-x-1/2"></div>
              </div>
              <h3 class="text-lg font-semibold mb-2 text-center">Add Your Fleet</h3>
              <p class="text-neutral-600 text-center">Register your vehicles and drivers to the system.</p>
            </div>

            <!-- Step 3 -->
            <div class="flex flex-col items-center">
              <div class="bg-primary-500 text-white w-12 h-12 rounded-full flex items-center justify-center mb-6 relative">
                <span class="font-semibold">3</span>
                <div class="hidden md:block absolute h-0.5 bg-primary-300 w-full right-0 top-1/2 -z-10 translate-x-1/2"></div>
              </div>
              <h3 class="text-lg font-semibold mb-2 text-center">Manage Deliveries</h3>
              <p class="text-neutral-600 text-center">Schedule and track deliveries in real-time.</p>
            </div>

            <!-- Step 4 -->
            <div class="flex flex-col items-center">
              <div class="bg-primary-500 text-white w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <span class="font-semibold">4</span>
              </div>
              <h3 class="text-lg font-semibold mb-2 text-center">Analyze Performance</h3>
              <p class="text-neutral-600 text-center">Review detailed reports and optimize operations.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-20 bg-primary-700 text-white">
        <div class="container mx-auto px-4 text-center">
          <h2 class="text-3xl font-bold mb-6">Ready to Transform Your Logistics?</h2>
          <p class="text-xl mb-8 max-w-2xl mx-auto">Join thousands of businesses that have improved their delivery operations with Deliveroo.</p>
          <a 
            routerLink="/delivery-process" 
            class="btn bg-white text-primary-700 hover:bg-primary-50 font-semibold text-lg px-8 py-3 rounded-lg shadow-lg inline-block transition-all">
            Deliver Your Stuff Now
          </a>
        </div>
      </section>

      <!-- Testimonials Section -->
      <section class="py-20 bg-white">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold mb-16 text-center">What Our Customers Say</h2>

          <div class="grid md:grid-cols-3 gap-8">
            <!-- Testimonial 1 -->
            <div class="card p-6 hover:shadow-lg transition-shadow">
              <div class="flex items-center mb-4">
                <div class="text-primary-500">
                  <span class="material-icons">star</span>
                  <span class="material-icons">star</span>
                  <span class="material-icons">star</span>
                  <span class="material-icons">star</span>
                  <span class="material-icons">star</span>
                </div>
              </div>
              <p class="text-neutral-700 mb-4">"Deliveroo has completely transformed our logistics operations. We've reduced delivery times by 35% and improved customer satisfaction."</p>
              <div class="flex items-center">
                <div class="bg-neutral-200 w-10 h-10 rounded-full mr-3"></div>
                <div>
                  <p class="font-semibold">Sarah Johnson</p>
                  <p class="text-sm text-neutral-500">Logistics Manager, TechCorp</p>
                </div>
              </div>
            </div>

            <!-- Testimonial 2 -->
            <div class="card p-6 hover:shadow-lg transition-shadow">
              <div class="flex items-center mb-4">
                <div class="text-primary-500">
                  <span class="material-icons">star</span>
                  <span class="material-icons">star</span>
                  <span class="material-icons">star</span>
                  <span class="material-icons">star</span>
                  <span class="material-icons">star</span>
                </div>
              </div>
              <p class="text-neutral-700 mb-4">"The real-time tracking and analytics have been game-changers for our business. We can now make data-driven decisions that save us money."</p>
              <div class="flex items-center">
                <div class="bg-neutral-200 w-10 h-10 rounded-full mr-3"></div>
                <div>
                  <p class="font-semibold">Michael Rodriguez</p>
                  <p class="text-sm text-neutral-500">CEO, QuickShip Logistics</p>
                </div>
              </div>
            </div>

            <!-- Testimonial 3 -->
            <div class="card p-6 hover:shadow-lg transition-shadow">
              <div class="flex items-center mb-4">
                <div class="text-primary-500">
                  <span class="material-icons">star</span>
                  <span class="material-icons">star</span>
                  <span class="material-icons">star</span>
                  <span class="material-icons">star</span>
                  <span class="material-icons">star_half</span>
                </div>
              </div>
              <p class="text-neutral-700 mb-4">"The route optimization feature alone has saved us thousands in fuel costs. The platform is intuitive and our drivers love using it."</p>
              <div class="flex items-center">
                <div class="bg-neutral-200 w-10 h-10 rounded-full mr-3"></div>
                <div>
                  <p class="font-semibold">Jennifer Lee</p>
                  <p class="text-sm text-neutral-500">Operations Director, Global Freight</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class HomeComponent {}