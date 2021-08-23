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
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserprofileService } from '../../pages/services/userprofile.service';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClient } from '@angular/common/http';
import { CreateMarketPlaceDialogueComponent } from '../base-layout/create-market-place-dialogue/create-market-place-dialogue.component';
import { CreateSellerComponent } from '../base-layout/create-seller/create-seller.component'
import { CreateDialogueComponent } from './create-dialogue/create-dialogue.component';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {

  year: number = Date.now();  

  username: any = this.cookieService.get('sessionuser');
  role: any = this.cookieService.get('role');
  isVisible: Boolean;
  user: string = this.cookieService.get('sessionuser');
  partnerClientId: string = 'AWWarvYmG1fqjxQEsJPjOZoaH6s9-UHj_6yjcmvjZm8VL6YG1606X45O9QtlfIz8EMe-6ftLGyDC09ot';
  merchantIdInPayPal: string = this.cookieService.get('merchantIdinPayPal')
  ad: Boolean = true; //show the add to begin with
  adCookie: any = this.cookieService.get('adCookie')
  oderHistoryVisibility: Boolean = true; //init graph visibility, constructor will take care of the rest
  historyDataNull: string;
  historyDataPresent: string;

  
  constructor(
    private cookieService: CookieService, 
    private router: Router, 
    private userProfileService: UserprofileService,
    private dialog: MatDialog,
    private matMenuModule: MatMenuModule,
    private httpClient: HttpClient,
   // private createMarketPlaceDialogueComponent: CreateMarketPlaceDialogueComponent
    ) { 
this.loadPayPalSDKScript();
    this.userProfileService.getUserRole(this.username).subscribe(res => {
      this.username = res['data'];
     //console.log(this.username.role);

      if(this.role === "marketplace"){
        this.isVisible = true;
      //  console.log(this.isVisible);
        
       } else {
       this.isVisible = false;
   //console.log(this.isVisible);
       }
    })




}
  ngOnInit(): void {
  }

  /**
   * 
   * Signout function that deletes cookies and navigates to home page
   * 
   */
  singOut(){
    this.cookieService.deleteAll();
    this.router.navigate(['/session/signin']);
  }


/**
 * 
 * create parent dialog (opens flow to create marketplace or seller)
 * 
 */
createParent(){
  const dialogRef = this.dialog.open(CreateDialogueComponent, {
    data:{

    },
    width: "800px"
  })
}


  /**Load the sdk when the home page component loads (that way we have the buttons when we need them) */
  loadPayPalSDKScript(){
    //todo make call to server to get the merchant id cuz loading it at login just isn't a good approach.
    //also make sure we are grabbing the client of the actual marketplace and not hard coding it. can prob 
    //grab merchant id and marketplace in one fail swoop...
console.log(this.merchantIdInPayPal)
console.log(this.partnerClientId)
    const node = document.createElement('script');
    node.src = `https://www.paypal.com/sdk/js?client-id=${this.partnerClientId}&components=buttons&enable-funding=venmo&intent=capture&merchant-id=${this.merchantIdInPayPal}`;
    node.type = 'text/javascript';
    node.async = false;
    document.getElementsByTagName('head')[0].appendChild(node);
  }


}



