import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { product, distributor, userRating } from '../models/model';
import { FormGroup, ValidatorFn, AbstractControl, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private showDetailsComponent = new Subject<product | distributor>();
  private refreshList = new Subject<boolean>();
  private enableDisableForm = new Subject<boolean>();

  constructor(private snackBar: MatSnackBar) { }

  setDetailsComponent(status: product | distributor) {
    this.showDetailsComponent.next(status);
  }

  getDetailsComponent(): Observable<product | distributor> {
    return this.showDetailsComponent.asObservable();
  }

  setListRefresh(status: boolean) {
    this.refreshList.next(status);
  }

  getListRefresh(): Observable<boolean> {
    return this.refreshList.asObservable();
  }

  setEnableDisableForm(status: boolean) {
    this.enableDisableForm.next(status);
  }

  getEnableDisableForm(): Observable<boolean> {
    return this.enableDisableForm.asObservable();
  }

  snackBarMethod(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 2000,
    });
  }

  markFormGroupTouched(formGroup: FormGroup | FormArray) {
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

  priceRange(basePrice: number, mrp: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value !== undefined && (isNaN(control.value) || control.value <= basePrice || control.value > mrp)) {
        return { 'range': true };
      }
      return null;
    };
  }

  match_MRP(group: FormGroup) {
    let MRP = group.controls.mrp.value;
    let base = group.controls.price.value;

    return base < MRP || !base || !MRP ? null : { 'price': true }
  }

  calculateAverageRating(productRatings: userRating[]): number {
    let totalRating: number = 0;
    productRatings.forEach(obj => {
      totalRating = totalRating + obj.rating;
    })
    let averageRating = totalRating / productRatings.length;
    return Math.round(averageRating);
  }

  getRatingsArray(rating: number): number[] {
    let ratingStars = [0, 0, 0, 0, 0];
    if (rating) {
      for (let i = 0; i < rating; i++) {
        ratingStars[i] = 1;
      }
    }
    return ratingStars;
  }
}
