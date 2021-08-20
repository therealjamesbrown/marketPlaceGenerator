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

    this.loadScripts()
  }

  user: any = this.cookieService.get('sessionuser');
ad: Boolean = true; //show the add to begin with
adCookie: any = this.cookieService.get('adCookie')
oderHistoryVisibility: Boolean = true; //init graph visibility, constructor will take care of the rest
historyDataNull: string;
historyDataPresent: string;


    loadScripts(){
      const node = document.createElement('script');
      node.src = `https://www.paypal.com/sdk/js?client-id=ATJLre1zGOE4EaB854PnEKBOvbz6il8NiXAa5b1-p4QCYvWoghdokl2LgzsravutwfhQXU8Wj8x48w3s&components=buttons&enable-funding=venmo&intent=capture`;
      node.type = 'text/javascript';
      node.async = false;
      document.getElementsByTagName('head')[0].appendChild(node);
      console.log(node)
    }


  ngOnInit(): void {
  }

}
