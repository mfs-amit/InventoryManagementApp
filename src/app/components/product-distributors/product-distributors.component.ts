import { Component, OnChanges, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { distributor, productDistributor } from 'src/app/shared/models/model';
import { DistributorService } from '../distributor/distributor.service';

@Component({
  selector: 'app-product-distributors',
  templateUrl: './product-distributors.component.html',
  styleUrls: ['./product-distributors.component.css']
})
export class ProductDistributorsComponent implements OnInit, OnChanges {
  distributorForm: FormGroup;
  @Input() distributors: productDistributor[];
  @Output() distributorsEvent = new EventEmitter<productDistributor[]>();
  distributorsList: distributor[] = new Array<distributor>();

  constructor(private formBuilder: FormBuilder, private distributorService: DistributorService) {
    this.distributorFormValidation();
  }

  ngOnInit() {
    this.getDistributorsList();
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

  ngOnChanges() {
    if (this.distributors) {
      this.setDistributor(this.distributors);
    } else {
      this.resetDistributor();
    }
  }

  createDistributor(attribute: productDistributor): FormGroup {
    return this.formBuilder.group({
      distributorName: attribute.distributorName,
      distributorPrice: attribute.distributorPrice
    });
  }

  getDistributor(): FormArray {
    return this.distributorForm.get('distributor') as FormArray;
  }

  addDistributor() {
    let initialData = {
      distributorName: '',
      distributorPrice: ''
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

  setDistributor(attributeData: productDistributor[]) {
    this.resetDistributor();
    if (attributeData.length) {
      const resEntries = attributeData.map(e => this.createDistributor(e));
      this.distributorForm.setControl('distributor', this.formBuilder.array(resEntries));
    }
  }

  distributorEvent() {
    this.distributorsEvent.emit(this.distributorForm.value.distributor);
  }

  check(e) {
    console.log(e)
  }

}
