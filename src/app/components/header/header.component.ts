import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';
import { AlertComponent } from '../alert/alert.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userName: string;
  userType: string;
  pageUrl: string;
  private subscription: Subscription = new Subscription();

  constructor(private router: Router, private toastr: ToastrService, public dialog: MatDialog) {
    this.subscription.add(
      router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.pageUrl = event.url;
        }
      })
    );
  }

  ngOnInit() {
    this.userName = localStorage.getItem("username");
    this.userType = localStorage.getItem("userType");
  }

  alert(): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      data: { alertType: 'logout', name: '' }
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.logout();
        }
      })
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
    this.toastr.success('', 'Logged out Successfully');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
