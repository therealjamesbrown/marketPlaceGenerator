import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PaymentsService } from 'src/app/pages/administration/services/payments.service';
import { PaypalCommerceComponent } from '../paypal-commerce/paypal-commerce.component';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {
    //get all the payments listed in the db. 
    isChecked; 
    paymentServiceDataSource: any[];
    filteredPaymentServiceDataSource: any[];
    displayedColumns: string[] = ['role', 'action'];

  constructor(
    private paymentService: PaymentsService,
    private dialog: MatDialog
  ) {
 
   //step 1: get list of available integrations
   //make the server call to retrieve payment methods
   this.paymentService.findAllPaymentServices().subscribe(res => {
     
    //store the response objects in an array. 
    
    this.paymentServiceDataSource = res.data;
    this.filteredPaymentServiceDataSource = [];
  //step 2: get the status of the integration for the seller
   for(let i of this.paymentServiceDataSource){
     //step 3: filter out the disabled options and write the results to the UI
     if(i.isEnabled){
       this.filteredPaymentServiceDataSource.push(i);
     }
   }
  }, err => {
    console.log(err);
  })
  
   }

  ngOnInit(): void {  }

  configurePaymentSource(element){
    //configure paypal commerce platform
    if(element === 'PayPal Commerce Platform'){
      const dialogRef = this.dialog.open(PaypalCommerceComponent, {
        data: {
  
        },
        width: '800px'
      });
  
      dialogRef.afterClosed().subscribe(result => {
      
      })
    }
  }
}
