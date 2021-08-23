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

  constructor(private cookieService: CookieService) { }

 
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



  /**Load the sdk when the home page component loads (that way we have the buttons when we need them) */
  loadPayPalSDKScript(){
    //todo make call to server to get the merchant id cuz loading it at login just isn't a good approach.
    //also make sure we are grabbing the client of the actual marketplace and not hard coding it. can prob 
    //grab merchant id and marketplace in one fail swoop...

    const node = document.createElement('script');
    node.src = `https://www.paypal.com/sdk/js?client-id=${this.partnerClientId}&components=buttons&enable-funding=venmo&intent=capture&merchant-id=${this.merchantIdInPayPal}`;
    node.type = 'text/javascript';
    node.async = false;
    document.getElementsByTagName('head')[0].appendChild(node);
  }

}
