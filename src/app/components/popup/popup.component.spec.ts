import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { PopupComponent } from './popup.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CsvServiceService } from 'src/app/services/csv-service.service';
import { ToastService } from '../../services/toast.service';
import { TranslatePipe } from '@ngx-translate/core';

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translate'
})

export class TranslatePipeMock implements PipeTransform {
  public name = 'translate';

  public transform(query: string, ...args: any[]): any {
    return query;
  }
}

describe('PopupComponent', () => {
  let component: PopupComponent;
  let fixture: ComponentFixture<PopupComponent>;
  let fakeActiveModal: jasmine.SpyObj<NgbActiveModal>;
  let fakeCsvService: jasmine.SpyObj<CsvServiceService>;
  let fakeToastService: jasmine.SpyObj<ToastService>;
  let fakeRouter: jasmine.SpyObj<Router>;

  beforeEach(waitForAsync(() => {
    fakeActiveModal = jasmine.createSpyObj<NgbActiveModal>('NgbActiveModal', ['close']);
    fakeCsvService = jasmine.createSpyObj<CsvServiceService>('CsvServiceService', ['create', 'update']);
    fakeToastService = jasmine.createSpyObj<ToastService>('ToastService', ['show']);
    fakeRouter = jasmine.createSpyObj<Router>('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [PopupComponent, TranslatePipeMock],
      providers: [
        { provide: NgbActiveModal, useFactory: () => fakeActiveModal },
        { provide: CsvServiceService, useFactory: () => fakeCsvService },
        { provide: ToastService, useFactory: () => fakeToastService },
        { provide: Router, useFactory: () => fakeRouter },
        {
          provide: TranslatePipe,
          useClass: TranslatePipeMock
        }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
