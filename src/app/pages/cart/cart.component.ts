import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


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
  platformFee: string;
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

  constructor(private cookieService: CookieService, private http: HttpClient) {
    this.products
    }

 
  @ViewChild('paypalRef', {static: true}) private paypalRef: ElementRef;
  ngOnInit(): void {
    let paypalData = {
      merchantIdInPayPal: this.merchantIdInPayPal
    };
    window.paypal
    .Buttons({
      // Sets up the transaction when a payment button is clicked
      createOrder: (data, actions) => {
        return fetch('/v1/api/payments/paypal-commerce/create-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(paypalData)
        }).then(function(res) {
          return res.json();
        }).then(function(data) {
          return data.data.id;
        });
      },
      // Finalize the transaction after payer approval
      onApprove: (data, actions) => {
        
        let paypalOrderId = {
          orderId: data.orderID
        }
        return fetch('/v1/api/payments/paypal-commerce/capture-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(paypalOrderId)
        }).then((captureOrderResponse) => {
          return captureOrderResponse.json();
        }).then(finalResult => this.showTransactionResult(finalResult))        
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
      console.log(details.data)
      this.paypalTransactionCompleted = true
      this.result = details
      this.transactionAmount = details.data.purchase_units[0].payments.captures[0].amount.value;
      this.transactionID = details.data.purchase_units[0].payments.captures[0].id
      this.transactionDate = details.timestamp;
      this.platformFee = details.data.purchase_units[0].payment_instruction.platform_fees[0].amount.value;

      //TODO - send server call to record transaction in DB.
    }
}
