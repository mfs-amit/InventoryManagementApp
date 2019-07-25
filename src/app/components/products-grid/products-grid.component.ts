import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product/product.service';
import { product } from 'src/app/shared/models/model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { UserProductDetailComponent } from '../user-product-detail/user-product-detail.component';

@Component({
  selector: 'app-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.css']
})
export class ProductsGridComponent implements OnInit {
  productsList: product[];

  constructor(private productService: ProductService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.getProductsList();
  }

  getProductsList() {
    this.productService.getProductList().subscribe(result => {
      if (result) {
        this.productsList = [...result];
      }
    })
  }

  showProductDetail(product: product) {
    this.dialog.open(UserProductDetailComponent, {
      data: product
    });
  }

}
