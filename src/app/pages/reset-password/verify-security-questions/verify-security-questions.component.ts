/**
 * 
 * ================================
 * ; Title: verify-security-questions.component.ts
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Date: 10/31/2020
 * ; Description: component for managing security question verification
 * ================================
 * 
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ViewChild } from '@angular/core';
import { VerifyUsernameComponent } from '../verify-username/verify-username.component';  //add
import { ResetPasswordComponent } from '../reset-password/reset-password.component'; //add

//import { SecurityQuestion } from '../../administration/interfaces/security-question.interface';
//import { SelectedSecurityQuestionSchema } from '../../../../../server/schemas/SelectedSecurityQuestionSchema';

import { Securityquestionpwdreset } from '../../../shared/securityquestionpwdreset.interface';

@Component({
  selector: 'app-verify-security-questions',
  templateUrl: './verify-security-questions.component.html',
  styleUrls: ['./verify-security-questions.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class VerifySecurityQuestionsComponent implements OnInit {

  securityQuestions: Securityquestionpwdreset[];
  question1: string;
  question2: string;
  question3: string;
  username: string;
  form2: FormGroup;
  questions;
  errorMessage: string;
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  //begin add
 // @ViewChild(VerifyUsernameComponent) stepOneComponent: VerifyUsernameComponent;
  //@ViewChild(VerifySecurityQuestionsComponent) stepTwoComponent: VerifySecurityQuestionsComponent;
  //@ViewChild(ResetPasswordComponent) stepThreeComponent: ResetPasswordComponent;

  //get frmStepOne() {
  //   return this.stepOneComponent ? this.stepOneComponent.form1 : null;
 // }

  //get frmStepTwo() {
  //   return this.stepTwoComponent ? this.stepTwoComponent.form2 : null;
  //}

  //get frmStepThree() {
 //    return this.stepThreeComponent ? this.stepThreeComponent.form3 : null;
 // }
//end add

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private fb: FormBuilder, private _snackBar: MatSnackBar) {
    this.username=this.route.snapshot.queryParamMap.get('username');
    console.log(this.username);

    this.http.get('api/users/' + this.username + '/security-questions').subscribe(res => {
      this.questions = res['data'];
      //console.log(this.securityQuestions);
      console.log(res);
    }, err => {
      console.log(err);
    }, () => {
      //console.log('i fired')
      //console.log(this.questions.securityQuestions[0].questionText);
      this.question1 = this.questions.securityQuestions[0].questionText;  
      this.question2 = this.questions.securityQuestions[1].questionText;
      this.question3 = this.questions.securityQuestions[2].questionText;

/*
      console.log(this.question1);
      console.log(this.question2);
      console.log(this.question3);*/
    });
   }

  ngOnInit(): void {
    this.form2 = this.fb.group({
      answerToSecurityQuestion1: [null, Validators.compose([Validators.required])],
      answerToSecurityQuestion2: [null, Validators.compose([Validators.required])],
      answerToSecurityQuestion3: [null, Validators.compose([Validators.required])]
    });
  }

   verifySecurityQuestions() {
    const answerToSecurityQuestion1 = this.form2.controls['answerToSecurityQuestion1'].value.trim();
    const answerToSecurityQuestion2 = this.form2.controls['answerToSecurityQuestion2'].value.trim();
    const answerToSecurityQuestion3 = this.form2.controls['answerToSecurityQuestion3'].value.trim();

    console.log(answerToSecurityQuestion1 + answerToSecurityQuestion2 + answerToSecurityQuestion3);

    this.http.post('/api/session/verify/users/' + this.username + '/security-questions', {
      questionText1: this.question1,
      questionText2: this.question2,
      questionText3: this.question3,
      answerText1: answerToSecurityQuestion1,
      answerText2: answerToSecurityQuestion2,
      answerText3: answerToSecurityQuestion3
    }).subscribe( res => {
      console.log(res);
      if(res['message'] === 'Success!') {
        this.router.navigate(['/session/reset-password'], {queryParams: {isAuthenticated: 'true', username: this.username}, skipLocationChange: true})
      } else {
        console.log('Unable to verify security question responses.')
        this.errorMessage = 'Invalid security question answers. Try again.';
        this.openSnackBar(this.errorMessage);

      }
    });
  }

  openSnackBar(errorMessage: string) {
    this._snackBar.open(errorMessage, 'Close', {
      duration: 7000,
      verticalPosition: 'top',
      panelClass: 'error'
    });
  }}