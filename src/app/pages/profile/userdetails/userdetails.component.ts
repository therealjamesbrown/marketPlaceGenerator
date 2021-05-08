/**
 * 
 * ================================
 * ; Title: userdetails.service.ts
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Modified by: Sarah Kovar
 * ; Date: 10/24/2020
 * ; Description: component responsible for populating the user details
 * ================================
 * 
 */


import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { UserprofileService } from '../../services/userprofile.service'

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {
  username: string = this.cookieService.get('sessionuser');
  userDetailsDataSource;
  firstName;
  lastName;
  phone;
  address;
  email;
  role;
  dateCreated;
  dateModified;


  constructor(
    private dialog: MatDialog, 
    private userProfileService: UserprofileService,
    private cookieService: CookieService) {

    /**
     * 
     * Pull in the user details
     * 
     */

     this.userProfileService.getUserDetails(this.username).subscribe(res => {
      this.userDetailsDataSource = res['data'];
      this.firstName = this.userDetailsDataSource.firstName;
      this.lastName = this.userDetailsDataSource.lastName;
      this.phone = this.userDetailsDataSource.phoneNumber;
      this.address = this.userDetailsDataSource.address;
      this.email = this.userDetailsDataSource.email;
      this.role = this.userDetailsDataSource.role;
      this.dateCreated = this.userDetailsDataSource.date_created;

      //console.log(this.userDetailsDataSource);
     })
   }



  ngOnInit(): void {
  }

}
