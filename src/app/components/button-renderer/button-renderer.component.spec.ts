import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonRendererComponent } from './button-renderer.component';
import { CsvServiceService } from 'src/app/services/csv-service.service';

describe('ButtonRendererComponent', () => {
  let component: ButtonRendererComponent;
  let fixture: ComponentFixture<ButtonRendererComponent>;
  let fakeCsvService: jasmine.SpyObj<CsvServiceService>;

  beforeEach(waitForAsync(() => {
    fakeCsvService = jasmine.createSpyObj<CsvServiceService>('CsvServiceService', ['create', 'update', 'delete']);

    TestBed.configureTestingModule({
      declarations: [ButtonRendererComponent],
      providers: [
        { provide: CsvServiceService, useFactory: () => fakeCsvService },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('button component', () => {
    expect(component).toBeTruthy();
  });

});
