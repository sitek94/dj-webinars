import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatCardComponent } from './components/stat-card.component';
import { DeliveryTableComponent } from './components/delivery-table.component';
import { FleetStatusChartComponent } from './components/fleet-status-chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    StatCardComponent,
    DeliveryTableComponent,
    FleetStatusChartComponent
  ],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-2xl font-bold mb-6">Dashboard</h1>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <app-stat-card
          title="Active Deliveries"
          value="24"
          change="+12%"
          icon="local_shipping"
          trend="up">
        </app-stat-card>

        <app-stat-card
          title="Vehicles Online"
          value="18"
          change="-5%"
          icon="directions_car"
          trend="down">
        </app-stat-card>

        <app-stat-card
          title="On-Time Rate"
          value="94%"
          change="+2%"
          icon="schedule"
          trend="up">
        </app-stat-card>

        <app-stat-card
          title="Fuel Efficiency"
          value="28 mpg"
          change="+5%"
          icon="local_gas_station"
          trend="up">
        </app-stat-card>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Delivery Table (Spans 2 columns on larger screens) -->
        <div class="lg:col-span-2">
          <div class="card mb-6">
            <div class="card-header flex justify-between items-center">
              <h2 class="text-lg font-semibold">Recent Deliveries</h2>
              <a href="#" class="text-primary-500 text-sm hover:text-primary-600 transition-colors">View All</a>
            </div>
            <div class="card-body p-0">
              <app-delivery-table></app-delivery-table>
            </div>
          </div>
        </div>

        <!-- Side Content (1 column) -->
        <div class="flex flex-col gap-6">
          <!-- Fleet Status -->
          <div class="card h-full">
            <div class="card-header">
              <h2 class="text-lg font-semibold">Fleet Status</h2>
            </div>
            <div class="card-body">
              <app-fleet-status-chart></app-fleet-status-chart>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="card">
            <div class="card-header">
              <h2 class="text-lg font-semibold">Quick Actions</h2>
            </div>
            <div class="card-body">
              <div class="space-y-3">
                <button class="btn btn-primary w-full justify-start">
                  <span class="material-icons mr-2">add_circle</span>
                  Create New Delivery
                </button>
                <button class="btn btn-secondary w-full justify-start">
                  <span class="material-icons mr-2">people</span>
                  Assign Driver
                </button>
                <button class="btn btn-secondary w-full justify-start">
                  <span class="material-icons mr-2">description</span>
                  Generate Report
                </button>
                <button class="btn btn-secondary w-full justify-start">
                  <span class="material-icons mr-2">settings</span>
                  Manage Fleet
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent {}