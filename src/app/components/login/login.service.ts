import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { loginApiRequest, loginApiResponse } from 'src/app/shared/models/model';
import { apiUrls } from 'src/assets/config/config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(apiRequest: loginApiRequest): Observable<loginApiResponse> {
    return this.http.post<loginApiResponse>(apiUrls.login, apiRequest).pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    return throwError(errorResponse.error);
  }
}
