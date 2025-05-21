import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DeliveryFormStep01PickupComponent } from './components/delivery-form-step-01-pickup.component';
import { DeliveryFormStep02DeliveryComponent } from './components/delivery-form-step-02-delivery.component';
import { DeliveryFormStep03PackageComponent } from './components/delivery-form-step-03-package.component';
import { DeliveryFormStep04ReviewComponent } from './components/delivery-form-step-04-review.component';
import { DeliveryProgressTrackerComponent } from './components/delivery-progress-tracker.component';

@Component({
  selector: 'app-delivery-process',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    DeliveryFormStep01PickupComponent,
    DeliveryFormStep02DeliveryComponent,
    DeliveryFormStep03PackageComponent,
    DeliveryFormStep04ReviewComponent,
    DeliveryProgressTrackerComponent
  ],
  template: `
    <div class="container mx-auto px-4 py-12">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold mb-8 text-center">Schedule Your Delivery</h1>

        <!-- Progress Tracker -->
        <div class="mb-10">
          <app-delivery-progress-tracker
            [steps]="steps"
            [currentStep]="currentStep"
            [visitedSteps]="visitedSteps"
            (stepClicked)="goToStep($event)">
          </app-delivery-progress-tracker>
        </div>

        <!-- Form Container -->
        <div class="bg-white shadow-lg rounded-lg p-6 md:p-8 mb-8 animate-fade-in">
          <!-- Dynamic Step Content -->
          @switch (currentStep) {
            @case (0) {
              <app-delivery-form-step-01-pickup
                [formGroup]="deliveryForm"
                (goToNext)="nextStep()">
              </app-delivery-form-step-01-pickup>
            }
            @case (1) {
              <app-delivery-form-step-02-delivery
                [formGroup]="deliveryForm"
                (goToNext)="nextStep()"
                (goBack)="prevStep()">
              </app-delivery-form-step-02-delivery>
            }
            @case (2) {
              <app-delivery-form-step-03-package
                [formGroup]="deliveryForm"
                (goToNext)="nextStep()"
                (goBack)="prevStep()">
              </app-delivery-form-step-03-package>
            }
            @case (3) {
              <app-delivery-form-step-04-review
                [formGroup]="deliveryForm"
                (submitForm)="submitDelivery()"
                (goBack)="prevStep()">
              </app-delivery-form-step-04-review>
            }
          }
        </div>

        @if (formSubmitted) {
          <div class="bg-success-50 border border-success-200 text-success-700 px-4 py-5 rounded-lg text-center animate-fade-in">
            <span class="material-icons text-success-500 text-4xl">check_circle</span>
            <h3 class="text-xl font-semibold mt-2 mb-1">Delivery Scheduled Successfully!</h3>
            <p class="mb-4">Your delivery has been scheduled. We'll contact you with further details.</p>
            <p class="text-sm mb-2">Order reference: <span class="font-medium">DEL-39284</span></p>
            <div class="mt-6">
              <a routerLink="/" class="btn btn-primary">Return to Home</a>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class DeliveryProcessComponent {
  private fb = inject(FormBuilder);

  steps = [
    { id: 'pickup', label: 'Pickup Details' },
    { id: 'delivery', label: 'Delivery Details' },
    { id: 'package', label: 'Package Info' },
    { id: 'confirm', label: 'Review & Confirm' }
  ];

  currentStep = 0;
  formSubmitted = false;
  visitedSteps = new Set<number>([0]);

  // Create a form group with all the fields needed across all steps
  deliveryForm: FormGroup = this.fb.group({
    // Step 1: Pickup Details
    pickupName: ['', Validators.required],
    pickupEmail: ['', [Validators.required, Validators.email]],
    pickupPhone: ['', Validators.required],
    pickupAddress: ['', Validators.required],
    pickupCity: ['', Validators.required],
    pickupState: ['', Validators.required],
    pickupZip: ['', Validators.required],
    pickupDate: [null, Validators.required],
    pickupTimeWindow: ['9-12', Validators.required],
    
    // Step 2: Delivery Details
    recipientName: ['', Validators.required],
    recipientEmail: ['', [Validators.required, Validators.email]],
    recipientPhone: ['', Validators.required],
    deliveryAddress: ['', Validators.required],
    deliveryCity: ['', Validators.required],
    deliveryState: ['', Validators.required],
    deliveryZip: ['', Validators.required],
    deliveryInstructions: [''],
    
    // Step 3: Package Info
    packageType: ['standard', Validators.required],
    packageWeight: [null, [Validators.required, Validators.min(0.1)]],
    packageDimensions: this.fb.group({
      length: [null, [Validators.required, Validators.min(1)]],
      width: [null, [Validators.required, Validators.min(1)]],
      height: [null, [Validators.required, Validators.min(1)]]
    }),
    packageContents: ['', Validators.required],
    isFragile: [false],
    requiresRefrigeration: [false],
    
    // Step 4: Additional
    serviceLevel: ['standard', Validators.required],
    insurance: [false],
    agreeToTerms: [false, Validators.requiredTrue]
  });

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.visitedSteps.add(this.currentStep);
      this.scrollToTop();
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.scrollToTop();
    }
  }

  goToStep(stepIndex: number) {
    if (this.visitedSteps.has(stepIndex) || stepIndex === this.currentStep) {
      this.currentStep = stepIndex;
      this.scrollToTop();
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getStepIndicatorClass(index: number): string {
    if (this.currentStep > index) {
      return 'bg-primary-500 text-white';
    } else if (this.currentStep === index) {
      return 'bg-primary-500 text-white';
    } else {
      return 'bg-neutral-200 text-neutral-700';
    }
  }

  submitDelivery() {
    if (this.deliveryForm.valid) {
      // Simulate API call
      setTimeout(() => {
        this.formSubmitted = true;
        this.scrollToTop();
      }, 1500);
    } else {
      this.deliveryForm.markAllAsTouched();
    }
  }
}