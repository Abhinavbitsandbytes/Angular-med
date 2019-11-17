import { TestBed } from '@angular/core/testing';

import { MedicineDataService } from './medicine-data.service';

describe('MedicineDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MedicineDataService = TestBed.get(MedicineDataService);
    expect(service).toBeTruthy();
  });
});
