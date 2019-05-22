import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-rating',
  templateUrl: './product-rating.component.html',
  styleUrls: ['./product-rating.component.css']
})
export class ProductRatingComponent {
  @Input() rating: number;
  @Output() ratingEvent = new EventEmitter<number>();

  constructor() { }

  sendRating() {
    this.ratingEvent.emit(this.rating);
  }

}
