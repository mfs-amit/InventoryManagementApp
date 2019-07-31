import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { apiUrls } from 'src/environments/environment';
import { product } from 'src/app/shared/models/model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProductList(): Observable<product[]> {
    return this.http.get<product[]>(apiUrls.products).pipe(catchError(this.handleError));
  }

  addProduct(apiRequest: product): Observable<product> {
    return this.http.post<product>(apiUrls.products, apiRequest).pipe(catchError(this.handleError));
  }

  updateProduct(apiRequest: product): Observable<product> {
    return this.http.put<product>(apiUrls.products, apiRequest).pipe(catchError(this.handleError));
  }

  deleteProduct(productId: string): Observable<product> {
    return this.http.delete<product>(apiUrls.products + '/' + productId).pipe(catchError(this.handleError));
  }

  getProductDetail(productId: string): Observable<product> {
    return this.http.get<product>(apiUrls.products + '/' + productId).pipe(catchError(this.handleError));
  }

  uploadImage(formData: any): Observable<any> {
    return this.http.post(apiUrls.uploadImage, formData, {
      reportProgress: true,
      observe: "events"
    })
  }

  private handleError(errorResponse: HttpErrorResponse) {
    return throwError(errorResponse.error);
  }
}
