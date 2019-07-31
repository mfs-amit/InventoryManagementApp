import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName: string;
  userType: string;
  pageUrl: string;

  constructor(private router: Router, private toastr: ToastrService, public dialog: MatDialog) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.pageUrl = event.url;
      }
    });
  }

  ngOnInit() {
    this.userName = localStorage.getItem("username");
    this.userType = localStorage.getItem("userType");
  }

  alert(): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      data: { alertType: 'logout', name: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.logout();
      }
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
    this.toastr.success('', 'Logged out Successfully');
  }

}
