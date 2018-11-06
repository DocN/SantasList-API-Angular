import { TestBed, inject } from '@angular/core/testing';

import { URLServiceService } from './urlservice.service';

describe('URLServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [URLServiceService]
    });
  });

  it('should be created', inject([URLServiceService], (service: URLServiceService) => {
    expect(service).toBeTruthy();
  }));
});
