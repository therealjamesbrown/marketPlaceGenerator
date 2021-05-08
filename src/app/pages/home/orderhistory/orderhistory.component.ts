/**
 * 
 * ================================
 * ; Title: orderhistory.component.ts
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Modified by: James Brown
 * ; Date: 10/14/2020
 * ; Description: component responsible for purchase history management.
 * ================================
 * 
 */


import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { Invoice } from '../../../shared/invoice.interface';
import { PurchasehistoryService } from '../../services/purchasehistory.service';
import { ViewAllTransactionsDialogComponent } from '../dialogs/orderhistory/view-all-transactions-dialog/view-all-transactions-dialog.component';
import { ViewtransactiondialogComponent } from '../dialogs/orderhistory/viewtransactiondialog/viewtransactiondialog.component';


@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.component.html',
  styleUrls: ['./orderhistory.component.css']
})
export class OrderhistoryComponent implements OnInit {
  purchaseHistoryDataSource: any;
  displayedColumns: string[] = ['date', 'amount', 'action'];
  actions: string[] = ['update', 'disable'];
  checked: any = false;
  username: string = this.cookieService.get('sessionuser');
  nonArchivedPurchaseHistoryDataSource: any;

  constructor(
    private cookieService: CookieService, 
    private purchaseHistoryService: PurchasehistoryService,
    private dialog: MatDialog) {
   
  //populate all the transactions for a user, but we'll filter out the archived ones on the html side
  this.purchaseHistoryService.findAllPurchasesByUserName(this.username).subscribe(res => {
    
    //pull back all transactions
    this.purchaseHistoryDataSource = res['data'];

    //filter out the archived transractions and push them into a new datasource array
    this.nonArchivedPurchaseHistoryDataSource = [];
    for(let item of this.purchaseHistoryDataSource){
      if(item.isDisabled != true ){
        this.nonArchivedPurchaseHistoryDataSource.push(item);
      }
    }
    //console.log(this.purchaseHistoryDataSource);
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


/**
 * 
 * Function that launches a dialog to show all the users transactions
 * 
 */
viewAllTransactions(){
  const dialogRef = this.dialog.open(ViewAllTransactionsDialogComponent, {
    disableClose: true,
    width: '800px'
  })

  dialogRef.afterClosed().subscribe(result => {
    //console.log('closed.')
  })
}


/**
 * 
 * Function that archives a transaction
 * 
 */
archiveTransraction(invoiceId){
  console.log(invoiceId);
  this.purchaseHistoryService.archiveTransaction(invoiceId).subscribe(res => {
    //after patch refresh the data.
    this.purchaseHistoryService.findAllPurchasesByUserName(this.username).subscribe( res => {
      //pull back all transactions
    this.purchaseHistoryDataSource = res['data'];

    //filter out the archived transractions and push them into a new datasource array
    this.nonArchivedPurchaseHistoryDataSource = [];
    for(let item of this.purchaseHistoryDataSource){
      if(item.isDisabled != true ){
        this.nonArchivedPurchaseHistoryDataSource.push(item);
      }
    }
    })
    
   
  }, err => {
    console.log(err);
  })

  
}
}
