import { Component, OnInit, Input } from '@angular/core';
import { product } from 'src/app/shared/models/model';
import { ProductService } from '../product/product.service';
import { ServiceService } from 'src/app/shared/services/service.service';

@Component({
  selector: 'app-user-product-overview',
  templateUrl: './user-product-overview.component.html',
  styleUrls: ['./user-product-overview.component.css']
})
export class UserProductOverviewComponent implements OnInit {
  @Input() productDetail: product;
  ratingStars = [0, 0, 0, 0, 0];
  averageRating: number = 0;

  constructor(private productService: ProductService, private sharedService: ServiceService) { }

  ngOnInit() {
    this.getAverageRating(this.productDetail._id);
  }

  showRating() {
    this.ratingStars = [0, 0, 0, 0, 0];
    if (this.averageRating) {
      for (let i = 0; i < this.averageRating; i++) {
        this.ratingStars[i] = 1;
      }
    }
  }

  getAverageRating(productId: string) {
    this.productService.getProductDetail(productId).subscribe(result => {
      this.productDetail = { ...result };
      this.averageRating = this.sharedService.calculateAverageRating(this.productDetail.rating);
      this.showRating();
    })
  }

}
