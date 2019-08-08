import { Component, OnInit, Input } from '@angular/core';
import { productDistributor } from 'src/app/shared/models/model';

@Component({
  selector: 'app-user-product-distributors',
  templateUrl: './user-product-distributors.component.html',
  styleUrls: ['./user-product-distributors.component.css']
})
export class UserProductDistributorsComponent implements OnInit {
  @Input() distributors: productDistributor[] = new Array<productDistributor>();

  constructor() { }

  ngOnInit() {
  }

}
