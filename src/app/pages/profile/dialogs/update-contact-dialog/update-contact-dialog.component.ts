/**
 * 
 * ================================
 * ; Title: updateContactDialog.component.ts
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Modified by: James Brown
 * ; Date: 10/14/2020
 * ; Description: component responsible for changin the user password in the profile page
 * ================================
 * 
 */


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar, 
  MatSnackBarVerticalPosition 
 } from '@angular/material/snack-bar';
 import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { SuccessComponent } from '../success/success.component';
import { MatDialog } from '@angular/material/dialog';
import  { UserprofileService } from '../../../services/userprofile.service';

@Component({
  selector: 'app-update-contact-dialog',
  templateUrl: './update-contact-dialog.component.html',
  styleUrls: ['./update-contact-dialog.component.css']
})
export class UpdateContactDialogComponent implements OnInit {

  
  errorMessage: string;
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  user = this.cookieService.get('sessionuser');
  userData: Object;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  email: string;
  role: string;
  updateContactForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private cookieService: CookieService,
    private dialog: MatDialog,
    private userProfileService: UserprofileService ) {


/**
 * 
 * Initialize the form.
 * 
 */
    console.log(this.email);
    this.updateContactForm = this.fb.group({
      firstName: [{value: this.firstName, disabled: true}, Validators.required],
      lastName: [{value: this.lastName, disabled: true}, Validators.required],
      phone: [this.phone, Validators.required],
      address: [this.address, Validators.required],
      email: [this.email, Validators.required],
      role: [{value: this.role, disabled: true}, Validators.required],
    });

   //make a call to get the user details and set are initialized form values
   this.userProfileService.getUserDetails(this.user).subscribe( res => {
    this.userData = res.data;
    this.firstName = res.data.firstName;
    this.lastName = res.data.lastName;
    this.phone = res.data.phoneNumber;
    this.address = res.data.address;
    this.email = res.data.email;
    this.role = res.data.role;
console.log(res);
    //map the values above into the form.
    this.updateContactForm = this.fb.group({
      firstName: [{value: this.firstName, disabled: true}, Validators.required],
      lastName: [{value: this.lastName, disabled: true}, Validators.required],
      phone: [this.phone, Validators.required],
      address: [this.address, Validators.required],
      email: [this.email, Validators.required],
      role: [{value: this.role, disabled: true}, Validators.required],
    });
  });
  
     }


  ngOnInit(): void {}


  changeUserContactDetails(){
    const userId = this.cookieService.get('userId');
    const firstName = this.updateContactForm.controls.firstName.value;
    const lastName = this.updateContactForm.controls.lastName.value;
    const username = this.user; 
    const contactPhone = this.updateContactForm.controls.phone.value;
    const contactAddress = this.updateContactForm.controls.address.value;
    const contactEmail = this.updateContactForm.controls.email.value;
    const role = this.updateContactForm.controls.role.value;
  
    this.userProfileService.updateUserContactDetails(
                                                      userId,
                                                      firstName,
                                                      lastName,
                                                      username,
                                                      contactPhone,
                                                      contactAddress,
                                                      contactEmail,
                                                      role).subscribe( res =>{
                                                        //console.log(res);
                                                        const dialogRef = this.dialog.open(SuccessComponent, {
                                                          width: "100px"
                                                        })
                                                      }, err => {
                                                        this.errorMessage = 'Something went wrong.';
                                                        this.openSnackBar(this.errorMessage);
                                                      });
  }
  openSnackBar(errorMessage: string) {
    this._snackBar.open(errorMessage, 'Close', {
      duration: 7000,
      verticalPosition: 'top',
      panelClass: 'error'
    });
}
}
