import { Component, OnInit, Input } from '@angular/core';
import { product, userRating } from 'src/app/shared/models/model';
import { ProductService } from '../product/product.service';
import { ServiceService } from 'src/app/shared/services/service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-product-rating',
  templateUrl: './user-product-rating.component.html',
  styleUrls: ['./user-product-rating.component.css']
})
export class UserProductRatingComponent implements OnInit {
  @Input() productDetail: product;
  ratingStars = [0, 0, 0, 0, 0];
  ratingCount: number = 0;
  comments: string = '';

  constructor(private productService: ProductService, private sharedService: ServiceService, private tostr: ToastrService) { }

  ngOnInit() {
  }

  rateProduct(rate: number) {
    this.ratingStars = [0, 0, 0, 0, 0];
    this.ratingCount = rate;
    for (let i = 0; i < rate; i++) {
      this.ratingStars[i] = 1;
    }
  }

  submitRating() {
    let userRatingData: userRating;
    userRatingData = {
      rating: this.ratingCount,
      comment: this.comments,
      userId: localStorage.getItem("userId"),
      userName: localStorage.getItem("username")
    }

    let productDetails = { ...this.productDetail };
    productDetails.rating.push(userRatingData);

    let apiRequest: product = {
      name: productDetails.name,
      price: productDetails.price,
      _id: productDetails._id,
      mrp: productDetails.mrp,
      image: productDetails.image ? productDetails.image : '',
      description: productDetails.description,
      attribute: productDetails.attribute ? productDetails.attribute : [],
      rating: productDetails.rating,
      distributor: []
    }
    this.productService.updateProduct(apiRequest).subscribe((results: product) => {
      this.ratingCount = 0;
      this.ratingStars = [0, 0, 0, 0, 0];
      this.comments = '';
      this.sharedService.snackBarMethod('Thanks for your rating and comment.');
    }, err => {
      this.tostr.error('', err);
    })
  }
}
