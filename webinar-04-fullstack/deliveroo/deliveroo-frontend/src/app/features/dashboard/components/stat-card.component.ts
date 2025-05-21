import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card p-6 hover:shadow-md transition-shadow duration-300">
      <div class="flex justify-between">
        <div>
          <p class="text-neutral-500 text-sm">{{ title }}</p>
          <p class="text-2xl font-bold mt-1">{{ value }}</p>
          <p class="mt-2 text-sm" [class]="getTrendClass()">
            <span class="inline-block align-middle">{{ trend === 'up' ? '↑' : '↓' }}</span>
            {{ change }}
          </p>
        </div>
        <div class="bg-primary-100 text-primary-600 p-3 rounded-full h-12 w-12 flex items-center justify-center">
          <span class="material-icons">{{ icon }}</span>
        </div>
      </div>
    </div>
  `
})
export class StatCardComponent {
  @Input() title: string = '';
  @Input() value: string = '';
  @Input() change: string = '';
  @Input() icon: string = '';
  @Input() trend: 'up' | 'down' = 'up';

  getTrendClass(): string {
    return this.trend === 'up' 
      ? 'text-success-500' 
      : 'text-error-500';
  }
}