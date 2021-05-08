/**
 * 
 * ================================
 * ; Title: viewAllTranrsactions.component.ts
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Modified by: James Brown
 * ; Date: 10/14/2020
 * ; Description: component responsible for displaying all transactions (archived and not)
 * ================================
 * 
 */

import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { PurchasehistoryService } from 'src/app/pages/services/purchasehistory.service';
import { ViewtransactiondialogComponent } from '../viewtransactiondialog/viewtransactiondialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-view-all-transactions-dialog',
  templateUrl: './view-all-transactions-dialog.component.html',
  styleUrls: ['./view-all-transactions-dialog.component.css']
})
export class ViewAllTransactionsDialogComponent implements OnInit {
  allPurchaseHistoryDataSource: any;
  displayedColumns: string[] = ['date', 'amount', 'action'];
  //actions: string[] = ['update', 'disable'];
  checked: any = false;
  username: string = this.cookieService.get('sessionuser');

  constructor(
    private cookieService: CookieService,
    private purchaseHistoryService: PurchasehistoryService,
    private dialog: MatDialog
  ) {
    this.purchaseHistoryService.findAllPurchasesByUserName(this.username).subscribe(res => {
      this.allPurchaseHistoryDataSource = res['data'];
      console.log(this.allPurchaseHistoryDataSource);
    }, err => {
      console.log(err);
    })
   }
  ngOnInit(): void {
  }



/*
Function that allows us to view transaction details for one transaction.
*/
viewTransactionDetails(transaction){
  //console.log(transaction);
  const dialogRef = this.dialog.open(ViewtransactiondialogComponent, {
    data: transaction,
    disableClose: true,
    width: '800px'
  })

  dialogRef.afterClosed().subscribe(result => {
   // console.log('closed');
  })
}

}
