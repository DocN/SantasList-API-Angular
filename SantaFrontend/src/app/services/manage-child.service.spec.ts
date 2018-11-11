import { TestBed, inject } from '@angular/core/testing';

import { ManageChildService } from './manage-child.service';

describe('ManageChildService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageChildService]
    });
  });

  it('should be created', inject([ManageChildService], (service: ManageChildService) => {
    expect(service).toBeTruthy();
  }));
});
