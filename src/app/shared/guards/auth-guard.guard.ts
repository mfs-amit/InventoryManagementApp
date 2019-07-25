import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private myRoute: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('token') && localStorage.getItem('userType') && localStorage.getItem('username')) {
      if ((state.url == "/product" || state.url == "/distributor") && localStorage.getItem('userType') != 'admin') {
        this.myRoute.navigate(["products"]);
        return false;
      } else {
        return true;
      }
    } else {
      this.myRoute.navigate(["login"]);
      return false;
    }
  }
}
