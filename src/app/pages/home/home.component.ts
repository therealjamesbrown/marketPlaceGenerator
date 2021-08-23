/**
 * 
 * ================================
 * ; Title: BCRS PROJECT
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Modified by: James Brown
 * ; Date: 10/14/2020
 * ; Description: Application for Bobs Computer Repair Shop.
 * ================================
 * 
 */


import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
//get the user and welcome them
user: any = this.cookieService.get('sessionuser');
ad: Boolean = true; //show the add to begin with
adCookie: any = this.cookieService.get('adCookie')
oderHistoryVisibility: Boolean = true; //init graph visibility, constructor will take care of the rest
historyDataNull: string;
historyDataPresent: string;

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

  ngOnInit(): void {
  }

  hideAd(){
    this.ad = false; //hide the add 
    //set a cookie so the ad doesn't come back until next session
   this.cookieService.set('adCookie','true', 1)
  }

}
