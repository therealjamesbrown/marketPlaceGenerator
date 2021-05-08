/**
 * 
 * ================================
 * ; Title: reset-password.component.ts
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Date: 10/31/2020
 * ; Description: component for managing password reset
 * ================================
 * 
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
//import { UserInterface } from '../../../shared/user.interface';
import { ViewChild } from '@angular/core';
import { VerifySecurityQuestionsComponent } from '../verify-security-questions/verify-security-questions.component';
import { VerifyUsernameComponent } from '../verify-username/verify-username.component';  



@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class ResetPasswordComponent implements OnInit {

   isAuthenticated: string;
   username: string;
   form3: FormGroup;  
   successMessage: string;
   verticalPosition: MatSnackBarVerticalPosition = 'bottom';

/*
 //begin add
   @ViewChild(VerifyUsernameComponent) stepOneComponent: VerifyUsernameComponent;
   @ViewChild(VerifySecurityQuestionsComponent) stepTwoComponent: VerifySecurityQuestionsComponent;
   @ViewChild(ResetPasswordComponent) stepThreeComponent: ResetPasswordComponent;
 
   get frmStepOne() {
      return this.stepOneComponent ? this.stepOneComponent.form1 : null;
   }
 
   get frmStepTwo() {
      return this.stepTwoComponent ? this.stepTwoComponent.form2 : null;
   }
 
   get frmStepThree() {
      return this.stepThreeComponent ? this.stepThreeComponent.form3 : null;
   }
 //end add
 */

constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private cookieService: CookieService, private _snackBar: MatSnackBar) {
   this.isAuthenticated = this.route.snapshot.queryParamMap.get('isAuthenticated');
   this.username = this.route.snapshot.queryParamMap.get('username');
   console.log(this.username);

//   if(!this.isAuthenticated) {
//     this.router.navigate(['/session/signin'])
//   }
  }

 ngOnInit() {
   this.form3 = this.fb.group({
     password: [null, Validators.compose([Validators.required])]
   });
 }

 navigateSecurityQuestions(){
  this.router.navigate(['/session/verify-security-questions'], {queryParams: {username: this.username}, skipLocationChange: true});
 }

 resetPassword() {
   console.log(this.username)
   this.http.post('/api/session/users/' + this.username + '/reset-password', {
     password: this.form3.controls['password'].value
   }).subscribe(res => {
     //user authenticated
     this.cookieService.set('sessionuser', this.username, 1);  

     this.successMessage = 'Password reset success. You will be redirected to the login screen.';
     this.openSnackBar(this.successMessage);

     this.router.navigate(['/']);
   }, err => {
     console.log(err);
   })
 }
 openSnackBar(errorMessage: string) {
  this._snackBar.open(errorMessage, 'Close', {
    duration: 7000,
    verticalPosition: 'top',
    panelClass: 'error'
  });
}
}