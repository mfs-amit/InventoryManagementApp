import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/shared/services/service.service';

@Component({
  selector: 'app-product-rating',
  templateUrl: './product-rating.component.html',
  styleUrls: ['./product-rating.component.css']
})
export class ProductRatingComponent implements OnChanges {
  @Input() rating: number;
  @Output() ratingEvent = new EventEmitter<FormControl>();
  ratingControl: FormControl;

  constructor(private sharedService: ServiceService) {
    this.ratingControl = new FormControl('', [Validators.required, this.sharedService.range(0, 5)]);
  }

  ngOnChanges() {
    if (this.rating) {
      this.ratingControl.setValue(this.rating);
      this.ratingControl.markAsTouched();
      this.sendRating();
    } else {
      this.ratingControl.reset();
    }
  }

  sendRating() {
    this.ratingEvent.emit(this.ratingControl);
  }

}
