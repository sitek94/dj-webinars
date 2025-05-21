import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Delivery {
  id: string;
  destination: string;
  driver: string;
  status: 'Completed' | 'In Progress' | 'Delayed' | 'Scheduled';
  date: string;
}

@Component({
  selector: 'app-delivery-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-neutral-200">
        <thead class="bg-neutral-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">ID</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Destination</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Driver</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Date</th>
            <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-neutral-200">
          @for (delivery of deliveries; track delivery.id) {
            <tr class="hover:bg-neutral-50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">{{ delivery.id }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">{{ delivery.destination }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">{{ delivery.driver }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span [class]="getStatusClass(delivery.status)">
                  {{ delivery.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">{{ delivery.date }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="text-primary-500 hover:text-primary-700 transition-colors mr-3">
                  <span class="material-icons text-base">visibility</span>
                </button>
                <button class="text-neutral-400 hover:text-neutral-600 transition-colors">
                  <span class="material-icons text-base">more_vert</span>
                </button>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `
})
export class DeliveryTableComponent {
  deliveries: Delivery[] = [
    {
      id: 'DEL-1234',
      destination: '123 Main St, Boston, MA',
      driver: 'John Smith',
      status: 'Completed',
      date: '2025-01-15'
    },
    {
      id: 'DEL-1235',
      destination: '456 Oak Ave, Chicago, IL',
      driver: 'Sarah Johnson',
      status: 'In Progress',
      date: '2025-01-16'
    },
    {
      id: 'DEL-1236',
      destination: '789 Pine Blvd, Seattle, WA',
      driver: 'Michael Brown',
      status: 'Delayed',
      date: '2025-01-16'
    },
    {
      id: 'DEL-1237',
      destination: '101 Cedar Ln, Austin, TX',
      driver: 'Jessica Lee',
      status: 'Scheduled',
      date: '2025-01-17'
    },
    {
      id: 'DEL-1238',
      destination: '202 Maple Rd, Denver, CO',
      driver: 'Robert Johnson',
      status: 'In Progress',
      date: '2025-01-17'
    }
  ];

  getStatusClass(status: string): string {
    const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full';
    
    switch(status) {
      case 'Completed':
        return `${baseClasses} bg-success-50 text-success-500`;
      case 'In Progress':
        return `${baseClasses} bg-primary-50 text-primary-500`;
      case 'Delayed':
        return `${baseClasses} bg-error-50 text-error-500`;
      case 'Scheduled':
        return `${baseClasses} bg-neutral-100 text-neutral-500`;
      default:
        return baseClasses;
    }
  }
}