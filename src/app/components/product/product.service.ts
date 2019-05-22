import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { apiUrls } from 'src/environments/environment';
import { loginApiResponse, product, addProductApiRequest } from 'src/app/shared/models/model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  logout(): Observable<any> {
    return this.http.post<any>(apiUrls.logout, '').pipe(catchError(this.handleError));
  }

  getProductList(): Observable<product[]> {
    return this.http.get<product[]>(apiUrls.products).pipe(catchError(this.handleError));
  }

  addProduct(apiRequest: addProductApiRequest): Observable<product> {
    return this.http.post<product>(apiUrls.products, apiRequest).pipe(catchError(this.handleError));
  }

  updateProduct(apiRequest: product): Observable<product> {
    return this.http.put<product>(apiUrls.products, apiRequest).pipe(catchError(this.handleError));
  }

  deleteProduct(productId: number): Observable<product> {
    return this.http.delete<product>(apiUrls.products + '/' + productId).pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      return throwError('Client side error');
    }
    else {
      return throwError('Server side error')
    }
  }
}
