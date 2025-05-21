import { Component, EventEmitter, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DeliveryHttpService } from '../delivery-http.service';

@Component({
  selector: 'app-delivery-form-step-01-pickup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="animate-fade-in">
      <h2 class="text-xl font-semibold mb-6">Pickup Information</h2>
      
      <!-- Load Default Contact Info Button -->
      <button 
        type="button" 
        class="btn btn-secondary mb-4"
        (click)="loadDefaultContactInfo()">
        Load Default Contact Info
      </button>
      
      <form [formGroup]="formGroup()">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Contact Information -->
          <div class="md:col-span-2">
            <h3 class="text-lg font-medium mb-4">Contact Information</h3>
          </div>
          
          <!-- Name -->
          <div class="form-group">
            <label for="pickupName" class="form-label">Name</label>
            <input 
              type="text" 
              id="pickupName" 
              formControlName="pickupName"
              class="form-control" 
              [class.border-error-500]="isFieldInvalid('pickupName')" />
            
            @if (isFieldInvalid('pickupName')) {
              <p class="mt-1 text-sm text-error-500">Name is required</p>
            }
          </div>
          
          <!-- Email -->
          <div class="form-group">
            <label for="pickupEmail" class="form-label">Email</label>
            <input 
              type="email" 
              id="pickupEmail" 
              formControlName="pickupEmail"
              class="form-control" 
              [class.border-error-500]="isFieldInvalid('pickupEmail')" />
            
            @if (isFieldInvalid('pickupEmail')) {
              <p class="mt-1 text-sm text-error-500">Valid email is required</p>
            }
          </div>
          
          <!-- Phone -->
          <div class="form-group md:col-span-2">
            <label for="pickupPhone" class="form-label">Phone Number</label>
            <input 
              type="tel" 
              id="pickupPhone" 
              formControlName="pickupPhone"
              class="form-control" 
              [class.border-error-500]="isFieldInvalid('pickupPhone')" />
            
            @if (isFieldInvalid('pickupPhone')) {
              <p class="mt-1 text-sm text-error-500">Phone number is required</p>
            }
          </div>
          
          <!-- Address Section -->
          <div class="md:col-span-2 mt-4">
            <h3 class="text-lg font-medium mb-4">Pickup Address</h3>
          </div>
          
          <!-- Street Address -->
          <div class="form-group md:col-span-2">
            <label for="pickupAddress" class="form-label">Street Address</label>
            <input 
              type="text" 
              id="pickupAddress" 
              formControlName="pickupAddress"
              class="form-control" 
              [class.border-error-500]="isFieldInvalid('pickupAddress')" />
            
            @if (isFieldInvalid('pickupAddress')) {
              <p class="mt-1 text-sm text-error-500">Address is required</p>
            }
          </div>
          
          <!-- City -->
          <div class="form-group">
            <label for="pickupCity" class="form-label">City</label>
            <input 
              type="text" 
              id="pickupCity" 
              formControlName="pickupCity"
              class="form-control" 
              [class.border-error-500]="isFieldInvalid('pickupCity')" />
            
            @if (isFieldInvalid('pickupCity')) {
              <p class="mt-1 text-sm text-error-500">City is required</p>
            }
          </div>
          
          <!-- State -->
          <div class="form-group">
            <label for="pickupState" class="form-label">State</label>
            <select 
              id="pickupState" 
              formControlName="pickupState"
              class="form-control" 
              [class.border-error-500]="isFieldInvalid('pickupState')">
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
            
            @if (isFieldInvalid('pickupState')) {
              <p class="mt-1 text-sm text-error-500">State is required</p>
            }
          </div>
          
          <!-- Zip Code -->
          <div class="form-group">
            <label for="pickupZip" class="form-label">Zip Code</label>
            <input 
              type="text" 
              id="pickupZip" 
              formControlName="pickupZip"
              class="form-control" 
              [class.border-error-500]="isFieldInvalid('pickupZip')" />
            
            @if (isFieldInvalid('pickupZip')) {
              <p class="mt-1 text-sm text-error-500">Zip code is required</p>
            }
          </div>
          
          <!-- Pickup Date & Time Section -->
          <div class="md:col-span-2 mt-4">
            <h3 class="text-lg font-medium mb-4">Pickup Date & Time</h3>
          </div>
          
          <!-- Pickup Date -->
          <div class="form-group">
            <label for="pickupDate" class="form-label">Pickup Date</label>
            <input 
              type="date" 
              id="pickupDate" 
              formControlName="pickupDate"
              class="form-control" 
              [class.border-error-500]="isFieldInvalid('pickupDate')" />
            
            @if (isFieldInvalid('pickupDate')) {
              <p class="mt-1 text-sm text-error-500">Date is required</p>
            }
          </div>
          
          <!-- Pickup Time Window -->
          <div class="form-group">
            <label for="pickupTimeWindow" class="form-label">Preferred Time Window</label>
            <select 
              id="pickupTimeWindow" 
              formControlName="pickupTimeWindow"
              class="form-control" 
              [class.border-error-500]="isFieldInvalid('pickupTimeWindow')">
              <option value="9-12">9:00 AM - 12:00 PM</option>
              <option value="12-15">12:00 PM - 3:00 PM</option>
              <option value="15-18">3:00 PM - 6:00 PM</option>
              <option value="18-21">6:00 PM - 9:00 PM</option>
            </select>
            
            @if (isFieldInvalid('pickupTimeWindow')) {
              <p class="mt-1 text-sm text-error-500">Time window is required</p>
            }
          </div>
        </div>
        
        <!-- Navigation Buttons -->
        <div class="flex justify-end mt-8">
          <button 
            type="button" 
            class="btn btn-primary"
            [disabled]="isNextDisabled()"
            (click)="onNext()">
            Continue to Delivery Details
            <span class="material-icons ml-1">arrow_forward</span>
          </button>
        </div>
      </form>
    </div>
  `
})
export class DeliveryFormStep01PickupComponent {
  formGroup = input.required<FormGroup>();
  goToNext = output<void>();
  constructor(private deliveryHttp: DeliveryHttpService) {}

  isFieldInvalid(field: string): boolean {
    const control = this.formGroup().get(field);
    return control !== null && control.invalid && (control.dirty || control.touched);
  }

  isNextDisabled(): boolean {
    const pickupControls = [
      'pickupName', 
      'pickupEmail', 
      'pickupPhone', 
      'pickupAddress',
      'pickupCity',
      'pickupState',
      'pickupZip',
      'pickupDate',
      'pickupTimeWindow'
    ];
    
    return pickupControls.some(control => {
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
        const control = this.formGroup().get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }

  loadDefaultContactInfo(): void {
    this.formGroup().patchValue(this.deliveryHttp.getPickupMockData());
  }
}