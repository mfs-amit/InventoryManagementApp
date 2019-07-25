import { Component, OnInit } from '@angular/core';
import { distributor, ImageFile, addDistributorApiRequest } from 'src/app/shared/models/model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DistributorService } from '../distributor/distributor.service';
import { MatDialog } from '@angular/material';
import { ServiceService } from 'src/app/shared/services/service.service';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../product/product.service';
import { HttpEventType } from '@angular/common/http';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-distributor-details',
  templateUrl: './distributor-details.component.html',
  styleUrls: ['./distributor-details.component.css']
})
export class DistributorDetailsComponent implements OnInit {
  distributor: distributor = new distributor();
  distributorForm: FormGroup;
  imageData: ImageFile;
  imageSrc: string;

  constructor(private distributorService: DistributorService, private uploadService: ProductService, public dialog: MatDialog, private sharedService: ServiceService, private tostr: ToastrService) {
    this.sharedService.getDistributorDetailsComponent().subscribe((result: distributor) => {
      if (result) {
        this.distributor = { ...result };
        this.distributorForm.patchValue({
          name: this.distributor.name,
          email: this.distributor.email,
          address: this.distributor.address,
          phone: this.distributor.phone
        });
        this.sharedService.markFormGroupTouched(this.distributorForm);
        this.imageSrc = this.distributor.image;
      }
    })
  }

  ngOnInit() {
    this.validateDistributorForm();
  }

  uploadImage(e) {
    if (e.target.files.length > 0) {
      if (e.target.files.item(0).name.match(/\.(jpg|jpeg|png|gif)$/)) {
        this.imageData = { file: e.target.files.item(0), uploadProgress: "0" };
        const formData = new FormData();
        formData.append("image", this.imageData.file, this.imageData.file.name);
        return this.uploadService.uploadImage(formData)
          .subscribe(event => {
            if (event.type === HttpEventType.Response) {
              this.imageSrc = event.body.imageUrl;
            }
          });
      }
    }
  }

  validateDistributorForm() {
    this.distributorForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern(".*\\S.*")]),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', [Validators.required, Validators.pattern(".*\\S.*")]),
      phone: new FormControl('', [Validators.required, Validators.pattern("[0-9]{6,11}")])
    })
  }

  addDistributor() {
    if (this.distributorForm.invalid) {
      this.sharedService.markFormGroupTouched(this.distributorForm);
    } else {
      let apiRequest: addDistributorApiRequest = {
        name: this.distributorForm.value.name,
        email: this.distributorForm.value.email,
        phone: this.distributorForm.value.phone,
        address: this.distributorForm.value.address,
        image: this.imageSrc
      }
      this.distributorService.addDistributor(apiRequest).subscribe((results: distributor) => {
        this.cancel(true);
        this.sharedService.snackBarMethod('Distributor added successfully.');
      }, err => {
        this.tostr.error('', err);
      })
    }
  }

  updateDistributor() {
    let apiRequest: distributor = {
      name: this.distributorForm.value.name,
      email: this.distributorForm.value.email,
      phone: this.distributorForm.value.phone,
      _id: this.distributor._id,
      address: this.distributorForm.value.address,
      image: this.imageSrc
    }
    this.distributorService.updateDistributor(apiRequest).subscribe((results: distributor) => {
      this.cancel(true);
      this.sharedService.snackBarMethod('Distributor updated successfully.');
    }, err => {
      this.tostr.error('', err);
    })
  }

  alert(): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      data: this.distributor.name
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteDistributor();
      }
    });
  }

  deleteDistributor() {
    this.distributorService.deleteDistributor(this.distributor._id).subscribe((results: distributor) => {
      this.cancel(true);
      this.sharedService.snackBarMethod('Distributor deleted successfully.');
    }, err => {
      this.tostr.error('', err);
    })
  }

  cancel(callApi: boolean) {
    this.distributor = new distributor();
    this.sharedService.setDistributorDetailsComponent(this.distributor);
    this.sharedService.setDistributorListRefresh(callApi);
    this.distributorForm.reset();
  }

}
