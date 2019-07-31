import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { product } from 'src/app/shared/models/model';
import { ProductService } from '../product/product.service';
import { ServiceService } from 'src/app/shared/services/service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-product-overview',
  templateUrl: './user-product-overview.component.html',
  styleUrls: ['./user-product-overview.component.css']
})
export class UserProductOverviewComponent implements OnInit, OnDestroy {
  @Input() productDetail: product;
  ratingStars: number[] = [0, 0, 0, 0, 0];
  private subscription: Subscription = new Subscription();

  constructor(private productService: ProductService, private sharedService: ServiceService) { }

  ngOnInit() {
    this.getAverageRating(this.productDetail._id);
  }

  getAverageRating(productId: string) {
    this.subscription.add(
      this.productService.getProductDetail(productId).subscribe(result => {
        this.productDetail = { ...result };
        this.ratingStars = [...this.sharedService.getRatingsArray(this.sharedService.calculateAverageRating(this.productDetail.rating))];
      })
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
