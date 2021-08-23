import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  user: string = this.cookieService.get('sessionuser');
  partnerClientId: string = 'AWWarvYmG1fqjxQEsJPjOZoaH6s9-UHj_6yjcmvjZm8VL6YG1606X45O9QtlfIz8EMe-6ftLGyDC09ot';
  merchantIdInPayPal: string = this.cookieService.get('merchantIdinPayPal')
  ad: Boolean = true; //show the add to begin with
  adCookie: any = this.cookieService.get('adCookie')
  oderHistoryVisibility: Boolean = true; //init graph visibility, constructor will take care of the rest
  historyDataNull: string;
  historyDataPresent: string;

  constructor(private cookieService: CookieService) {  }

 
  @ViewChild('paypalRef', {static: true}) private paypalRef: ElementRef;
  ngOnInit(): void {
    window.paypal
    .Buttons({
      style: {
        layout: 'vertical'
      },
      createOrder: (data, actions) => {
        return actions.order.create({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code:"USD",
                            value:17.00
              }
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

}
