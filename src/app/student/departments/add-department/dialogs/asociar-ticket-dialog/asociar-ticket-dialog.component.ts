import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-asociar-ticket-dialog',
  templateUrl: './asociar-ticket-dialog.component.html',
  styleUrls: ['./asociar-ticket-dialog.component.sass']
})
export class AsociarTicketDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AsociarTicketDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
  }

}
