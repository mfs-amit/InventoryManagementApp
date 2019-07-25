import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { product, distributor } from '../models/model';
import { FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private showProductDetailsComponent = new Subject<product>();
  private refreshProductList = new Subject<boolean>();
  private showDistributorDetailsComponent = new Subject<distributor>();
  private refreshDistributorList = new Subject<boolean>();

  constructor(private snackBar: MatSnackBar) { }

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  range(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value !== undefined && (isNaN(control.value) || control.value < min || control.value > max)) {
        return { 'range': true };
      }
      return null;
    };
  }

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

  setDistributorDetailsComponent(status: distributor) {
    this.showDistributorDetailsComponent.next(status);
  }

  getDistributorDetailsComponent(): Observable<distributor> {
    return this.showDistributorDetailsComponent.asObservable();
  }

  setDistributorListRefresh(status: boolean) {
    this.refreshDistributorList.next(status);
  }

  getDistributorListRefresh(): Observable<boolean> {
    return this.refreshDistributorList.asObservable();
  }

  snackBarMethod(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 2000,
    });
  }
}
