import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SellerServiceService } from '../seller/seller-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  result;
  user: string = this.cookieService.get('sessionuser');
  partnerClientId: string = 'AWWarvYmG1fqjxQEsJPjOZoaH6s9-UHj_6yjcmvjZm8VL6YG1606X45O9QtlfIz8EMe-6ftLGyDC09ot';
  merchantIdInPayPal: string = this.cookieService.get('merchantIdinPayPal')
  clientToken: string;
  ad: Boolean = true; //show the add to begin with
  adCookie: any = this.cookieService.get('adCookie')
  oderHistoryVisibility: Boolean = true; //init graph visibility, constructor will take care of the rest
  historyDataNull: string;
  historyDataPresent: string;
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
  isCommerceConfigure: boolean;
  displayConnectMessage: boolean = false;
  sellerUsername;
  marketplaceUsername;
  sellerConfigInPayPal;
  disabledArray = [];
  enabledArray = [];
  paypalSDKString;
 
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

  constructor(private cookieService: CookieService, 
                      private http: HttpClient,
                      private SellerService: SellerServiceService) 
    {
    
    this.products
    this.sellerUsername = this.cookieService.get('sessionuser');
    this.marketplaceUsername = this.cookieService.get('marketplaceUsername');

    //need to check to see if PP commerce is configured, if not dispaly a message to connect it.
    this.SellerService.getConfiguredOptions(this.marketplaceUsername, this.sellerUsername).subscribe( res => {
      
      this.sellerConfigInPayPal = res[0];
      for(let paymentMethod of this.sellerConfigInPayPal.paymentMethods){
        if(paymentMethod.isChecked){
          this.enabledArray.push(paymentMethod)
        } else {
         this.disabledArray.push(paymentMethod);
        }
      }

      if(res[0].configName === null || res === null){
        this.isCommerceConfigure = false;
        this.displayConnectMessage = true;
      } else {
        this.isCommerceConfigure = true;
        this.displayConnectMessage = false;
        //load the sdk if ppcp is configured
        this.loadPayPalSDKScript()
      }
    })
    }



    /**Load the sdk when the home page component loads (that way we have the buttons when we need them) */
    loadPayPalSDKScript(){
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

        //setup enabled payment options
        let enabledString = ''
        for(let method of this.enabledArray){
          //currently only venmo and pay later are supported as "enable options"
          if(method.method === 'venmo' || method.method === 'paylater' || method.method === 'card' || method.method === 'credit'){
            enabledString += method.method + ','
          }
        }
              //cut the last comma off so it doesn't break the sdk.
        enabledString = enabledString.substring(0, enabledString.length - 1);

        //set up disabled payment options
        let disabledString = ''
        for(let method of this.disabledArray){
          if(method.method === 'card' || method.method === 'credit' || method.method === 'venmo'){
            disabledString += method.method + ','
        }
      }
      //cut the last comma off so it doesn't break the sdk.
      disabledString = disabledString.substring(0, disabledString.length - 1);
        
        //console.log(`Disabled: ${disabledString}`);
        //console.log(`enabled: ${enabledString}`);

        if(disabledString === ""){
          //console.log('1')
          this.paypalSDKString = `https://www.paypal.com/sdk/js?client-id=${this.partnerClientId}&components=buttons,hosted-fields&enable-funding=${enabledString}&intent=capture&merchant-id=${this.merchantIdInPayPal}`
          //console.log(this.paypalSDKString)
        }

        if(disabledString !== "" && enabledString !== ""){
          //console.log('2');
          this.paypalSDKString = `https://www.paypal.com/sdk/js?client-id=${this.partnerClientId}&components=buttons,hosted-fields&enable-funding=${enabledString}&disable-funding=${disabledString}&intent=capture&merchant-id=${this.merchantIdInPayPal}`
          //console.log(this.paypalSDKString)
        }

        if(enabledString === "" && disabledString !== ""){
          //console.log('3')
          this.paypalSDKString = `https://www.paypal.com/sdk/js?client-id=${this.partnerClientId}&components=buttons,hosted-fields&disable-funding=${disabledString}&intent=capture&merchant-id=${this.merchantIdInPayPal}`
        //console.log(this.paypalSDKString)
        }
        

        if(enabledString === "" && disabledString === ""){
          //console.log('4')
          this.paypalSDKString = `https://www.paypal.com/sdk/js?client-id=${this.partnerClientId}&components=buttons,hosted-fields&intent=capture&merchant-id=${this.merchantIdInPayPal}`
        }

        
        //construct the paypal url.
        const node = document.createElement('script');
        node.src = this.paypalSDKString;
        node.setAttribute('data-client-token', this.clientToken)
        node.type = 'text/javascript';
        node.async = false;
        document.getElementsByTagName('head')[0].appendChild(node);
      });
    }

 
  ngAfterViewInit(): void{  }
  
  ngOnInit(): void {
    //set a timeout to give paypal time to laod on the page.
    setTimeout(() => { this.paypalHasLoaded = true }, 4000);
    this.isCommerceConfigure = false;
    }
  }
  


