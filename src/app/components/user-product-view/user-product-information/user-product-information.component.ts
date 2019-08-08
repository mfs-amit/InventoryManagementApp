import { Component, OnInit, Input } from '@angular/core';
import { attribute } from 'src/app/shared/models/model';

@Component({
  selector: 'app-user-product-information',
  templateUrl: './user-product-information.component.html',
  styleUrls: ['./user-product-information.component.css']
})
export class UserProductInformationComponent implements OnInit {
  @Input() attribute: attribute[] = new Array<attribute>();

  constructor() { }

  ngOnInit() {
  }

}
