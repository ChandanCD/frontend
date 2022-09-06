import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

interface CsvData {
  id: number;
  name: string;
  state: string;
  zip: number;
  amount: number;
  qty: number;
  item: string
}

@Injectable({
  providedIn: 'root'
})
export class CsvServiceService {
  private apiServer = "http://localhost/backend/data";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  /*
  create new record in csv file
  */
  create(data: any): Observable<CsvData[]> {
    return this.httpClient.post<CsvData[]>(this.apiServer + '/create', JSON.stringify(data), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  /*
  update data in csv 
  stringify json and send data
  */
  update(data: string): Observable<CsvData> {
    return this.httpClient.post<CsvData>(this.apiServer + '/update', JSON.stringify(data), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  /*
  delete data from csv based on row id
  */
  delete(id: number){
    return this.httpClient.post<CsvData>(this.apiServer + '/delete/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  /*
  fetch latest data from csv file
  */
  getCsvData(): Observable<CsvData[]> {
    return this.httpClient.get<CsvData[]>(this.apiServer + '/getdata')
    .pipe(
      catchError(this.errorHandler)
    )
  }


  /*
  function for error handling
  takes two parameter - error and status
  */
  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => errorMessage);
 }
}
