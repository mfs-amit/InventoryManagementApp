import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product/product.service';
import { product } from 'src/app/shared/models/model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { UserProductDetailComponent } from './user-product-detail/user-product-detail.component';

@Component({
  selector: 'app-user-product-view',
  templateUrl: './user-product-view.component.html',
  styleUrls: ['./user-product-view.component.css']
})
export class UserProductViewComponent implements OnInit, OnDestroy {
  productsList: product[];
  private subscription: Subscription = new Subscription();

  constructor(private productService: ProductService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.getProductsList();
  }

  getProductsList() {
    this.subscription.add(
      this.productService.getProductList().subscribe(result => {
        if (result) {
          this.productsList = [...result];
          this.productsList.reverse();
        }
      })
    )
  }

  showProductDetail(product: product) {
    this.dialog.open(UserProductDetailComponent, {
      data: product
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
