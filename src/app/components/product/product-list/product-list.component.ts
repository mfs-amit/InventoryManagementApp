import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServiceService } from 'src/app/shared/services/service.service';
import { product } from 'src/app/shared/models/model';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ProductService } from '../product.service';

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
      this.sharedService.getListRefresh().subscribe((result: boolean) => {
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
    this.sharedService.setDetailsComponent(this.productsList[index]);
    this.sharedService.setEnableDisableForm(true);
  }

  addProduct() {
    this.sharedService.setEnableDisableForm(true);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
