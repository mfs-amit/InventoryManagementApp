import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { product } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private showProductDetailsComponent = new Subject<product>();
  private refreshProductList = new Subject<boolean>();

  constructor() { }

  setProductDetailsComponent(status: product) {
    this.showProductDetailsComponent.next(status);
  }

  getProductDetailsComponent(): Observable<product> {
    return this.showProductDetailsComponent.asObservable();
  }

  setProductListRefresh(status: boolean) {
    this.refreshProductList.next(status);
  }

  getProductListRefresh(): Observable<boolean> {
    return this.refreshProductList.asObservable();
  }
}
