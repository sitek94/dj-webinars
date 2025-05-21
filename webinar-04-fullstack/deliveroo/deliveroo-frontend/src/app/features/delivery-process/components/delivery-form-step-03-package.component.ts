import { Component, EventEmitter, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DeliveryHttpService } from '../delivery-http.service';

@Component({
  selector: 'app-delivery-form-step-03-package',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="animate-fade-in">
      <h2 class="text-xl font-semibold mb-6">Package Information</h2>
      
      <!-- Load Default Package Info Button -->
      <button 
        type="button" 
        class="btn btn-secondary mb-4"
        (click)="loadDefaultPackageInfo()">
        Load Default Package Info
      </button>
      
      <form [formGroup]="formGroup()">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Package Type -->
          <div class="form-group md:col-span-2">
            <label class="form-label">Package Type</label>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
              <div 
                class="border rounded-lg p-4 text-center cursor-pointer transition-all"
                [class.border-primary-500]="formGroup().get('packageType')?.value === 'standard'"
                [class.bg-primary-50]="formGroup().get('packageType')?.value === 'standard'"
                [class.border-neutral-200]="formGroup().get('packageType')?.value !== 'standard'"
                (click)="setPackageType('standard')">
                <div class="text-primary-500 flex justify-center mb-2">
                  <span class="material-icons">inventory_2</span>
                </div>
                <h4 class="font-medium">Standard Box</h4>
                <p class="text-xs text-neutral-500 mt-1">Regular packages under 50 lbs</p>
              </div>
              <div 
                class="border rounded-lg p-4 text-center cursor-pointer transition-all"
                [class.border-primary-500]="formGroup().get('packageType')?.value === 'large'"
                [class.bg-primary-50]="formGroup().get('packageType')?.value === 'large'"
                [class.border-neutral-200]="formGroup().get('packageType')?.value !== 'large'"
                (click)="setPackageType('large')">
                <div class="text-primary-500 flex justify-center mb-2">
                  <span class="material-icons">inventory</span>
                </div>
                <h4 class="font-medium">Large Box</h4>
                <p class="text-xs text-neutral-500 mt-1">Oversized or heavy items</p>
              </div>
              <div 
                class="border rounded-lg p-4 text-center cursor-pointer transition-all"
                [class.border-primary-500]="formGroup().get('packageType')?.value === 'envelope'"
                [class.bg-primary-50]="formGroup().get('packageType')?.value === 'envelope'"
                [class.border-neutral-200]="formGroup().get('packageType')?.value !== 'envelope'"
                (click)="setPackageType('envelope')">
                <div class="text-primary-500 flex justify-center mb-2">
                  <span class="material-icons">mail</span>
                </div>
                <h4 class="font-medium">Envelope</h4>
                <p class="text-xs text-neutral-500 mt-1">Documents and flat items</p>
              </div>
            </div>
          </div>
          
          <!-- Weight -->
          <div class="form-group">
            <label for="packageWeight" class="form-label">Weight (lbs)</label>
            <input 
              type="number" 
              id="packageWeight" 
              formControlName="packageWeight"
              min="0.1"
              step="0.1"
              class="form-control" 
              [class.border-error-500]="isFieldInvalid('packageWeight')" />
            
            @if (isFieldInvalid('packageWeight')) {
              <p class="mt-1 text-sm text-error-500">Please enter a valid weight</p>
            }
          </div>

          <!-- Dimensions Form Group -->
          <div class="form-group" formGroupName="packageDimensions">
            <label class="form-label">Dimensions (inches)</label>
            <div class="grid grid-cols-3 gap-2">
              <div>
                <input 
                  type="number" 
                  formControlName="length"
                  placeholder="Length"
                  min="1"
                  class="form-control" 
                  [class.border-error-500]="isDimensionInvalid('length')" />
              </div>
              <div>
                <input 
                  type="number" 
                  formControlName="width"
                  placeholder="Width"
                  min="1"
                  class="form-control" 
                  [class.border-error-500]="isDimensionInvalid('width')" />
              </div>
              <div>
                <input 
                  type="number" 
                  formControlName="height"
                  placeholder="Height"
                  min="1"
                  class="form-control" 
                  [class.border-error-500]="isDimensionInvalid('height')" />
              </div>
            </div>
            
            @if (isDimensionsGroupInvalid()) {
              <p class="mt-1 text-sm text-error-500">All dimensions are required</p>
            }
          </div>
          
          <!-- Package Contents -->
          <div class="form-group md:col-span-2">
            <label for="packageContents" class="form-label">Package Contents</label>
            <input 
              type="text" 
              id="packageContents" 
              formControlName="packageContents"
              class="form-control" 
              placeholder="Brief description of contents"
              [class.border-error-500]="isFieldInvalid('packageContents')" />
            
            @if (isFieldInvalid('packageContents')) {
              <p class="mt-1 text-sm text-error-500">Please describe the contents</p>
            }
          </div>
          
          <!-- Special Handling -->
          <div class="form-group md:col-span-2">
            <label class="form-label">Special Handling</label>
            <div class="flex flex-col sm:flex-row gap-4 mt-2">
              <div class="flex items-center">
                <input 
                  type="checkbox" 
                  id="isFragile" 
                  formControlName="isFragile"
                  class="h-4 w-4 text-primary-500 border-neutral-300 rounded focus:ring-primary-500" />
                <label for="isFragile" class="ml-2 block text-sm text-neutral-700">
                  Fragile
                </label>
              </div>
              <div class="flex items-center">
                <input 
                  type="checkbox" 
                  id="requiresRefrigeration" 
                  formControlName="requiresRefrigeration"
                  class="h-4 w-4 text-primary-500 border-neutral-300 rounded focus:ring-primary-500" />
                <label for="requiresRefrigeration" class="ml-2 block text-sm text-neutral-700">
                  Requires Refrigeration
                </label>
              </div>
            </div>
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
            Continue to Review
            <span class="material-icons ml-1">arrow_forward</span>
          </button>
        </div>
      </form>
    </div>
  `
})
export class DeliveryFormStep03PackageComponent {
  formGroup = input.required<FormGroup>();
  goToNext = output<void>();
  goBack = output<void>();
  constructor(private deliveryHttp: DeliveryHttpService) {}

  isFieldInvalid(field: string): boolean {
    const control = this.formGroup().get(field);
    return control !== null && control.invalid && (control.dirty || control.touched);
  }

  isDimensionInvalid(field: string): boolean {
    const control = this.formGroup().get(`packageDimensions.${field}`);
    return control !== null && control.invalid && (control.dirty || control.touched);
  }

  isDimensionsGroupInvalid(): boolean {
    const dimensionsGroup = this.formGroup().get('packageDimensions');
    return dimensionsGroup !== null && dimensionsGroup.invalid && (dimensionsGroup.dirty || dimensionsGroup.touched);
  }

  setPackageType(type: string): void {
    this.formGroup().get('packageType')?.setValue(type);
  }

  isNextDisabled(): boolean {
    const packageControls = [
      'packageType', 
      'packageWeight', 
      'packageDimensions',
      'packageContents'
    ];
    
    return packageControls.some(control => {
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
        if (key.startsWith('package')) {
          const control = this.formGroup().get(key);
          if (control) {
            control.markAsTouched();
          }
        }
      });
      
      // Also mark dimensions fields
      const dimensionsGroup = this.formGroup().get('packageDimensions');
      if (dimensionsGroup) {
        Object.keys((<FormGroup>dimensionsGroup).controls).forEach(key => {
          const control = dimensionsGroup.get(key);
          if (control) {
            control.markAsTouched();
          }
        });
      }
    }
  }

  onBack(): void {
    this.goBack.emit();
  }

  loadDefaultPackageInfo(): void {
    this.formGroup().patchValue(this.deliveryHttp.getPackageMockData());
  }
}