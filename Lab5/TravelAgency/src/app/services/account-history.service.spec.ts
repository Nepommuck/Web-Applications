import { TestBed } from '@angular/core/testing';

import { AccountHistoryService } from './account-history.service';

describe('AccountHistoryService', () => {
  let service: AccountHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
