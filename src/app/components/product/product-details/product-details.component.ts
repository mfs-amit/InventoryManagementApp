import { Component, OnInit, OnDestroy } from '@angular/core';
import { product, attribute, userRating, productDistributor } from 'src/app/shared/models/model';
import { ServiceService } from 'src/app/shared/services/service.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';
import { HttpEventType } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ProductService } from '../product.service';
import { AlertComponent } from '../../alert/alert.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product: product = new product();
  productForm: FormGroup;
  getDistributorApiLoaded: boolean = false;
  distributorFormArray: FormArray;
  attributeFormArray: FormArray;
  distributorInitialValue: productDistributor[] = new Array<productDistributor>();
  attributeInitialValue: attribute[] = new Array<attribute>();
  ratingStars: number[] = [0, 0, 0, 0, 0];
  productFormActive: boolean;
  private subscription: Subscription = new Subscription();

  constructor(private productService: ProductService, public dialog: MatDialog, private sharedService: ServiceService, private tostr: ToastrService) {
    this.subscription.add(
      this.sharedService.getDetailsComponent().subscribe((result: product) => {
        if (result._id) {
          this.getProductDetail(result._id);
        }
      })
    );
    this.subscription.add(
      this.sharedService.getEnableDisableForm().subscribe(result => {
        if (result) {
          this.cancel(false);
          this.productForm.enable();
          this.productFormActive = true;
        } else {
          this.productForm.disable();
          this.productFormActive = false;
        }
      })
    );
  }

  ngOnInit() {
    this.validateProductForm();
    this.productForm.disable();
    this.productFormActive = false;
  }

  getProductDetail(productId: string) {
    this.subscription.add(
      this.productService.getProductDetail(productId).subscribe(result => {
        this.product = { ...result };
        this.productForm.patchValue({
          name: this.product.name,
          mrp: this.product.mrp,
          price: this.product.price,
          description: this.product.description
        });
        this.sharedService.markFormGroupTouched(this.productForm);
        this.productFormActive = true;
        this.productForm.enable();
        this.distributorInitialValue = [...this.product.distributor];
        this.attributeInitialValue = [...this.product.attribute];
        this.ratingStars = [...this.sharedService.getRatingsArray(this.product.averageRating)];
      })
    )
  }

  uploadImage(e) {
    if (e.target.files.length > 0) {
      if (e.target.files.item(0).name.match(/\.(jpg|jpeg|png|gif)$/)) {
        const formData = new FormData();
        formData.append("image", e.target.files.item(0), e.target.files.item(0).name);
        this.subscription.add(this.productService.uploadImage(formData).subscribe(event => {
          if (event.type === HttpEventType.Response) {
            this.product.image = event.body.imageUrl;
          }
        }, err => {
          this.tostr.error('', err);
        }));
      }
    }
  }

  validateProductForm() {
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern(".*\\S.*")]),
      price: new FormControl('', [Validators.required, this.sharedService.range(0, 10000000000)]),
      mrp: new FormControl('', [Validators.required, this.sharedService.range(0, 10000000000)]),
      description: new FormControl(''),
      image: new FormControl('')
    }, this.sharedService.match_MRP)
  }

  receiveAttributes(attributes: FormArray) {
    this.attributeFormArray = attributes;
    this.product.attribute = [...attributes.value];
  }

  receiveDistributors(distributor: FormArray) {
    this.distributorFormArray = distributor;
    this.product.distributor = [...distributor.value];
  }

  resetDistributorForm() {
    if (this.product.distributor) {
      this.distributorInitialValue = [...this.product.distributor];
    }
  }

  getproductObject(): product {
    return {
      name: this.productForm.value.name,
      price: this.productForm.value.price,
      mrp: this.productForm.value.mrp,
      image: this.product.image ? this.product.image : '',
      description: this.productForm.value.description,
      attribute: this.product.attribute ? this.product.attribute : new Array<attribute>(),
      rating: this.product.rating ? this.product.rating : new Array<userRating>(),
      distributor: this.product.distributor ? this.product.distributor : new Array<productDistributor>(),
    }
  }

  addProduct() {
    if (this.productForm.invalid) {
      this.sharedService.markFormGroupTouched(this.productForm);
    } else {
      let apiRequest: product = this.getproductObject();
      this.subscription.add(
        this.productService.addProduct(apiRequest).subscribe((results: product) => {
          this.cancel(true);
          this.sharedService.snackBarMethod('Product added successfully.');
        }, err => {
          this.tostr.error('', err);
        })
      )
    }
  }

  updateProduct() {
    let apiRequest: product = this.getproductObject();
    apiRequest._id = this.product._id;
    this.subscription.add(
      this.productService.updateProduct(apiRequest).subscribe((results: product) => {
        this.cancel(true);
        this.sharedService.snackBarMethod('Product updated successfully.');
      }, err => {
        this.tostr.error('', err);
      })
    )
  }

  alert(): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      data: { alertType: 'delete', name: this.product.name }
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.deleteProduct();
        }
      })
    );
  }

  deleteProduct() {
    this.subscription.add(
      this.productService.deleteProduct(this.product._id).subscribe((results: product) => {
        this.cancel(true);
        this.sharedService.snackBarMethod('Product deleted successfully.');
      }, err => {
        this.tostr.error('', err);
      })
    )
  }

  cancel(callApi: boolean) {
    this.product = new product();
    this.distributorInitialValue = new Array<productDistributor>();
    this.distributorFormArray = null;
    this.attributeInitialValue = new Array<attribute>();
    this.attributeFormArray = null;
    this.sharedService.setDetailsComponent(this.product);
    this.sharedService.setListRefresh(callApi);
    this.productForm.reset();
    this.sharedService.setEnableDisableForm(false);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
