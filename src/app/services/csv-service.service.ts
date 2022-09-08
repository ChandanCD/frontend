import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Csvdata, DataEntity } from '../interfaces/csvdata';

@Injectable({
  providedIn: 'root'
})
export class CsvServiceService {
  private apiServer = "http://localhost/backend/data";

  /**
   * Http options of csv service
   * Content type json is allowed
   */
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  /*
  create new record in csv file
  */
  create(data: any): Observable<Csvdata> {
    return this.httpClient.post<Csvdata>(this.apiServer + '/create', JSON.stringify(data), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  /**
   * Update data in csv 
   * @param data 
   * @returns update 
   */
  update(data: string): Observable<DataEntity> {
    return this.httpClient.post<DataEntity>(this.apiServer + '/update', JSON.stringify(data), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  
  /**
   * Delete data from csv based on row id
   * @param id 
   * @returns  
   */
  delete(id: number){
    return this.httpClient.post<Csvdata>(this.apiServer + '/delete/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  
  /**
   * Gets csv data
   * @returns csv data 
   */
  getCsvData(): Observable<Csvdata> {
    return this.httpClient.get<Csvdata>(this.apiServer + '/getdata')
    .pipe(
      catchError(this.errorHandler)
    )
  }
  
  /**
   * Errors handler
   * function for error handling
   * @param error 
   * @returns  
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
