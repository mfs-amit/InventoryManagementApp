import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  ratingStars = [0, 0, 0, 0, 0];

  constructor(private route: ActivatedRoute, private productService: ProductService, public dialogRef: MatDialogRef<UserProductDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: product) { }

  ngOnInit() {
    // this.getProductDetail(this.route.snapshot.paramMap.get("id"));
    this.productDetail = { ...this.data };
    if (this.productDetail.rating) {
      for (let i = 0; i < this.productDetail.rating; i++) {
        this.ratingStars[i] = 1;
      }
    }

  }

  getProductDetail(productId: string) {
    this.productService.getProductDetail(productId).subscribe(result => {
      this.productDetail = { ...result };
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
