import { Component } from '@angular/core';
import { ProductService } from './product.service';
import { ServiceService } from 'src/app/shared/services/service.service';
import { product } from 'src/app/shared/models/model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  constructor(private productService: ProductService, private router: Router, private toastr: ToastrService) {
  }

  logout() {
    this.productService.logout().subscribe(result => {
      localStorage.clear();
      this.router.navigate(['/login']);
      this.toastr.success('', 'Logged out Successfully');
    })
  }
}
