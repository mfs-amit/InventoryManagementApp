import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product/product.service';
import { ServiceService } from 'src/app/shared/services/service.service';
import { product } from 'src/app/shared/models/model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productsList: product[] = new Array<product>();
  selectedProduct: number;

  constructor(private productService: ProductService, private sharedService: ServiceService) {
    this.sharedService.getProductListRefresh().subscribe((result: boolean) => {
      this.selectedProduct = null;
      if (result == true) {
        this.getProductList();
      }
    })
  }

  ngOnInit() {
    this.getProductList();
  }

  getProductList() {
    this.productService.getProductList().subscribe((results: product[]) => {
      this.productsList = [...results];
      this.productsList.reverse();
    })
  }

  selectProduct(index: number) {
    this.selectedProduct = index;
    this.sharedService.setProductDetailsComponent(this.productsList[index]);
  }
}
