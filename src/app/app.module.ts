import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http"
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import { CsvServiceService } from './services/csv-service.service';
import { ButtonRendererComponent } from './components/button-renderer/button-renderer.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonRendererComponent
  ],
  imports: [
    BrowserModule,
    AgGridModule,
    HttpClientModule
  ],
  providers: [CsvServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
