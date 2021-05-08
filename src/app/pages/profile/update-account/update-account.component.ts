/**
 * 
 * ================================
 * ; Title: update-account.component.ts
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Modified by: James Brown
 * ; Date: 10/14/2020
 * ; Description: component responsible for updating the user profile
 * ================================
 * 
 */


import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserprofileService } from '../../services/userprofile.service';
import { ChangePasswordComponent } from '../dialogs/change-password/change-password.component'
import { ChangeSecurityQuestionsComponent } from '../dialogs/change-security-questions/change-security-questions.component';
import { UpdateContactDialogComponent } from '../dialogs/update-contact-dialog/update-contact-dialog.component';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.css']
})
export class UpdateAccountComponent implements OnInit {

  constructor(
    private http: HttpClient, 
    private dialog: MatDialog, 
    private userProfileServce: UserprofileService ) { }

  ngOnInit(): void {
  }

  
  /**
   * 
   * Change Password
   * 
   */
  changeUserPassword(){
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      disableClose: true,
      width: "800px"
    })
  }


  /**
   * 
   * Change Security Questions
   * 
   */
  changeUserSecurityQuestions(){
    const dialogRef = this.dialog.open(ChangeSecurityQuestionsComponent, {
      disableClose: true,
      width: "800px"
    })
  }


  /**
   * 
   * Update Contact Details
   * 
   */

  updateUserContactDetails(){
    const dialogRef = this.dialog.open(UpdateContactDialogComponent, {
      disableClose: true,
      width: "800px"
    })
  }


}
