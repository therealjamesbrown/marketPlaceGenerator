import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

result;
partnerClientId: string = 'AWWarvYmG1fqjxQEsJPjOZoaH6s9-UHj_6yjcmvjZm8VL6YG1606X45O9QtlfIz8EMe-6ftLGyDC09ot';
merchantIdInPayPal: string = this.cookieService.get('merchantIdinPayPal')
  transactionID: string;
  transactionAmount: string;
  transactionDate: string;
  displayedColumns: string[] = ['product', 'quantity', 'price'];
  paypalTransactionCompleted: boolean = false;
  products: any = [
    {
      name:"Hamburger",
      description: "No cheese, add mayo, mustard, pickles",
      amount: "9.00",
      quantity: "1"
    },
    {
      name:"Hot Dog",
      description: "Add relish, onion, ketchup, peppers",
      amount: "6.00",
      quantity: "1"
    },
    {
      name:"Dr Pepper",
      description: "20 Oz Soda",
      amount: "2.00",
      quantity: "1"
    }
  ];

  constructor(private cookieService: CookieService) {

    this.products

    }

 
  @ViewChild('paypalRef', {static: true}) private paypalRef: ElementRef;
  ngOnInit(): void {
    window.paypal
    .Buttons({
      // Sets up the transaction when a payment button is clicked
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
        });
      },
      // Finalize the transaction after payer approval
      onApprove: (data, actions) => {
        return actions.order.capture().then((details) => {
          this.showTransactionResult(details)
        })
      },
      onError: (data, actions) =>{
        console.log('something went wrong.')
      }
    }).render(this.paypalRef.nativeElement)
    }

    /**
     * 
     * @param details 
     * function that takes the details object returned from the sdk and maps it to the UI
     */
    showTransactionResult(details){
      //show the container for the completed payment
      this.paypalTransactionCompleted = true
      this.result = details
      this.transactionAmount = details.purchase_units[0].amount.value;
      this.transactionID = details.id
      this.transactionDate = details.create_time;
    }
}
