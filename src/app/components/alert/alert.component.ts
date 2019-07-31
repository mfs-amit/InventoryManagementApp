import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor(public alertDialog: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public alertData: string) { }

  ngOnInit() {
  }

  deleteDialog(value: boolean) {
    this.alertDialog.close(value);
  }
}
