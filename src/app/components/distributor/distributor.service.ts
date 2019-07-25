import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { distributor, addDistributorApiRequest } from 'src/app/shared/models/model';
import { apiUrls } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DistributorService {

  constructor(private http: HttpClient) { }

  getDistributorList(): Observable<distributor[]> {
    return this.http.get<distributor[]>(apiUrls.distributors).pipe(catchError(this.handleError));
  }

  addDistributor(apiRequest: addDistributorApiRequest): Observable<distributor> {
    return this.http.post<distributor>(apiUrls.distributors, apiRequest).pipe(catchError(this.handleError));
  }

  updateDistributor(apiRequest: addDistributorApiRequest): Observable<distributor> {
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
