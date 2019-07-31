import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { loginApiRequest, loginApiResponse } from 'src/app/shared/models/model';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/services/service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loggedInData: loginApiResponse = new loginApiResponse();
  showLoadding: boolean = false;
  loggedInFailed: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(private sharedService: ServiceService, private router: Router, private loginService: LoginService, private toastr: ToastrService) { }

  ngOnInit() {
    this.validateLoginForm();
  }

  validateLoginForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern(/^\S*$/)]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^\S*$/)])
    })
  }

  login() {
    if (this.loginForm.invalid) {
      this.sharedService.markFormGroupTouched(this.loginForm);
    } else {
      this.showLoadding = true;
      let apiRequest: loginApiRequest;
      apiRequest = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      }
      this.subscription.add(
        this.loginService.login(apiRequest).subscribe((result: loginApiResponse) => {
          this.showLoadding = false;
          this.loggedInData = { ...result };
          localStorage.setItem('token', this.loggedInData.token);
          localStorage.setItem('username', this.loggedInData.username);
          localStorage.setItem('userType', this.loggedInData.userType);
          localStorage.setItem('userId', this.loggedInData._id);
          if (localStorage.getItem('userType') == 'admin') {
            this.router.navigate(['/product']);
          } else {
            this.router.navigate(['/products']);
          }
          this.toastr.success('', 'Logged In Successfully');
        }, error => {
          this.showLoadding = false;
          this.loggedInFailed = true;
        })
      )
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
