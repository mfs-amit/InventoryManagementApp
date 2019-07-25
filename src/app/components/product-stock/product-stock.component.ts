import { Component, Input } from '@angular/core';
import { ServiceService } from 'src/app/shared/services/service.service';
import { product } from 'src/app/shared/models/model';

@Component({
  selector: 'app-product-stock',
  templateUrl: './product-stock.component.html',
  styleUrls: ['./product-stock.component.css']
})
export class ProductStockComponent {
  productId: number;

  constructor(private sharedService: ServiceService) {
    this.sharedService.getProductDetailsComponent().subscribe((result: product) => {
      this.productId = result.quantity;
    })
  }
}
