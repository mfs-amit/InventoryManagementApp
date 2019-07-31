import { Component, OnInit, OnDestroy } from '@angular/core';
import { distributor, ImageFile } from 'src/app/shared/models/model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DistributorService } from '../distributor/distributor.service';
import { MatDialog } from '@angular/material';
import { ServiceService } from 'src/app/shared/services/service.service';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../product/product.service';
import { HttpEventType } from '@angular/common/http';
import { AlertComponent } from '../alert/alert.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-distributor-details',
  templateUrl: './distributor-details.component.html',
  styleUrls: ['./distributor-details.component.css']
})
export class DistributorDetailsComponent implements OnInit, OnDestroy {
  distributor: distributor = new distributor();
  distributorForm: FormGroup;
  imageData: ImageFile;
  distributorFormActive: boolean;
  private subscription: Subscription = new Subscription();

  constructor(private distributorService: DistributorService, private uploadService: ProductService, public dialog: MatDialog, private sharedService: ServiceService, private tostr: ToastrService) {
    this.subscription.add(this.sharedService.getDistributorDetailsComponent().subscribe((result: distributor) => {
      if (result) {
        this.distributor = { ...result };
        this.distributorForm.patchValue({
          name: this.distributor.name,
          email: this.distributor.email,
          address: this.distributor.address,
          phone: this.distributor.phone
        });
        this.sharedService.markFormGroupTouched(this.distributorForm);
        this.distributorForm.enable();
      }
    }));
    this.subscription.add(this.sharedService.getEnableDisableForm().subscribe(result => {
      if (result) {
        this.cancel(false);
        this.distributorForm.enable();
        this.distributorFormActive = true;
      }
    }));
  }

  ngOnInit() {
    this.validateDistributorForm();
    this.distributorForm.disable();
    this.distributorFormActive = false;
  }

  uploadImage(e) {
    if (e.target.files.length > 0) {
      if (e.target.files.item(0).name.match(/\.(jpg|jpeg|png|gif)$/)) {
        this.imageData = { file: e.target.files.item(0), uploadProgress: "0" };
        const formData = new FormData();
        formData.append("image", this.imageData.file, this.imageData.file.name);
        this.subscription.add(this.uploadService.uploadImage(formData).subscribe(event => {
          if (event.type === HttpEventType.Response) {
            this.distributor.image = event.body.imageUrl;
          }
        })
        );
      }
    }
  }

  validateDistributorForm() {
    this.distributorForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern(".*\\S.*")]),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', [Validators.required, Validators.pattern(".*\\S.*")]),
      phone: new FormControl('', [Validators.required, Validators.pattern("[0-9]{6,11}")]),
      image: new FormControl('')
    })
  }

  getDistributorObject(): distributor {
    return {
      name: this.distributorForm.value.name,
      email: this.distributorForm.value.email,
      phone: this.distributorForm.value.phone,
      address: this.distributorForm.value.address,
      image: this.distributor.image
    }
  }

  addDistributor() {
    if (this.distributorForm.invalid) {
      this.sharedService.markFormGroupTouched(this.distributorForm);
    } else {
      let apiRequest: distributor = this.getDistributorObject();
      this.subscription.add(
        this.distributorService.addDistributor(apiRequest).subscribe((results: distributor) => {
          this.cancel(true);
          this.sharedService.snackBarMethod('Distributor added successfully.');
        }, err => {
          this.tostr.error('', err);
        })
      )
    }
  }

  updateDistributor() {
    let apiRequest: distributor = this.getDistributorObject();
    apiRequest._id = this.distributor._id;
    this.subscription.add(
      this.distributorService.updateDistributor(apiRequest).subscribe((results: distributor) => {
        this.cancel(true);
        this.sharedService.snackBarMethod('Distributor updated successfully.');
      }, err => {
        this.tostr.error('', err);
      })
    )
  }

  alert(): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      data: { alertType: 'delete', name: this.distributor.name }
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.deleteDistributor();
        }
      })
    )
  }

  deleteDistributor() {
    this.subscription.add(
      this.distributorService.deleteDistributor(this.distributor._id).subscribe((results: distributor) => {
        this.cancel(true);
        this.sharedService.snackBarMethod('Distributor deleted successfully.');
      }, err => {
        this.tostr.error('', err);
      })
    )
  }

  cancel(callApi: boolean) {
    this.distributor = new distributor();
    this.sharedService.setDistributorDetailsComponent(this.distributor);
    this.sharedService.setDistributorListRefresh(callApi);
    this.distributorForm.reset();
    this.distributorForm.disable();
    this.distributorFormActive = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}