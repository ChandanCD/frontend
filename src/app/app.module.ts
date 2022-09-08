import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http"
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import { CsvServiceService } from './services/csv-service.service';
import { ButtonRendererComponent } from './components/button-renderer/button-renderer.component';
import { CreateComponent } from './components/create/create.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonRendererComponent,
    CreateComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    AgGridModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [CsvServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
