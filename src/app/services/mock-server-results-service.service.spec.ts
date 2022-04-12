import { TestBed } from '@angular/core/testing';

import { MockServerResultsService } from './mock-server-results-service.service';

describe('MockServerResultsServiceService', () => {
  let service: MockServerResultsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockServerResultsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
