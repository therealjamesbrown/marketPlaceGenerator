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
  
  constructor(private cookieService: CookieService, private router: Router, private userProfileService: UserprofileService) { 

    this.userProfileService.getUserRole(this.username).subscribe(res => {
      this.username = res['data'];
      console.log(this.username.role);

      if(this.username.role === "admin"){
        this.isVisible = true;
        console.log(this.isVisible);
        
       } else {
       this.isVisible = false;
       console.log(this.isVisible);
       }
    })




}
  ngOnInit(): void {
  }

  singOut(){
    this.cookieService.deleteAll();
    this.router.navigate(['/session/signin']);
  }

  /*
  hideAdminNav(){
    if(this.username.role === "admin"){
      // console.log('i fired first');
      this.isVisible = true;
      console.log(this.isVisible);
      
     } else if (this.username.role === "standard"){
     this.isVisible = false;
     console.log(this.isVisible);
     
     }
*/

  }


//}
