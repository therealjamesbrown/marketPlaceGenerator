import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { PaymentsService } from 'src/app/pages/administration/services/payments.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

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

    //make the server call to retrieve payment methods
    this.paymentService.findAllPaymentServices().subscribe(res => {
     
      //store the response objects in an array. 
      this.paymentServiceDataSource = res['data'];
      //loop the data to get the current isEnabled value
      for (let status of res.data){
        //set the value of the sliders to match its DB persisted value
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
   * Patch Payment Service when toggled
   * 
   */
  //step 3: listen for changes and update the db depending on what is chosen with the slider ex: enabled/disabled

  //function takes two params. one for the current state of the toggle and the element/object that was toggled
  onChange(value: MatSlideToggleChange, element){
    const { checked } = value;    
      let paymentMethodID = element._id;
      let isEnabled = checked;
      //console.log(isEnabled);

      
      this.paymentService.updatePaymentService(paymentMethodID, isEnabled).subscribe( res => {
        //console.log(res);
      }, err => {
        console.log(err);
      })
      
}

  /**
   * 
   * Create Payment Service
   * 
   */

}
