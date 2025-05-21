import { Component, input, output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delivery-progress-tracker',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-between">
      @for (step of steps(); track step.id) {
        <div class="flex flex-col items-center">
          <div 
            class="w-10 h-10 rounded-full flex items-center justify-center text-sm cursor-pointer transition-colors duration-200"
            [class]="getStepIndicatorClass($index) + (canNavigateTo($index) ? ' hover:bg-blue-200 hover:text-blue-900' : '')"
            (click)="onStepClick($index)"
            [class.pointer-events-none]="!canNavigateTo($index)">
            @if (currentStep() > $index) {
              <span class="material-icons text-lg">check</span>
            } @else {
              {{ $index + 1 }}
            }
          </div>
          <div class="text-xs mt-2 text-center">{{ step.label }}</div>
        </div>
        @if ($index < steps().length - 1) {
          <div 
            class="flex-1 h-1 mx-2"
            [class]="currentStep() > $index ? 'bg-primary-500' : 'bg-neutral-200'">
          </div>
        }
      }
    </div>
  `
})
export class DeliveryProgressTrackerComponent {
  steps = input.required<{ id: string, label: string }[]>();
  currentStep = input.required<number>();
  visitedSteps = input.required<Set<number>>();
  stepClicked = output<number>();

  getStepIndicatorClass(index: number): string {
    if (this.currentStep() > index) {
      return 'bg-primary-500 text-white';
    } else if (this.currentStep() === index) {
      return 'bg-primary-500 text-white';
    } else if (this.canNavigateTo(index)) {
      return 'bg-blue-100 text-blue-700';
    } else {
      return 'bg-neutral-200 text-neutral-700';
    }
  }

  canNavigateTo(index: number): boolean {
    return this.visitedSteps().has(index) || index === this.currentStep();
  }

  onStepClick(index: number) {
    if (this.canNavigateTo(index)) {
      this.stepClicked.emit(index);
    }
  }
} 