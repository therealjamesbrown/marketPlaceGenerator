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

    this.loadPayPalSDKScript()
    }

    user: string = this.cookieService.get('sessionuser');
    partnerClientId: string = 'AWWarvYmG1fqjxQEsJPjOZoaH6s9-UHj_6yjcmvjZm8VL6YG1606X45O9QtlfIz8EMe-6ftLGyDC09ot';
    merchantIdInPayPal: string = this.cookieService.get('merchantIdinPayPal')
    clientToken: string;
    ad: Boolean = true; //show the add to begin with
    adCookie: any = this.cookieService.get('adCookie')
    oderHistoryVisibility: Boolean = true; //init graph visibility, constructor will take care of the rest
    historyDataNull: string;
    historyDataPresent: string;


    /**Load the sdk when the home page component loads (that way we have the buttons when we need them) */
    loadPayPalSDKScript(){
      //todo make call to server to get the merchant id cuz loading it at login just isn't a good approach.
      //also make sure we are grabbing the client of the actual marketplace and not hard coding it. can prob 
      //grab merchant id and marketplace in one fail swoop...
      fetch('/v1/api/payments/paypal-commerce/client-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: ''
      }).then(function(res) {
        return res.json();
      }).then(data => {

        //store the client token we got from the server
        this.clientToken = data.data
        
        //construct the paypal url.
        const node = document.createElement('script');
        node.src = `https://www.paypal.com/sdk/js?client-id=${this.partnerClientId}&components=buttons,hosted-fields&enable-funding=venmo&intent=capture&merchant-id=${this.merchantIdInPayPal}`;
        node.setAttribute('data-client-token', this.clientToken)
        node.type = 'text/javascript';
        node.async = false;
        document.getElementsByTagName('head')[0].appendChild(node);
      });
    }

 
  ngAfterViewInit(): void{

  
  }
  
  ngOnInit(): void {
    setTimeout(() => { this.paypalHasLoaded = true 
    console.log(window.paypal)}, 2000);

    }
  }
  


