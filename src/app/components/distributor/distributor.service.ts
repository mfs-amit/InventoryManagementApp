import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { distributor } from 'src/app/shared/models/model';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { apiUrls } from 'src/assets/config/config';

@Injectable({
  providedIn: 'root'
})
export class DistributorService {

  constructor(private http: HttpClient) { }

  getDistributorList(): Observable<distributor[]> {
    return this.http.get<distributor[]>(apiUrls.distributors).pipe(catchError(this.handleError));
  }

  addDistributor(apiRequest: distributor): Observable<distributor> {
    return this.http.post<distributor>(apiUrls.distributors, apiRequest).pipe(catchError(this.handleError));
  }

  updateDistributor(apiRequest: distributor): Observable<distributor> {
    return this.http.put<distributor>(apiUrls.distributors, apiRequest).pipe(catchError(this.handleError));
  }

  deleteDistributor(distributorId: string): Observable<distributor> {
    return this.http.delete<distributor>(apiUrls.distributors + '/' + distributorId).pipe(catchError(this.handleError));
  }

  getDistributorDetail(distributorId: string): Observable<distributor> {
    return this.http.get<distributor>(apiUrls.distributors + '/' + distributorId).pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    return throwError(errorResponse.error);
  }
}
