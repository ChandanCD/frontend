import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateComponent } from './create.component';
import { CsvServiceService } from 'src/app/services/csv-service.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../services/toast.service';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let fakeActiveModal: jasmine.SpyObj<NgbActiveModal>;
  let fakeCsvService: jasmine.SpyObj<CsvServiceService>;
  let fakeToastService: jasmine.SpyObj<ToastService>;

  beforeEach(waitForAsync(() => {
    fakeActiveModal = jasmine.createSpyObj<NgbActiveModal>('NgbActiveModal', ['close']);
    fakeCsvService = jasmine.createSpyObj<CsvServiceService>('CsvServiceService', ['create', 'update']);
    fakeToastService = jasmine.createSpyObj<ToastService>('ToastService', ['show']);

    TestBed.configureTestingModule({
      declarations: [CreateComponent],
      providers: [
        { provide: NgbActiveModal, useFactory: () => fakeActiveModal },
        { provide: CsvServiceService, useFactory: () => fakeCsvService },
        { provide: ToastService, useFactory: () => fakeToastService },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
