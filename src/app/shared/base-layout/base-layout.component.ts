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
  role: any;
  isVisible: Boolean;
  
  constructor(
    private cookieService: CookieService, 
    private router: Router, 
    private userProfileService: UserprofileService,
    private dialog: MatDialog,
    private matMenuModule: MatMenuModule,
    private httpClient: HttpClient,
   // private createMarketPlaceDialogueComponent: CreateMarketPlaceDialogueComponent
    ) { 

    this.userProfileService.getUserRole(this.username).subscribe(res => {
      this.username = res['data'];
     //console.log(this.username.role);

      if(this.username.role === "marketplace"){
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



}



