import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product/product.service';
import { ServiceService } from 'src/app/shared/services/service.service';
import { product } from 'src/app/shared/models/model';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  productsList: product[] = new Array<product>();
  selectedProduct: number;
  private subscription: Subscription = new Subscription();

  constructor(private productService: ProductService, private sharedService: ServiceService, private tostr: ToastrService) {
    this.subscription.add(
      this.sharedService.getProductListRefresh().subscribe((result: boolean) => {
        this.selectedProduct = null;
        if (result == true) {
          this.getProductList();
        }
      })
    )
  }

  ngOnInit() {
    this.getProductList();
  }

  getProductList() {
    this.subscription.add(
      this.productService.getProductList().subscribe((results: product[]) => {
        this.productsList = [...results];
        this.productsList.reverse();
      }, err => {
        this.tostr.error('', err);
      })
    )
  }

  selectProduct(index: number) {
    this.selectedProduct = index;
    this.sharedService.setProductDetailsComponent(this.productsList[index]);
  }

  addProduct() {
    this.sharedService.setEnableDisableForm(true);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
