import { Component, EventEmitter, input, output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DeliveryHttpService } from '../delivery-http.service';

interface DeliverySummary {
  priceEstimate: number;
  deliveryDate: Date;
  serviceLevel: {
    name: string;
    price: number;
    estimatedDays: number;
  };
}

@Component({
  selector: 'app-delivery-form-step-04-review',
  standalone: true,
  imports: [CommonModule],
  // imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="animate-fade-in">
      <h2 class="text-xl font-semibold mb-6">Review & Confirm</h2>
      
      <!-- Load Default Review Data Button -->
      <button 
        type="button" 
        class="btn btn-secondary mb-4"
        (click)="loadDefaultReviewData()">
        Load Default Review Data
      </button>
      
      <!-- Service Level Selection -->
      <div class="mb-6">
        <h3 class="text-lg font-medium mb-4">Service Level</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            class="border rounded-lg p-4 cursor-pointer transition-all"
            [class.border-primary-500]="formGroup().get('serviceLevel')?.value === 'standard'"
            [class.bg-primary-50]="formGroup().get('serviceLevel')?.value === 'standard'"
            [class.border-neutral-200]="formGroup().get('serviceLevel')?.value !== 'standard'"
            (click)="setServiceLevel('standard')">
            <div class="text-primary-500 flex justify-center mb-2">
              <span class="material-icons">local_shipping</span>
            </div>
            <h4 class="font-medium text-center">Standard</h4>
            <p class="text-xs text-neutral-500 text-center mt-1">3-5 business days</p>
            <p class="text-center font-medium mt-2">{{ basePrice.toFixed(2) }}</p>
          </div>
          <div 
            class="border rounded-lg p-4 cursor-pointer transition-all"
            [class.border-primary-500]="formGroup().get('serviceLevel')?.value === 'express'"
            [class.bg-primary-50]="formGroup().get('serviceLevel')?.value === 'express'"
            [class.border-neutral-200]="formGroup().get('serviceLevel')?.value !== 'express'"
            (click)="setServiceLevel('express')">
            <div class="text-primary-500 flex justify-center mb-2">
              <span class="material-icons">delivery_dining</span>
            </div>
            <h4 class="font-medium text-center">Express</h4>
            <p class="text-xs text-neutral-500 text-center mt-1">1-2 business days</p>
            <p class="text-center font-medium mt-2">{{ (basePrice * 1.5).toFixed(2) }}</p>
          </div>
          <div 
            class="border rounded-lg p-4 cursor-pointer transition-all"
            [class.border-primary-500]="formGroup().get('serviceLevel')?.value === 'same-day'"
            [class.bg-primary-50]="formGroup().get('serviceLevel')?.value === 'same-day'"
            [class.border-neutral-200]="formGroup().get('serviceLevel')?.value !== 'same-day'"
            (click)="setServiceLevel('same-day')">
            <div class="text-primary-500 flex justify-center mb-2">
              <span class="material-icons">rocket</span>
            </div>
            <h4 class="font-medium text-center">Same-Day</h4>
            <p class="text-xs text-neutral-500 text-center mt-1">Within 24 hours</p>
            <p class="text-center font-medium mt-2">{{ (basePrice * 2.5).toFixed(2) }}</p>
          </div>
        </div>
      </div>

      <!-- Delivery Summary -->
      <div class="bg-neutral-50 border border-neutral-200 rounded-lg p-6 mb-6">
        <h3 class="text-lg font-medium mb-4">Delivery Summary</h3>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Left Column -->
          <div>
            <div class="mb-4">
              <h4 class="text-sm font-medium text-neutral-500 mb-1">Pickup From</h4>
              <p class="font-medium">{{ formGroup().get('pickupName')?.value }}</p>
              <p>{{ formatAddress('pickup') }}</p>
              <p>{{ formGroup().get('pickupEmail')?.value }}</p>
              <p>{{ formGroup().get('pickupPhone')?.value }}</p>
            </div>
            
            <div>
              <h4 class="text-sm font-medium text-neutral-500 mb-1">Package Details</h4>
              <p><span class="font-medium">Type:</span> {{ formatPackageType() }}</p>
              <p><span class="font-medium">Weight:</span> {{ formGroup().get('packageWeight')?.value }} lbs</p>
              <p><span class="font-medium">Dimensions:</span> {{ formatDimensions() }}</p>
              <p><span class="font-medium">Contents:</span> {{ formGroup().get('packageContents')?.value }}</p>
              
              @if (formGroup().get('isFragile')?.value) {
                <p class="text-warning-500 flex items-center mt-1">
                  <span class="material-icons text-sm mr-1">warning</span>
                  Fragile
                </p>
              }
              
              @if (formGroup().get('requiresRefrigeration')?.value) {
                <p class="text-primary-500 flex items-center mt-1">
                  <span class="material-icons text-sm mr-1">ac_unit</span>
                  Requires Refrigeration
                </p>
              }
            </div>
          </div>
          
          <!-- Right Column -->
          <div>
            <div class="mb-4">
              <h4 class="text-sm font-medium text-neutral-500 mb-1">Deliver To</h4>
              <p class="font-medium">{{ formGroup().get('recipientName')?.value }}</p>
              <p>{{ formatAddress('delivery') }}</p>
              <p>{{ formGroup().get('recipientEmail')?.value }}</p>
              <p>{{ formGroup().get('recipientPhone')?.value }}</p>
              
              @if (formGroup().get('deliveryInstructions')?.value) {
                <p class="mt-2">
                  <span class="font-medium">Instructions:</span> 
                  {{ formGroup().get('deliveryInstructions')?.value }}
                </p>
              }
            </div>
            
            <div>
              <h4 class="text-sm font-medium text-neutral-500 mb-1">Delivery Information</h4>
              <p>
                <span class="font-medium">Pickup Date:</span> 
                {{ formatDate(formGroup().get('pickupDate')?.value) }}
              </p>
              <p>
                <span class="font-medium">Pickup Time:</span> 
                {{ formatTimeWindow(formGroup().get('pickupTimeWindow')?.value) }}
              </p>
              <p>
                <span class="font-medium">Estimated Delivery:</span>
                {{ formatEstimatedDelivery() }}
              </p>
              <p class="font-medium text-lg text-primary-700 mt-3">
                Total: {{ calculateTotal().toFixed(2) }}
              </p>
              @if (formGroup().get('insurance')?.value) {
                <p class="text-sm text-primary-600">Includes $5.00 insurance</p>
              }
            </div>
          </div>
        </div>
      </div>

      <!-- Additional Options -->
      <div class="mb-6">
        <div class="flex items-center">
          <input 
            type="checkbox" 
            id="insurance" 
            formControlName="insurance"
            class="h-4 w-4 text-primary-500 border-neutral-300 rounded focus:ring-primary-500" />
          <label for="insurance" class="ml-2 block text-neutral-700">
            <span class="font-medium">Add Insurance</span> - $5.00
            <span class="block text-xs text-neutral-500">Coverage up to $1,000 for loss or damage</span>
          </label>
        </div>
      </div>

      <!-- Terms and Conditions -->
      <div class="mb-6">
        <div class="flex items-start">
          <div class="flex items-center h-5">
            <input 
              type="checkbox" 
              id="agreeToTerms" 
              formControlName="agreeToTerms"
              class="h-4 w-4 text-primary-500 border-neutral-300 rounded focus:ring-primary-500" 
              [class.border-error-500]="isFieldInvalid('agreeToTerms')" />
          </div>
          <label for="agreeToTerms" class="ml-2 block text-sm text-neutral-700">
            I agree to the <a href="#" class="text-primary-500 hover:text-primary-700">Terms and Conditions</a> and 
            <a href="#" class="text-primary-500 hover:text-primary-700">Privacy Policy</a>
          </label>
        </div>
        @if (isFieldInvalid('agreeToTerms')) {
          <p class="mt-1 text-sm text-error-500">You must agree to the terms to continue</p>
        }
      </div>
        
      <!-- Navigation Buttons -->
      <div class="flex justify-between mt-8">
        <button 
          type="button" 
          class="btn btn-secondary"
          (click)="onBack()">
          <span class="material-icons mr-1">arrow_back</span>
          Back
        </button>
        
        <button 
          type="button" 
          class="btn btn-primary"
          [disabled]="isSubmitDisabled() || isSubmitting"
          (click)="onSubmit()">
          @if (isSubmitting) {
            <span class="mr-2">
              <span class="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
            </span>
            Processing...
          } @else {
            Schedule Delivery
            <span class="material-icons ml-1">check_circle</span>
          }
        </button>
      </div>
    </div>
  `
})
export class DeliveryFormStep04ReviewComponent implements OnInit {
  formGroup = input.required<FormGroup>();
  submitForm = output<void>();
  goBack = output<void>();
  constructor(private deliveryHttp: DeliveryHttpService) {}

  isSubmitting = false;
  basePrice = 24.99;
  
  deliverySummary: DeliverySummary = {
    priceEstimate: 0,
    deliveryDate: new Date(),
    serviceLevel: {
      name: 'Standard',
      price: 24.99,
      estimatedDays: 3
    }
  };

  ngOnInit() {
    this.updateDeliverySummary();
  }

  setServiceLevel(level: string): void {
    this.formGroup().get('serviceLevel')?.setValue(level);
    this.updateDeliverySummary();
  }

  updateDeliverySummary(): void {
    const serviceLevel = this.formGroup().get('serviceLevel')?.value;
    
    switch(serviceLevel) {
      case 'express':
        this.deliverySummary.serviceLevel = {
          name: 'Express',
          price: this.basePrice * 1.5,
          estimatedDays: 2
        };
        break;
      case 'same-day':
        this.deliverySummary.serviceLevel = {
          name: 'Same-Day',
          price: this.basePrice * 2.5,
          estimatedDays: 1
        };
        break;
      default: // standard
        this.deliverySummary.serviceLevel = {
          name: 'Standard',
          price: this.basePrice,
          estimatedDays: 3
        };
    }
    
    // Calculate delivery date based on pickup date
    const pickupDate = new Date(this.formGroup().get('pickupDate')?.value);
    if (pickupDate) {
      const deliveryDate = new Date(pickupDate);
      deliveryDate.setDate(deliveryDate.getDate() + this.deliverySummary.serviceLevel.estimatedDays);
      this.deliverySummary.deliveryDate = deliveryDate;
    }
    
    // Calculate price estimate
    this.deliverySummary.priceEstimate = this.calculateTotal();
  }

  calculateTotal(): number {
    let total = this.deliverySummary.serviceLevel.price;
    
    // Add insurance if selected
    if (this.formGroup().get('insurance')?.value) {
      total += 5.00;
    }
    
    // Add additional costs for special handling
    if (this.formGroup().get('isFragile')?.value) {
      total += 3.50;
    }
    
    if (this.formGroup().get('requiresRefrigeration')?.value) {
      total += 8.00;
    }
    
    return total;
  }

  formatAddress(type: 'pickup' | 'delivery'): string {
    const address = this.formGroup().get(`${type}Address`)?.value;
    const city = this.formGroup().get(`${type}City`)?.value;
    const state = this.formGroup().get(`${type}State`)?.value;
    const zip = this.formGroup().get(`${type}Zip`)?.value;
    
    return `${address}, ${city}, ${state} ${zip}`;
  }

  formatPackageType(): string {
    const packageType = this.formGroup().get('packageType')?.value;
    
    switch(packageType) {
      case 'standard':
        return 'Standard Box';
      case 'large':
        return 'Large Box';
      case 'envelope':
        return 'Envelope';
      default:
        return packageType;
    }
  }

  formatDimensions(): string {
    const dimensionsGroup = this.formGroup().get('packageDimensions');
    if (dimensionsGroup) {
      const length = dimensionsGroup.get('length')?.value;
      const width = dimensionsGroup.get('width')?.value;
      const height = dimensionsGroup.get('height')?.value;
      
      return `${length}" × ${width}" × ${height}"`;
    }
    return '';
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }

  formatTimeWindow(timeWindow: string): string {
    switch(timeWindow) {
      case '9-12':
        return '9:00 AM - 12:00 PM';
      case '12-15':
        return '12:00 PM - 3:00 PM';
      case '15-18':
        return '3:00 PM - 6:00 PM';
      case '18-21':
        return '6:00 PM - 9:00 PM';
      default:
        return timeWindow;
    }
  }

  formatEstimatedDelivery(): string {
    return this.formatDate(this.deliverySummary.deliveryDate.toISOString());
  }

  isFieldInvalid(field: string): boolean {
    const control = this.formGroup().get(field);
    return control !== null && control.invalid && (control.dirty || control.touched);
  }

  isSubmitDisabled(): boolean {
    return this.formGroup().get('agreeToTerms')?.invalid || false;
  }

  onSubmit(): void {
    if (this.formGroup().valid) {
      this.isSubmitting = true;
      
      // Simulate API call with a timeout
      setTimeout(() => {
        this.isSubmitting = false;
        this.submitForm.emit();
      }, 1500);
    } else {
      this.formGroup().get('agreeToTerms')?.markAsTouched();
    }
  }

  onBack(): void {
    this.goBack.emit();
  }

  loadDefaultReviewData(): void {
    this.formGroup().patchValue(this.deliveryHttp.getReviewMockData());
    this.updateDeliverySummary();
  }
}