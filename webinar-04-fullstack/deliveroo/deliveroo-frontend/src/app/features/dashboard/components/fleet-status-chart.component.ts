import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FleetStatus {
  status: string;
  count: number;
  color: string;
}

@Component({
  selector: 'app-fleet-status-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="py-4">
      <!-- Pie Chart Placeholder -->
      <div class="flex justify-center mb-6">
        <div class="relative w-40 h-40">
          <svg viewBox="0 0 100 100" class="w-full h-full">
            <!-- Create pie segments dynamically -->
            @for (segment of pieSegments; track segment.status) {
              <circle 
                cx="50" 
                cy="50" 
                r="40" 
                [attr.stroke]="segment.color"
                stroke-width="20"
                fill="transparent"
                [attr.stroke-dasharray]="segment.dashArray"
                [attr.stroke-dashoffset]="segment.dashOffset"
                class="transition-all duration-1000 ease-out"
                transform="rotate(-90 50 50)"
              ></circle>
            }
            <text x="50" y="50" text-anchor="middle" dominant-baseline="middle" class="text-lg font-bold">
              {{ totalVehicles }}
            </text>
            <text x="50" y="60" text-anchor="middle" dominant-baseline="middle" class="text-xs">
              Total
            </text>
          </svg>
        </div>
      </div>

      <!-- Legend -->
      <div class="space-y-2">
        @for (status of fleetStatus; track status.status) {
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-3 h-3 rounded-full mr-2" [style.background-color]="status.color"></div>
              <span class="text-sm">{{ status.status }}</span>
            </div>
            <span class="font-semibold">{{ status.count }}</span>
          </div>
        }
      </div>
    </div>
  `
})
export class FleetStatusChartComponent implements OnInit {
  fleetStatus: FleetStatus[] = [
    { status: 'On Delivery', count: 12, color: '#005AFF' }, // primary-500
    { status: 'Available', count: 8, color: '#10B981' },    // success-500
    { status: 'Maintenance', count: 3, color: '#F59E0B' },  // warning-500
    { status: 'Offline', count: 2, color: '#9CA3AF' }       // neutral-400
  ];

  pieSegments: any[] = [];
  totalVehicles = 0;

  ngOnInit() {
    this.calculatePieSegments();
  }

  calculatePieSegments() {
    this.totalVehicles = this.fleetStatus.reduce((sum, item) => sum + item.count, 0);
    
    let cumulativePercent = 0;
    this.pieSegments = this.fleetStatus.map(item => {
      const percentage = (item.count / this.totalVehicles) * 100;
      const dashArray = `${percentage} ${100 - percentage}`;
      const dashOffset = -cumulativePercent;
      cumulativePercent += percentage;
      
      return {
        ...item,
        percentage,
        dashArray,
        dashOffset
      };
    });
  }
}