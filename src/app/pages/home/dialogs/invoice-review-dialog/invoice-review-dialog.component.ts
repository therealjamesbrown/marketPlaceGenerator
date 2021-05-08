import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-invoice-review-dialog',
  templateUrl: './invoice-review-dialog.component.html',
  styleUrls: ['./invoice-review-dialog.component.css']
})
export class InvoiceReviewDialogComponent implements OnInit {
invoice: any;  
discount: any;

  constructor(
    private dialogRef: MatDialogRef<InvoiceReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) { 
      this.invoice = data.invoice;
      this.discount = data.discount;
      console.log(this.discount);
        }

  ngOnInit(): void {
  }

}
