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
    return this.sharedService.getRatingsArray(rating);
  }
}