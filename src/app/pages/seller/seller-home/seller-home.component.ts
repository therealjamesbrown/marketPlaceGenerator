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
  }

  user: any = this.cookieService.get('sessionuser');
ad: Boolean = true; //show the add to begin with
adCookie: any = this.cookieService.get('adCookie')
oderHistoryVisibility: Boolean = true; //init graph visibility, constructor will take care of the rest
historyDataNull: string;
historyDataPresent: string;

  ngOnInit(): void {
  }

}
