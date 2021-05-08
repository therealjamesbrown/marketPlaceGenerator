/**
 * 
 * ================================
 * ; Title: verify-username.component.ts
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Date: 10/31/2020
 * ; Description: component for managing the verify username
 * ================================
 * 
 */


import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { VerifySecurityQuestionsComponent } from '../verify-security-questions/verify-security-questions.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { ViewChild } from '@angular/core';  //add


@Component({
  selector: 'app-verify-username',
  templateUrl: './verify-username.component.html',
  styleUrls: ['./verify-username.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class VerifyUsernameComponent implements OnInit {
  form1: FormGroup;
  errorMessage: string;
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


  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, private _snackBar: MatSnackBar) { 
  }
  
  ngOnInit() {

    this.form1=this.fb.group({
      username: [null, Validators.compose([Validators.required])]
    });
  }



  validateUsername() {
    const username = this.form1.controls['username'].value;
    console.log(username);

    this.http.get('/api/session/verify/users/' + username).subscribe (res => {
      //console.log(res['data'].username);
      console.log(res);
      //if we get data back, route to the next step
      if (res['data']) {
        this.router.navigate(['/session/verify-security-questions'], {queryParams: {username: username}, skipLocationChange: true});
        //else if there is not res data or its null, we'll handle it here and in the err
      } else if(!res['data']){
        this.errorMessage = 'Invalid username or password. Try again.';
      this.openSnackBar(this.errorMessage);
      console.log('first error fired');
      }
    }, err => {
      this.errorMessage = 'Invalid username or password. Try again.';
      this.openSnackBar(this.errorMessage);
      console.log(err);
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
