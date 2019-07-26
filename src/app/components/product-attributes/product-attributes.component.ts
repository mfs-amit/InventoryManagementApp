import { Component, Input, Output, EventEmitter, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, AbstractControl } from '@angular/forms';
import { attribute } from 'src/app/shared/models/model';

@Component({
  selector: 'app-product-attributes',
  templateUrl: './product-attributes.component.html',
  styleUrls: ['./product-attributes.component.css']
})
export class ProductAttributesComponent implements OnChanges {
  attributesForm: FormGroup;
  @Input() attributes: attribute[];
  @Output() attributesEvent = new EventEmitter<attribute[]>();
  changeDetection: ChangeDetectionStrategy.OnPush


  constructor(private formBuilder: FormBuilder) {
    this.attributeFormValidation();
  }

  attributeFormValidation() {
    this.attributesForm = this.formBuilder.group({
      attribute: this.formBuilder.array(new Array<attribute>())
    });
  }

  ngOnChanges() {
    if (this.attributes) {
      this.setAttributes(this.attributes);
      // this.getAttribute().markAsTouched();
      this.attributeEvent();
    } else {
      this.resetAttribute();
    }
  }

  createAttribute(attribute: attribute): FormGroup {
    return this.formBuilder.group({
      attributeKey: attribute.attributeKey,
      attributeValue: attribute.attributeValue
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
    // this.resetAttribute();
    console.log(attributeData)
    if (attributeData.length) {
      const resEntries = attributeData.map(e => this.createAttribute(e));
      this.attributesForm.setControl('attribute', this.formBuilder.array(resEntries));
    }
  }

  attributeEvent() {
    this.attributesEvent.emit(this.attributesForm.value.attribute);
  }
}
