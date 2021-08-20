import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {

  constructor(private cookieService: CookieService) { 
    //hide the graph if there's no data.
    this.historyDataNull = this.cookieService.get('hidegraph');

    //show the graph if data is present. 
    this.historyDataPresent = this.cookieService.get('showGraph');

    if (this.historyDataPresent){
      this.oderHistoryVisibility = true;      
    } else if (this.historyDataNull){
      this.oderHistoryVisibility = false;
    }

    this.loadPayPalSDKScript()
  }

  user: any = this.cookieService.get('sessionuser');
  partnerClientId: any = 'ATJLre1zGOE4EaB854PnEKBOvbz6il8NiXAa5b1-p4QCYvWoghdokl2LgzsravutwfhQXU8Wj8x48w3s';
  merchantIdInPayPal: any = this.cookieService.get('merchantIdinPayPal')
  ad: Boolean = true; //show the add to begin with
  adCookie: any = this.cookieService.get('adCookie')
  oderHistoryVisibility: Boolean = true; //init graph visibility, constructor will take care of the rest
  historyDataNull: string;
  historyDataPresent: string;


  /**Load the sdk when the home page component loads (that way we have the buttons when we nee them) */
    loadPayPalSDKScript(){
      //todo make call to server to get the merchant id cuz loading it at login just isn't a good approach.
      //also fix the damn redirect error bullshit that crashes the app every time something messes up.
      //should never redirect to http://localhost:3000/#/ - prob check the error interceptor and 404/500s pages
      //also make sure we are grabbing the client of the actual marketplace and not hard coding it. can prob 
      //grab merchant id and marketplace in one fail swoop...

      const node = document.createElement('script');
      node.src = `https://www.paypal.com/sdk/js?client-id=${this.partnerClientId}&components=buttons&enable-funding=venmo&intent=capture&merchant-id=${this.merchantIdInPayPal}`;
      node.type = 'text/javascript';
      node.async = false;
      document.getElementsByTagName('head')[0].appendChild(node);
    }


  ngOnInit(): void {
  }

}
