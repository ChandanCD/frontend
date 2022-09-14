import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { CsvServiceService } from './services/csv-service.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let fakeCsvService: jasmine.SpyObj<CsvServiceService>;
  let fakeModalService: jasmine.SpyObj<NgbModal>;
  let fakeTranslate: jasmine.SpyObj<TranslateService>;

  beforeEach(waitForAsync(() => {
    fakeCsvService = jasmine.createSpyObj<CsvServiceService>('CsvServiceService', ['getCsvData', 'multipleOrderDelete']);
    fakeModalService = jasmine.createSpyObj<NgbModal>('NgbModal', ['open']);
    fakeTranslate = jasmine.createSpyObj<TranslateService>('TranslateService', ['addLangs', 'setDefaultLang', 'use']);

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: CsvServiceService, useFactory: () => fakeCsvService },
        { provide: NgbModal, useFactory: () => fakeModalService },
        { provide: TranslateService, useFactory: () => fakeTranslate },
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
