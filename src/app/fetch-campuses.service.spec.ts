import { TestBed } from '@angular/core/testing';

import { FetchCampusesService } from './fetch-campuses.service';

describe('FetchCampusesService', () => {
  let service: FetchCampusesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchCampusesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
