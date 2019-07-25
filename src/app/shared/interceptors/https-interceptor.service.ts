import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
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
    return next.handle(req).pipe(tap(res => {
      if (res instanceof HttpResponse) {
      }
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status == 401) {
          localStorage.clear();
          this.router.navigate(['/login']);
          this.toastr.error('', err.error);
        }
      }
    }));
  }
}