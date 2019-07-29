import { Component, Input } from '@angular/core';
import { ServiceService } from 'src/app/shared/services/service.service';
import { userRating } from 'src/app/shared/models/model';

@Component({
  selector: 'app-product-rating',
  templateUrl: './product-rating.component.html',
  styleUrls: ['./product-rating.component.css']
})
export class ProductRatingComponent {
  @Input() productRatings: userRating[] = new Array<userRating>();

  constructor(private sharedService: ServiceService) {
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