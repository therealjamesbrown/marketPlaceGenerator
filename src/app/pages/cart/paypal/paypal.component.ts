import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {
  result;
  partnerClientId: string = 'AWWarvYmG1fqjxQEsJPjOZoaH6s9-UHj_6yjcmvjZm8VL6YG1606X45O9QtlfIz8EMe-6ftLGyDC09ot';
  merchantIdInPayPal: string = this.cookieService.get('merchantIdinPayPal')
  transactionID: string;
  platformFee: string;
  transactionAmount: string;
  refundTransactionID: string;
  transactionDate: string;
  displayedColumns: string[] = ['product', 'quantity', 'price'];
  paypalTransactionCompleted: boolean = false;
  paypalRefundCompleted: boolean = false;
  paypalRefundInitiated: boolean = false;
  cardSpinner: boolean = false;
  paymentComplete: boolean = false;
  paymentSource;
  lastFour;
  fundedByCard: boolean = false;
  paypalHasLoaded: boolean = false;
  hideCardOption: boolean = false;
  zoovuTrackingSendStatus: any = "";

 
  products: any = [
    {
      name:"Example item 1",
      description: "Example item description",
      amount: "9.00",
      quantity: "1"
    },
    {
      name:"Example item 2",
      description: "Example item description 2",
      amount: "6.00",
      quantity: "1"
    },
    {
      name:"Example item 3",
      description: "Example item description 3",
      amount: "2.00",
      quantity: "1"
    }
  ];

  constructor(private cookieService: CookieService, private http: HttpClient) {
    this.products
    }

    @ViewChild(MatAccordion) accordion: MatAccordion;
    @ViewChild('paypalRef', {static: true}) private paypalRef: ElementRef;
  ngAfterViewInit(): void{

  
       /*add the zoovu tracking script to the page*/
       const node = document.createElement('script');
       node.src = "https://tiger-cdn.zoovu.com/advisor-fe-web/api/v1/integrations/zQgkBl/zoovu-tracking";
       node.type = 'text/javascript';
       node.async = false;
       document.getElementsByTagName('head')[0].appendChild(node);
       /*end zoovu tracking script*/


    //if sdk isn't loaded, hold up on rendering
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
    }).render(this.paypalRef.nativeElement);
    if(paypal.HostedFields.isEligible() === false){
      document.getElementById("UCC").style.display = "none";

    }
    // If this returns false or the card fields aren't visible, see Step #1.
    if (paypal.HostedFields.isEligible()) {
      // Renders card fields
      paypal.HostedFields.render({
        // Call your server to set up the transaction
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
            console.log(data.data.id)
            return data.data.id;
         
          });
        },

        styles: {
          '.valid': {
           'color': 'green'
          },
          '.invalid': {
           'color': 'red'
          },
          ':focus': {
            'color': '#333333'
          },
        },

        fields: {
          number: {
            selector: "#card-number",
            placeholder: "4111 1111 1111 1111"
          },
          cvv: {
            selector: "#cvv",
            placeholder: "123"
          },
          expirationDate: {
            selector: "#expiration-date",
            placeholder: "MM/YY"
          }
        }
      }).then((cardFields) => {
        document.querySelector("#card-form").addEventListener('submit', (event) => {
          document.getElementById("paypalButton").style.display = "none";
          event.preventDefault();
          document.getElementById("card-form").style.display = "none";
          this.cardSpinner= true;
          cardFields.submit({
            // Billing Address
            billingAddress: {
              // Country Code
              countryCodeAlpha2: 'US'
            }
          }).then((data) => {
            let paypalOrderId = {
              orderId: data.orderId
            }
            fetch('/v1/api/payments/paypal-commerce/capture-order', {
              method: 'post',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(paypalOrderId)
            }).then((res) => {
               return res.json();
            }).then(finalResult => this.showTransactionResult(finalResult))   
         }).catch(function (err) {
           alert('Payment could not be captured! ' + JSON.stringify(err))
         });
        });
      });
    } else {
      // Hides card fields if the merchant isn't eligible
      //document.querySelector("#card-form").style = 'display: none';
    }

  }
  
  ngOnInit(): void {
    
    }

    /**
     * 
     * @param details 
     * function that takes the details object returned from the sdk and maps it to the UI
     */
    showTransactionResult(details){
      //hide the card fields loading icon & card fields
      this.paymentComplete = true;
      document.getElementById("payment").style.display = "none";
      this.cardSpinner = false;
      //show the container for the completed payment
     // console.log(details.data)
      this.paypalTransactionCompleted = true
      this.result = details
      this.transactionAmount = details.data.purchase_units[0].payments.captures[0].amount.value;
      this.transactionID = details.data.purchase_units[0].payments.captures[0].id
      this.transactionDate = details.timestamp;
      this.platformFee = details.data.purchase_units[0].payment_instruction.platform_fees[0].amount.value;
 
      if(details.data.payment_source){
        this.paymentSource = details.data.payment_source.card.brand;
        this.lastFour = details.data.payment_source.card.last_digits;
        this.fundedByCard = true;
      } else {
        this.paymentSource = "PayPal";
      }
      //zoovu sales tracking stuff.
      //check if cookie was set by zoovu, otherwise we'll get a client id not found error
  
      window.Zoovu.Tracking.trackPurchase({
        // path to the place where transaction ID is stored (don't change if DataLayer is used)
        transactionId: details.data.purchase_units[0].payments.captures[0].id,
      
        // currency used on your marketplace. Any format can be used but ISO-4217 code are recommended
        currency: 'USD',
      
        // the function that contains main product details to be collected (enabled below)
        products: [{ sku:"testSKu", name: 'testName', pricePerUnit: 23.00, quantity:2}],
    
      })
      
        // the following part will enable error messages in case if something goes wrong
        .then(function onResolve(status) {
          if (status.wasEventSent) {
            alert('ZOOVU Success Tracking Event Was Sent');
            //destroy the zoovu cookie for safe measures and to ensure proper tracking... 
            document.cookie = "zoovu-cid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          } else {
            alert('ZOOVU Success Tracking Event Was NOT Sent. Please check to ensure you clicked through the assistant prior to completing checkout.');
            console.log(status.whyEventWasNotSent);
          }
        })
        .catch(function onReject(error) {
          console.log(error);
        });
      //TODO - send server call to record transaction and zoovu results in DB.
    }


    /**
     * 
     * function for issuing refund
     * 
     */
issueRefund(){
  this.paypalRefundInitiated = true;
  let reqBody = {
    orderID: this.transactionID,
    merchantIdInPayPal: this.merchantIdInPayPal
  }

  return fetch('/v1/api/payments/paypal-commerce/refund', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reqBody)
  }).then(function(res) {
    return res.json();
  }).then(data => this.showRefundResult(data));        
      }

    /**
     * 
     * function for showing the completed refund tile.
     * 
     */
      showRefundResult(details){
        console.log(details)
        this.paypalRefundCompleted = true;
        this.refundTransactionID = details.data.id;
        this.transactionDate = details.timestamp;
      }
}
  







/*
request to post data to a listener from add to cart button

return fetch('https://webhook.site/48b16c15-c2e8-42d8-9607-5d9ff4d60b09?', {
  method: 'POST',
  mode:"no-cors",
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(product)
}).then(function(res) {
  return res.json();
}).then(function(){
console.log(res);


window.location.replace("http://localhost:4200/#/seller/cart");
});*/




