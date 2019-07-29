import { Component, OnInit } from '@angular/core';
import { DistributorService } from '../distributor/distributor.service';
import { distributor } from 'src/app/shared/models/model';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/services/service.service';

@Component({
  selector: 'app-distributor-list',
  templateUrl: './distributor-list.component.html',
  styleUrls: ['./distributor-list.component.css']
})
export class DistributorListComponent implements OnInit {
  distributorsList: any[] = new Array();
  selectedDistributor: number;

  constructor(private distributorService: DistributorService, private tostr: ToastrService, private sharedService: ServiceService) {
    this.sharedService.getDistributorListRefresh().subscribe((result: boolean) => {
      this.selectedDistributor = null;
      if (result == true) {
        this.getDistributorList();
      }
    })
  }

  ngOnInit() {
    this.getDistributorList();
  }

  addDistributor() {
    this.sharedService.setEnableDisableForm(true);
  }

  getDistributorList() {
    this.distributorService.getDistributorList().subscribe((results: distributor[]) => {
      this.distributorsList = [...results];
      this.distributorsList.reverse();
    }, err => {
      this.tostr.error('', err);
    })
  }

  selectDistributor(index: number) {
    this.selectedDistributor = index;
    this.sharedService.setDistributorDetailsComponent(this.distributorsList[index]);
  }

}
