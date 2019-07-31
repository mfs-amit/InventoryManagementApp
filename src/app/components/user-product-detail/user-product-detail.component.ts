import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from '../product/product.service';
import { product } from 'src/app/shared/models/model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-user-product-detail',
  templateUrl: './user-product-detail.component.html',
  styleUrls: ['./user-product-detail.component.css']
})
export class UserProductDetailComponent implements OnInit {
  productDetail: product;

  constructor(private productService: ProductService, public dialogRef: MatDialogRef<UserProductDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: product) { }

  ngOnInit() {
    this.productDetail = { ...this.data };
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
