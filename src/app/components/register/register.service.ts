import { Injectable } from '@angular/core';
import { registerApiRequest } from 'src/app/shared/models/model';
import { Observable, throwError } from 'rxjs';
import { apiUrls } from 'src/assets/config/config';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(apiRequest: registerApiRequest): Observable<any> {
    return this.http.post<any>(apiUrls.register, apiRequest).pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    return throwError(errorResponse.error);
  }
}
