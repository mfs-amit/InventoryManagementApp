import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/shared/services/service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { registerApiRequest } from 'src/app/shared/models/model';
import { Subscription } from 'rxjs';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registeredData: any;
  showLoadding: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(private sharedService: ServiceService, private router: Router, private registerService: RegisterService, private toastr: ToastrService) { }

  ngOnInit() {
    this.validateRegisterForm();
  }

  validateRegisterForm() {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern(/^\S*$/)]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^\S*$/)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.pattern(/^\S*$/)])
    }, this.sharedService.matchPassword)
  }

  register() {
    if (this.registerForm.invalid) {
      this.sharedService.markFormGroupTouched(this.registerForm);
    } else {
      this.showLoadding = true;
      let apiRequest: registerApiRequest;
      apiRequest = {
        username: this.registerForm.value.username,
        password: this.registerForm.value.password,
        userType: "user"
      }
      this.subscription.add(
        this.registerService.register(apiRequest).subscribe((result: any) => {
          this.showLoadding = false;
          this.registeredData = { ...result };
          this.router.navigate(['/login']);
          this.toastr.success('', 'Registered Successfully');
        }, error => {
          this.showLoadding = false;
          this.toastr.error('', error);
        })
      )
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
