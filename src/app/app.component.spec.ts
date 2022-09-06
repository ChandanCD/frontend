import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CsvServiceService } from './services/csv-service.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let fakeCsvService: jasmine.SpyObj<CsvServiceService>;

  beforeEach(waitForAsync(() => {
    fakeCsvService = jasmine.createSpyObj<CsvServiceService>('CsvServiceService', ['getCsvData']);

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: CsvServiceService, useFactory: () => fakeCsvService },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
