import { Component } from '@angular/core';
import { product, addProductApiRequest } from 'src/app/shared/models/model';
import { ProductService } from '../product/product.service';
import { ServiceService } from 'src/app/shared/services/service.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  product: product = new product();

  constructor(private productService: ProductService, private sharedService: ServiceService) {
    this.sharedService.getProductDetailsComponent().subscribe((result: product) => {
      this.product = {...result};
    })
  }

  receiveRating(rating: number) {
    this.product.rating = rating;
  }

  addProduct() {
    let apiRequest: addProductApiRequest = {
      name: this.product.name,
      price: this.product.price,
      rating: this.product.rating
    }
    this.productService.addProduct(apiRequest).subscribe((results: product) => {
      this.cancel(true);
    })
  }

  updateProduct() {
    let apiRequest: product = {
      name: this.product.name,
      price: this.product.price,
      rating: this.product.rating,
      id: this.product.id
    }
    this.productService.updateProduct(apiRequest).subscribe((results: product) => {
      this.cancel(true);
    })
  }

  deleteProduct() {
    this.productService.deleteProduct(this.product.id).subscribe((results: product) => {
      this.cancel(true);
    })
  }

  cancel(callApi: boolean) {
    this.product = new product();
    this.sharedService.setProductDetailsComponent(this.product);
    this.sharedService.setProductListRefresh(callApi);
  }
}
