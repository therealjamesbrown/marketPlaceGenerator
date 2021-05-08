/**
 * 
 * ================================
 * ; Title: viewTransactionDialog.component.ts
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Modified by: James Brown
 * ; Date: 10/14/2020
 * ; Description: component responsible for viewing a sepcific transaction
 * ================================
 * 
 */

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-viewtransactiondialog',
  templateUrl: './viewtransactiondialog.component.html',
  styleUrls: ['./viewtransactiondialog.component.css']
})
export class ViewtransactiondialogComponent implements OnInit {

//variable declaration
transaction;
laborAmount;
lineItem;
lineItems;
lineItemTotal;
orderDate;
partsAmount;
grandTotal;
discount;
subtotal;

  constructor(
    private dialogRef: MatDialogRef<ViewtransactiondialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
    ) {

      
      this.transaction = data;
      this.laborAmount = data.laborAmount;
      this.lineItem = data.lineItem;
      this.lineItemTotal = data.lineItemTotal;
      this.orderDate = data.orderDate;
      this.partsAmount = data.partsAmount;
      this.grandTotal = data.total;
      

      this.subtotal = this.laborAmount + this.lineItemTotal + this.partsAmount;
      this.discount = this.subtotal * .10;
      for(let item of this.lineItem){
        //console.log(item.title);
      }
     }

     

  ngOnInit(): void {
  }

}
