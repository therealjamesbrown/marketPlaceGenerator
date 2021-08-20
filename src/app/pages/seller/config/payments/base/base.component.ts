import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

   @ViewChild('paypalRef', {static: true}) private paypalRef: ElementRef;
  ngOnInit(): void {
    console.log(window.paypal)
    window.paypal
    .Buttons({
      style: {
        layout: 'horizontal'
      },

      createOrder: (data, actions) => {
        return actions.order.create({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code:"USD",
                            value:17.00,
                            breakdown:{
                                item_total:{
                                    value: 17.00,
                                    currency_code: "USD"
                                }
                            }
              },
            shipping: {
                address: {
                  address_line_1: "2211 N First Street",
                  address_line_2: "Building 17",
                  admin_area_2: "San Jose",
                  admin_area_1: "CA",
                  postal_code: "95131",
                  country_code: "US"
                }
              },
          items:[{
                name:"Hamburger",
            description:"No cheese, add mayo, mustard, pickles",
                quantity:1,
                unit_amount:{
              value:"9.00",
              currency_code:"USD"
              }
                },
            {
                name:"Hot Dog",
            description:"Add relish, onion, ketchup, peppers",
                quantity:1,
                unit_amount:{
              value:"6.00",
              currency_code:"USD"
              }
                },
            {
            name:"20 Oz Soda",
            description:"Dr Pepper",
                quantity:1,
                unit_amount:{
              value:"2.00",
              currency_code:"USD"
              }
                }
            ]
            }
            ],
            application_context: {
              /*Uncomment the below app context to disable the prompt for shipping*/
            //shipping_preference:"NO_SHIPPING",
            logo_image:"https://i.imgur.com/JOO1P6I.jpeg",
            //return url won't have any impact, but just including it... You'd use actions.redirect() in onApprove instead.
            return_url: "https://www.example.com/success",
            user_action: "PAY_NOW"
            }
        })
      },
      // Finalize the transaction after payer approval
      onApprove: function(data, actions) {
      
        actions.order.capture().then(function(details) {
          console.log(details)
        })
      },
      onError: function(data, actions){
        console.log('something went wrong.')
      }
    }).render(this.paypalRef.nativeElement)
    }




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
