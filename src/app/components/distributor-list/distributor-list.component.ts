import { Component, OnInit, OnDestroy } from '@angular/core';
import { DistributorService } from '../distributor/distributor.service';
import { distributor } from 'src/app/shared/models/model';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/services/service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-distributor-list',
  templateUrl: './distributor-list.component.html',
  styleUrls: ['./distributor-list.component.css']
})
export class DistributorListComponent implements OnInit, OnDestroy {
  distributorsList: distributor[] = new Array<distributor>();
  selectedDistributor: number;
  private subscription: Subscription = new Subscription();

  constructor(private distributorService: DistributorService, private tostr: ToastrService, private sharedService: ServiceService) {
    this.subscription.add(
      this.sharedService.getListRefresh().subscribe((result: boolean) => {
        this.selectedDistributor = null;
        if (result == true) {
          this.getDistributorList();
        }
      })
    )
  }

  ngOnInit() {
    this.getDistributorList();
  }

  addDistributor() {
    this.sharedService.setEnableDisableForm(true);
  }

  getDistributorList() {
    this.subscription.add(
      this.distributorService.getDistributorList().subscribe((results: distributor[]) => {
        this.distributorsList = [...results];
        this.distributorsList.reverse();
      }, err => {
        this.tostr.error('', err);
      })
    )
  }

  selectDistributor(index: number) {
    this.selectedDistributor = index;
    this.sharedService.setDetailsComponent(this.distributorsList[index]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
