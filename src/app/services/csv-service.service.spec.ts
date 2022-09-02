import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CsvServiceService } from './csv-service.service';

describe('CsvServiceService', () => {
  let service: CsvServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CsvServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
