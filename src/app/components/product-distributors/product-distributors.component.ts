import { Component, OnChanges, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { distributor, productDistributor } from 'src/app/shared/models/model';
import { DistributorService } from '../distributor/distributor.service';
import { ServiceService } from 'src/app/shared/services/service.service';

@Component({
  selector: 'app-product-distributors',
  templateUrl: './product-distributors.component.html',
  styleUrls: ['./product-distributors.component.css']
})
export class ProductDistributorsComponent implements OnInit, OnChanges {
  distributorForm: FormGroup;
  @Input() distributors: productDistributor[];
  @Input() mrp: number = 0;
  @Input() basePrice: number = 0;
  @Output() distributorsEvent = new EventEmitter<FormArray>();
  distributorsList: distributor[] = new Array<distributor>();
  showAddButton: boolean;

  constructor(private formBuilder: FormBuilder, private distributorService: DistributorService, private sharedService: ServiceService) {
    this.distributorFormValidation();
    this.sharedService.getEnableDisableForm().subscribe(result => {
      if (result) {
        this.showAddButton = true;
      } else {
        this.showAddButton = false;
      }
    });
  }

  ngOnInit() {
    this.getDistributorsList();
  }

  ngOnChanges(changes) {
    if ('distributors' in changes && this.distributors) {
      this.setDistributor(this.distributors);
      this.distributorEvent();
    } else {
      this.sharedService.markFormGroupTouched(this.getDistributor());
    }
  }

  getDistributorsList() {
    this.distributorService.getDistributorList().subscribe(result => {
      this.distributorsList = [...result];
    })
  }

  distributorFormValidation() {
    this.distributorForm = this.formBuilder.group({
      distributor: this.formBuilder.array(new Array<productDistributor>())
    });
  }

  createDistributor(distributor: productDistributor): FormGroup {
    return this.formBuilder.group({
      distributorName: new FormControl(distributor.distributorName, [Validators.required]),
      distributorPrice: new FormControl(distributor.distributorPrice, [Validators.required, this.sharedService.priceRange(this.basePrice, this.mrp)])
    });
  }

  getDistributor(): FormArray {
    return this.distributorForm.get('distributor') as FormArray;
  }

  addDistributor() {
    let initialData = {
      distributorName: null,
      distributorPrice: null
    }
    this.getDistributor().push(this.createDistributor(initialData));
  }

  deleteDistributor(index: number) {
    this.getDistributor().removeAt(index);
    this.distributorEvent();
  }

  resetDistributor() {
    while (this.getDistributor().length !== 0) {
      this.getDistributor().removeAt(0)
    }
  }

  setDistributor(distributorData: productDistributor[]) {
    if (distributorData.length) {
      const resEntries = distributorData.map(e => this.createDistributor(e));
      this.distributorForm.setControl('distributor', this.formBuilder.array(resEntries));
      this.sharedService.markFormGroupTouched(this.getDistributor());
    } else {
      this.resetDistributor();
    }
  }

  distributorEvent() {
    this.distributorsEvent.emit(this.getDistributor());
  }

}
