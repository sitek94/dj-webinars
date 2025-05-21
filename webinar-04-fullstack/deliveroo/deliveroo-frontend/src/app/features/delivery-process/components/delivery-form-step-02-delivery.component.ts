import { Component, EventEmitter, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DeliveryHttpService } from '../delivery-http.service';

@Component({
  selector: 'app-delivery-form-step-02-delivery',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="animate-fade-in">
      <h2 class="text-xl font-semibold mb-6">Delivery Information</h2>
      
      <!-- Load Default Delivery Info Button -->
      <button 
        type="button" 
        class="btn btn-secondary mb-4"
        (click)="loadDefaultDeliveryInfo()">
        Load Default Delivery Info
      </button>
      
      <form [formGroup]="formGroup()">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Recipient Information -->
          <div class="md:col-span-2">
            <h3 class="text-lg font-medium mb-4">Recipient Information</h3>
          </div>
          
          <!-- Name -->
          <div class="form-group">
            <label for="recipientName" class="form-label">Recipient Name</label>
            <input 
              type="text" 
              id="recipientName" 
              formControlName="recipientName"
              class="form-control" 
              [class.border-error-500]="isFieldInvalid('recipientName')" />
            
            @if (isFieldInvalid('recipientName')) {
              <p class="mt-1 text-sm text-error-500">Recipient name is required</p>
            }
          </div>
          
          <!-- Email -->
          <div class="form-group">
            <label for="recipientEmail" class="form-label">Recipient Email</label>
            <input 
              type="email" 
              id="recipientEmail" 
              formControlName="recipientEmail"
              class="form-control" 
              [class.border-error-500]="isFieldInvalid('recipientEmail')" />
            
            @if (isFieldInvalid('recipientEmail')) {
              <p class="mt-1 text-sm text-error-500">Valid email is required</p>
            }
          </div>
          
          <!-- Phone -->
          <div class="form-group md:col-span-2">
            <label for="recipientPhone" class="form-label">Recipient Phone Number</label>
            <input 
              type="tel" 
              id="recipientPhone" 
              formControlName="recipientPhone"
              class="form-control" 
              [class.border-error-500]="isFieldInvalid('recipientPhone')" />
            
            @if (isFieldInvalid('recipientPhone')) {
              <p class="mt-1 text-sm text-error-500">Phone number is required</p>
            }
          </div>
          
          <!-- Address Section -->
          <div class="md:col-span-2 mt-4">
            <h3 class="text-lg font-medium mb-4">Delivery Address</h3>
          </div>
          
          <!-- Street Address -->
          <div class="form-group md:col-span-2">
            <label for="deliveryAddress" class="form-label">Street Address</label>
            <input 
              type="text" 
              id="deliveryAddress" 
              formControlName="deliveryAddress"
              class="form-control" 
              [class.border-error-500]="isFieldInvalid('deliveryAddress')" />
            
            @if (isFieldInvalid('deliveryAddress')) {
              <p class="mt-1 text-sm text-error-500">Address is required</p>
            }
          </div>
          
          <!-- City -->
          <div class="form-group">
            <label for="deliveryCity" class="form-label">City</label>
            <input 
              type="text" 
              id="deliveryCity" 
              formControlName="deliveryCity"
              class="form-control" 
              [class.border-error-500]="isFieldInvalid('deliveryCity')" />
            
            @if (isFieldInvalid('deliveryCity')) {
              <p class="mt-1 text-sm text-error-500">City is required</p>
            }
          </div>
          
          <!-- State -->
          <div class="form-group">
            <label for="deliveryState" class="form-label">State</label>
            <select 
              id="deliveryState" 
              formControlName="deliveryState"
              class="form-control" 
              [class.border-error-500]="isFieldInvalid('deliveryState')">
              <option value="">Select State</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="NY">New York</option>
              <option value="TX">Texas</option>
              <!-- Add more states as needed -->
            </select>
            
            @if (isFieldInvalid('deliveryState')) {
              <p class="mt-1 text-sm text-error-500">State is required</p>
            }
          </div>
          
          <!-- Zip Code -->
          <div class="form-group">
            <label for="deliveryZip" class="form-label">Zip Code</label>
            <input 
              type="text" 
              id="deliveryZip" 
              formControlName="deliveryZip"
              class="form-control" 
              [class.border-error-500]="isFieldInvalid('deliveryZip')" />
            
            @if (isFieldInvalid('deliveryZip')) {
              <p class="mt-1 text-sm text-error-500">Zip code is required</p>
            }
          </div>
          
          <!-- Delivery Instructions -->
          <div class="form-group md:col-span-2">
            <label for="deliveryInstructions" class="form-label">Delivery Instructions (Optional)</label>
            <textarea 
              id="deliveryInstructions" 
              formControlName="deliveryInstructions"
              class="form-control min-h-[100px]"
              placeholder="Special instructions for the delivery driver"></textarea>
          </div>
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
            [disabled]="isNextDisabled()"
            (click)="onNext()">
            Continue to Package Details
            <span class="material-icons ml-1">arrow_forward</span>
          </button>
        </div>
      </form>
    </div>
  `
})
export class DeliveryFormStep02DeliveryComponent {
  formGroup = input.required<FormGroup>();
  goToNext = output<void>();
  goBack = output<void>();
  constructor(private deliveryHttp: DeliveryHttpService) {}

  isFieldInvalid(field: string): boolean {
    const control = this.formGroup().get(field);
    return control !== null && control.invalid && (control.dirty || control.touched);
  }

  isNextDisabled(): boolean {
    const deliveryControls = [
      'recipientName', 
      'recipientEmail', 
      'recipientPhone', 
      'deliveryAddress',
      'deliveryCity',
      'deliveryState',
      'deliveryZip'
    ];
    
    return deliveryControls.some(control => {
      const formControl = this.formGroup().get(control);
      return formControl?.invalid;
    });
  }

  onNext(): void {
    if (!this.isNextDisabled()) {
      this.goToNext.emit();
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.formGroup().controls).forEach(key => {
        if (key.startsWith('recipient') || key.startsWith('delivery')) {
          const control = this.formGroup().get(key);
          if (control) {
            control.markAsTouched();
          }
        }
      });
    }
  }

  onBack(): void {
    this.goBack.emit();
  }

  loadDefaultDeliveryInfo(): void {
    this.formGroup().patchValue(this.deliveryHttp.getDeliveryMockData());
  }
}