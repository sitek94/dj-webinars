import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeliveryHttpService {

  constructor() { }

  getPickupMockData(): any {
    return {
      pickupName: 'John Doe',
      pickupEmail: 'john.doe@example.com',
      pickupPhone: '123-456-7890',
      pickupAddress: '123 Main St',
      pickupCity: 'New York',
      pickupState: 'NY',
      pickupZip: '10001',
      pickupDate: this.getTodayDateString(),
      pickupTimeWindow: '9-12'
    };
  }

  getDeliveryMockData(): any {
    return {
      recipientName: 'Jane Smith',
      recipientEmail: 'jane.smith@example.com',
      recipientPhone: '987-654-3210',
      deliveryAddress: '456 Market Ave',
      deliveryCity: 'San Francisco',
      deliveryState: 'CA',
      deliveryZip: '94105',
      deliveryInstructions: 'Leave at the front desk.'
    };
  }

  getPackageMockData(): any {
    return {
      packageType: 'standard',
      packageWeight: 12.5,
      packageDimensions: {
        length: 18,
        width: 12,
        height: 8
      },
      packageContents: 'Books and documents',
      isFragile: true,
      requiresRefrigeration: false
    };
  }

  getReviewMockData(): any {
    return {
      pickupName: 'John Doe',
      pickupEmail: 'john.doe@example.com',
      pickupPhone: '123-456-7890',
      pickupAddress: '123 Main St',
      pickupCity: 'New York',
      pickupState: 'NY',
      pickupZip: '10001',
      pickupDate: this.getTodayDateString(),
      pickupTimeWindow: '9-12',
      recipientName: 'Jane Smith',
      recipientEmail: 'jane.smith@example.com',
      recipientPhone: '987-654-3210',
      deliveryAddress: '456 Market Ave',
      deliveryCity: 'San Francisco',
      deliveryState: 'CA',
      deliveryZip: '94105',
      deliveryInstructions: 'Leave at the front desk.',
      packageType: 'standard',
      packageWeight: 12.5,
      packageDimensions: {
        length: 18,
        width: 12,
        height: 8
      },
      packageContents: 'Books and documents',
      isFragile: true,
      requiresRefrigeration: false,
      insurance: true,
      agreeToTerms: true,
      serviceLevel: 'standard'
    };
  }

  private getTodayDateString(): string {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }
}
