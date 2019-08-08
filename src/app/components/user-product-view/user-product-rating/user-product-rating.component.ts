import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { product, userRating } from 'src/app/shared/models/model';
import { ServiceService } from 'src/app/shared/services/service.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ProductService } from '../../product/product.service';

@Component({
  selector: 'app-user-product-rating',
  templateUrl: './user-product-rating.component.html',
  styleUrls: ['./user-product-rating.component.css']
})
export class UserProductRatingComponent implements OnInit, OnDestroy {
  @Input() productDetail: product;
  ratingStars: number[] = [0, 0, 0, 0, 0];
  ratingCount: number = 0;
  comments: string = '';
  showRatingForm: boolean = true;
  private subscription: Subscription = new Subscription();

  constructor(private productService: ProductService, private sharedService: ServiceService, private tostr: ToastrService) { }

  ngOnInit() {
    this.productDetail.rating.forEach(obj => {
      if (obj.userId == localStorage.getItem("userId")) {
        this.showRatingForm = false;
      }
    })
  }

  rateProduct(rate: number) {
    this.ratingCount = rate;
    this.ratingStars = [...this.sharedService.getRatingsArray(rate)];
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
      distributor: productDetails.distributor
    }
    this.subscription.add(
      this.productService.updateProduct(apiRequest).subscribe((results: product) => {
        this.ratingCount = 0;
        this.ratingStars = [0, 0, 0, 0, 0];
        this.comments = '';
        this.sharedService.snackBarMethod('Thanks for your rating and comment.');
        this.showRatingForm = false;
      }, err => {
        this.tostr.error('', err);
      })
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
