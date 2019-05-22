import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { loginApiRequest, loginApiResponse } from 'src/app/shared/models/model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loggedInData: loginApiResponse = new loginApiResponse();
  showLoadding: boolean = false;
  loggedInFailed: boolean = false;

  constructor(private router: Router, private loginService: LoginService, private toastr: ToastrService) { }

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
      this.markFormGroupTouched(this.loginForm);
    } else {
      this.showLoadding = true;
      let apiRequest: loginApiRequest;
      apiRequest = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      }
      this.loginService.login(apiRequest).subscribe((result: loginApiResponse) => {
        this.showLoadding = false;
        this.loggedInData = { ...result };
        localStorage.setItem('LoggedInData', JSON.stringify(this.loggedInData));
        this.router.navigate(['/product']);
        this.toastr.success('', 'Logged In Successfully');
      }, error => {
        this.showLoadding = false;
        this.loggedInFailed = true;
      });
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

}
