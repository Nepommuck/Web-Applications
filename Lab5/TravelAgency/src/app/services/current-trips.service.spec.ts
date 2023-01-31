import { TestBed } from '@angular/core/testing';

import { CurrentTripsService } from './current-trips.service';

describe('CurrentTripsService', () => {
  let service: CurrentTripsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentTripsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
