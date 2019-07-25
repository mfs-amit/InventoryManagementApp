import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  constructor(private myRoute: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('token') && localStorage.getItem('userType') && localStorage.getItem('username')) {
      if (localStorage.getItem('userType') == 'admin') {
        this.myRoute.navigate(["product"]);
        return false;
      } else if (localStorage.getItem('userType') == 'user') {
        this.myRoute.navigate(["products"]);
        return false;
      }
    } else {
      return true;
    }
  }
}
