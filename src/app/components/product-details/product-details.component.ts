import { Component, OnInit } from '@angular/core';
import { product, ImageFile, attribute, userRating, productDistributor } from 'src/app/shared/models/model';
import { ProductService } from '../product/product.service';
import { ServiceService } from 'src/app/shared/services/service.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';
import { HttpEventType } from '@angular/common/http';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: product = new product();
  productForm: FormGroup;
  imageData: ImageFile;
  getDistributorApiLoaded: boolean = false;
  distributorFormArray: FormArray;
  attributeFormArray: FormArray;
  distributorInitialValue: productDistributor[] = new Array<productDistributor>();
  attributeInitialValue: attribute[] = new Array<attribute>();
  ratingStars: number[] = [0, 0, 0, 0, 0];
  productFormActive: boolean;

  constructor(private productService: ProductService, public dialog: MatDialog, private sharedService: ServiceService, private tostr: ToastrService) {
    this.sharedService.getProductDetailsComponent().subscribe((result: product) => {
      if (result._id) {
        this.getProductDetail(result._id);
      }
    });
    this.sharedService.getEnableDisableForm().subscribe(result => {
      if (result) {
        this.cancel(false);
        this.productForm.enable();
        this.productFormActive = true;
      } else {
        this.productForm.disable();
        this.productFormActive = false;
      }
    });
  }

  ngOnInit() {
    this.validateProductForm();
    this.productForm.disable();
    this.productFormActive = false;
  }

  getProductDetail(productId: string) {
    this.productService.getProductDetail(productId).subscribe(result => {
      this.product = { ...result };
      this.productForm.patchValue({
        name: this.product.name,
        mrp: this.product.mrp,
        price: this.product.price,
        description: this.product.description
      });
      this.sharedService.markFormGroupTouched(this.productForm);
      this.productForm.enable();
      this.distributorInitialValue = [...this.product.distributor];
      this.attributeInitialValue = [...this.product.attribute];
      this.ratingStars = [...this.sharedService.getRatingsArray(this.sharedService.calculateAverageRating(this.product.rating))];
    })
  }

  uploadImage(e) {
    if (e.target.files.length > 0) {
      if (e.target.files.item(0).name.match(/\.(jpg|jpeg|png|gif)$/)) {
        this.imageData = { file: e.target.files.item(0), uploadProgress: "0" };
        const formData = new FormData();
        formData.append("image", this.imageData.file, this.imageData.file.name);
        return this.productService.uploadImage(formData)
          .subscribe(event => {
            if (event.type === HttpEventType.Response) {
              this.product.image = event.body.imageUrl;
            }
          });
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
      this.productService.addProduct(apiRequest).subscribe((results: product) => {
        this.cancel(true);
        this.sharedService.snackBarMethod('Product added successfully.');
      }, err => {
        this.tostr.error('', err);
      })
    }
  }

  updateProduct() {
    let apiRequest: product = this.getproductObject();
    apiRequest._id = this.product._id;
    this.productService.updateProduct(apiRequest).subscribe((results: product) => {
      this.cancel(true);
      this.sharedService.snackBarMethod('Product updated successfully.');
    }, err => {
      this.tostr.error('', err);
    })
  }

  alert(): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      data: { alertType: 'delete', name: this.product.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProduct();
      }
    });
  }

  deleteProduct() {
    this.productService.deleteProduct(this.product._id).subscribe((results: product) => {
      this.cancel(true);
      this.sharedService.snackBarMethod('Product deleted successfully.');
    }, err => {
      this.tostr.error('', err);
    })
  }

  cancel(callApi: boolean) {
    this.product = new product();
    this.distributorInitialValue = new Array<productDistributor>();
    this.distributorFormArray = null;
    this.attributeInitialValue = new Array<attribute>();
    this.attributeFormArray = null;
    this.sharedService.setProductDetailsComponent(this.product);
    this.sharedService.setProductListRefresh(callApi);
    this.productForm.reset();
    this.sharedService.setEnableDisableForm(false);
  }
}
