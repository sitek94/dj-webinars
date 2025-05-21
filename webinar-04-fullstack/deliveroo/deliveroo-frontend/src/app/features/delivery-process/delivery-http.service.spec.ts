import { TestBed } from '@angular/core/testing';

import { DeliveryHttpService } from './delivery-http.service';

describe('DeliveryHttpService', () => {
  let service: DeliveryHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
