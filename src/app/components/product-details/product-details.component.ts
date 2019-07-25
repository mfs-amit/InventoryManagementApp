import { Component, OnInit } from '@angular/core';
import { product, addProductApiRequest, ImageFile, distributor } from 'src/app/shared/models/model';
import { ProductService } from '../product/product.service';
import { ServiceService } from 'src/app/shared/services/service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  ratingControl: FormControl = new FormControl();
  distributorsList: distributor[] = new Array<distributor>();
  getDistributorApiLoaded: boolean = false;

  constructor(private productService: ProductService, private distributorService: DistributorService, public dialog: MatDialog, private sharedService: ServiceService, private tostr: ToastrService) {
    this.sharedService.getProductDetailsComponent().subscribe((result: product) => {
      if (result) {
        this.product = { ...result };
        this.productForm.patchValue({
          name: this.product.name,
          quantity: this.product.quantity,
          price: this.product.price,
          description: this.product.description,
          distributor: this.product.distributor
        });
        this.sharedService.markFormGroupTouched(this.productForm);
        this.imageSrc = this.product.image;
      }
    })
  }

  ngOnInit() {
    this.validateProductForm();
    this.getDistributorsList();
  }

  getDistributorsList() {
    this.distributorService.getDistributorList().subscribe(result => {
      this.distributorsList = [...result];
      this.getDistributorApiLoaded = true;
      const ctrl = this.productForm.get('distributor');
      if(this.distributorsList.length) {
        ctrl.enable();
      } else {
        ctrl.disable();
      }
    }, error => {
      this.getDistributorApiLoaded = true;
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
              this.imageSrc = event.body.imageUrl;
            }
          });
      }
    }
  }

  validateProductForm() {
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern(".*\\S.*")]),
      quantity: new FormControl('', [Validators.required, this.sharedService.range(0, 10000000000)]),
      price: new FormControl('', [Validators.required, this.sharedService.range(0, 10000000000)]),
      description: new FormControl(''),
      distributor: new FormControl({ value: '', disabled: true }, [Validators.required])
    })
  }

  receiveRating(rating: FormControl) {
    this.ratingControl = rating;
    this.product.rating = rating.value;
  }

  addProduct() {
    if (this.productForm.invalid) {
      this.sharedService.markFormGroupTouched(this.productForm);
    } else {
      let apiRequest: addProductApiRequest = {
        name: this.productForm.value.name,
        price: this.productForm.value.price,
        rating: this.product.rating,
        quantity: this.productForm.value.quantity,
        image: this.imageSrc,
        description: this.productForm.value.description,
        distributor: this.productForm.value.distributor
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
      rating: this.product.rating,
      _id: this.product._id,
      quantity: this.productForm.value.quantity,
      image: this.imageSrc,
      description: this.productForm.value.description,
      distributor: this.productForm.value.distributor
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
    this.ratingControl = new FormControl();
    this.sharedService.setProductDetailsComponent(this.product);
    this.sharedService.setProductListRefresh(callApi);
    this.productForm.reset();
  }
}
