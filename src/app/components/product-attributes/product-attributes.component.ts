import { Component, Input, Output, EventEmitter, OnChanges, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, AbstractControl, FormControl, Validators } from '@angular/forms';
import { attribute } from 'src/app/shared/models/model';
import { ServiceService } from 'src/app/shared/services/service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-attributes',
  templateUrl: './product-attributes.component.html',
  styleUrls: ['./product-attributes.component.css']
})
export class ProductAttributesComponent implements OnChanges, OnDestroy {
  attributesForm: FormGroup;
  @Input() attributes: attribute[];
  @Output() attributesEvent = new EventEmitter<FormArray>();
  showAddButton: boolean;
  private subscription: Subscription = new Subscription();

  constructor(private formBuilder: FormBuilder, private sharedService: ServiceService) {
    this.attributeFormValidation();
    this.subscription.add(
      this.sharedService.getEnableDisableForm().subscribe(result => {
        if (result) {
          this.showAddButton = true;
        } else {
          this.showAddButton = false;
        }
      })
    );
  }

  attributeFormValidation() {
    this.attributesForm = this.formBuilder.group({
      attribute: this.formBuilder.array(new Array<attribute>())
    });
  }

  ngOnChanges() {
    if (this.attributes) {
      this.setAttributes(this.attributes);
      this.attributeEvent();
    } else {
      this.sharedService.markFormGroupTouched(this.getAttribute());
    }
  }

  createAttribute(attribute: attribute): FormGroup {
    return this.formBuilder.group({
      attributeKey: new FormControl(attribute.attributeKey, [Validators.required, Validators.pattern(".*\\S.*")]),
      attributeValue: new FormControl(attribute.attributeValue, [Validators.required, Validators.pattern(".*\\S.*")])
    });
  }

  getAttribute(): FormArray {
    return this.attributesForm.get('attribute') as FormArray;
  }

  addAttribute() {
    let initialData = {
      attributeKey: '',
      attributeValue: ''
    }
    this.getAttribute().push(this.createAttribute(initialData));
  }

  deleteAttribute(index: number) {
    this.getAttribute().removeAt(index);
    this.attributeEvent();
  }

  resetAttribute() {
    while (this.getAttribute().length !== 0) {
      this.getAttribute().removeAt(0)
    }
  }

  setAttributes(attributeData: attribute[]) {
    if (attributeData.length) {
      const resEntries = attributeData.map(e => this.createAttribute(e));
      this.attributesForm.setControl('attribute', this.formBuilder.array(resEntries));
      this.sharedService.markFormGroupTouched(this.getAttribute());
    } else {
      this.resetAttribute();
    }
  }

  attributeEvent() {
    this.attributesEvent.emit(this.getAttribute());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
