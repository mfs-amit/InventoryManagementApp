import { Component, OnInit } from '@angular/core';
import { product, addProductApiRequest, ImageFile, distributor, attribute, userRating, productDistributor } from 'src/app/shared/models/model';
import { ProductService } from '../product/product.service';
import { ServiceService } from 'src/app/shared/services/service.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';
import { HttpEventType } from '@angular/common/http';
import { AlertComponent } from '../alert/alert.component';
import { DistributorService } from '../distributor/distributor.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: product = new product();
  productForm: FormGroup;
  imageData: ImageFile;
  imageSrc: string;
  getDistributorApiLoaded: boolean = false;
  distributorFormArray: FormArray;
  attributeFormArray: FormArray;
  distributorInitialValue: productDistributor[] = new Array<productDistributor>();
  attributeInitialValue: attribute[] = new Array<attribute>();

  constructor(private productService: ProductService, private distributorService: DistributorService, public dialog: MatDialog, private sharedService: ServiceService, private tostr: ToastrService) {
    this.sharedService.getProductDetailsComponent().subscribe((result: product) => {
      if (result) {
        this.product = { ...result };
        this.productForm.patchValue({
          name: this.product.name,
          mrp: this.product.mrp,
          price: this.product.price,
          description: this.product.description
        });
        this.sharedService.markFormGroupTouched(this.productForm);
        this.imageSrc = this.product.image;
        this.distributorInitialValue = [...this.product.distributor];
        this.attributeInitialValue = [...this.product.attribute];
      }
    })
  }

  ngOnInit() {
    this.validateProductForm();
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
              this.imageSrc = event.body.imageUrl;
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
      description: new FormControl('')
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

  addProduct() {
    if (this.productForm.invalid) {
      this.sharedService.markFormGroupTouched(this.productForm);
    } else {
      let apiRequest: addProductApiRequest = {
        name: this.productForm.value.name,
        price: this.productForm.value.price,
        mrp: this.productForm.value.mrp,
        image: this.imageSrc ? this.imageSrc : '',
        description: this.productForm.value.description,
        attribute: this.product.attribute ? this.product.attribute : new Array<attribute>(),
        rating: new Array<userRating>(),
        distributor: this.product.distributor ? this.product.distributor : new Array<productDistributor>(),
      }
      this.productService.addProduct(apiRequest).subscribe((results: product) => {
        this.cancel(true);
        this.sharedService.snackBarMethod('Product added successfully.');
      }, err => {
        this.tostr.error('', err);
      })
    }
  }

  updateProduct() {
    let apiRequest: product = {
      name: this.productForm.value.name,
      price: this.productForm.value.price,
      _id: this.product._id,
      mrp: this.productForm.value.mrp,
      image: this.imageSrc ? this.imageSrc : '',
      description: this.productForm.value.description,
      attribute: this.product.attribute ? this.product.attribute : [],
      rating: this.product.rating,
      distributor: this.product.distributor
    }
    this.productService.updateProduct(apiRequest).subscribe((results: product) => {
      this.cancel(true);
      this.sharedService.snackBarMethod('Product updated successfully.');
    }, err => {
      this.tostr.error('', err);
    })
  }

  alert(): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      data: this.product.name
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
    this.imageSrc = null;
    this.distributorInitialValue = new Array<productDistributor>();
    this.distributorFormArray = null;
    this.attributeInitialValue = new Array<attribute>();
    this.attributeFormArray = null;
    this.sharedService.setProductDetailsComponent(this.product);
    this.sharedService.setProductListRefresh(callApi);
    this.productForm.reset();
  }
}
