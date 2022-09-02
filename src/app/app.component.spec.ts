import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CsvServiceService } from './services/csv-service.service';
import { of } from 'rxjs';

interface CsvData {
  id: number;
  name: string;
  state: string;
  zip: number;
  amount: number;
  qty: number;
  item: string
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('frontend');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.btn-primary')?.textContent).toContain('Add New');
  });

  
  it(`fetch all record`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const service = fixture.debugElement.injector.get(CsvServiceService);
    spyOn(service, "getCsvData").and.returnValue(of([{  id: 1, name: 'Liquid Saffron', state: 'NY', zip: 08998, amount: 25.43, qty: 7,item: 'XCD45300'}]));
    app.getAllData();

    expect(app.rowData).toEqual([{  id: 1, name: 'Liquid Saffron', state: 'NY', zip: 08998, amount: 25.43, qty: 7,item: 'XCD45300'}])
  });
  
});
