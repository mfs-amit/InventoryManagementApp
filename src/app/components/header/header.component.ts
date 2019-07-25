import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName: string;
  userType: string;
  pageUrl: string;

  constructor(private router: Router, private toastr: ToastrService) { 
    router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        this.pageUrl = event.url;
      }
    });
  }

  ngOnInit() {
    this.userName = localStorage.getItem("username");
    this.userType = localStorage.getItem("userType");
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
    this.toastr.success('', 'Logged out Successfully');
  }

}
