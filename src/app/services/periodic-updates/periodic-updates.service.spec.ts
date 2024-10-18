import { TestBed } from '@angular/core/testing';

import { PeriodicUpdatesService } from './periodic-updates.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('PeriodicUpdatesService', () => {
  let service: PeriodicUpdatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, RouterTestingModule ]
    });
    service = TestBed.inject(PeriodicUpdatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
