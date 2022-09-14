import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from "@angular/common/http"
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import { CsvServiceService } from './services/csv-service.service';
import { ButtonRendererComponent } from './components/button-renderer/button-renderer.component';
import { PopupComponent } from './components/popup/popup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from './components/toast/toast.component';
import { AppRoutingModule } from './app-routing.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    ButtonRendererComponent,
    PopupComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    AgGridModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    })
  ],
  providers: [CsvServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
