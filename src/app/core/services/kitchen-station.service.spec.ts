import { TestBed } from '@angular/core/testing';

import { KitchenStationService } from './kitchen-station.service';

describe('KitchenStationService', () => {
  let service: KitchenStationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KitchenStationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
