import { TestBed } from '@angular/core/testing';

import { FeatureFlagService } from './feature-flag.service';

describe('SocketIoService', () => {
  let service: FeatureFlagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeatureFlagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
