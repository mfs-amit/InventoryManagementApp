import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HttpsInterceptorService implements HttpInterceptor {

  constructor(public router: Router, private toastr: ToastrService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token')) {
      req = req.clone({ headers: req.headers.set('auth-token', localStorage.getItem('token')) });
    }
    return next.handle(req).pipe(catchError((error: HttpErrorResponse) => {
      if (error.status == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
        this.toastr.error('', error.error);
      }
      return throwError(error);
    }));
  }
}