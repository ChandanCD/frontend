import { CsvServiceService } from './csv-service.service';
import { HttpClient } from '@angular/common/http';

describe('CsvServiceService', () => {
  let service: CsvServiceService;
  let fakeHttpClient: jasmine.SpyObj<HttpClient>;

  function createService() {
    service = new CsvServiceService(
      fakeHttpClient,
    );
  }

  beforeEach(() => {
    fakeHttpClient = jasmine.createSpyObj<HttpClient>('HttpClient', ['post', 'get']);

    createService();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

});
