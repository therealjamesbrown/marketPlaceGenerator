import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { PaymentsService } from 'src/app/pages/administration/services/payments.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  //get all the payments listed in the db. 
  isChecked; 
  paymentServiceDataSource: Array<any>;
  displayedColumns: string[] = ['role', 'status'];

  /**
   * GET Payment Services
   */
  //step 1: get all the payment methods
  //step 2: map them to the UI with slider options


  constructor(private paymentService: PaymentsService) { 
    this.paymentService.findAllPaymentServices().subscribe(res => {
     
      this.paymentServiceDataSource = res['data'];
      //loop the data to get the current isEnabled value
      for (let status of res.data){
        //console.log(status.isEnabled);
        this.isChecked = status.isEnabled;
      }
    }, err => {
      console.log(err);
    })
    }


  ngOnInit(): void {
    
  }

  /**
   * 
   * Patch Payment Service
   * 
   */
  //step 3: listen for changes and update the db depending on what is chosen with the slider ex: enabled/Enabled
  updatePaymentSource(element){
      console.log(this.isChecked);
      let paymentMethodID = element._id;
      let isEnabled = element.isEnabled;
      console.log(isEnabled);

      /*
      this.paymentService.updatePaymentService(paymentMethodID, isEnabled).subscribe( res => {
        console.log(res);
      }, err => {
        console.log(err);
      })
      */
}

  /**
   * 
   * Create Payment Service
   * 
   */

}
