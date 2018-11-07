import { TestBed, inject } from '@angular/core/testing';

import { APIURLService } from './apiurl.service';

describe('APIURLService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [APIURLService]
    });
  });

  it('should be created', inject([APIURLService], (service: APIURLService) => {
    expect(service).toBeTruthy();
  }));
});
