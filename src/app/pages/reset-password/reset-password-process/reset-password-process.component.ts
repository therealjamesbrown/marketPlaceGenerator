/**
 * 
 * ================================
 * ; Title: reset-password-process.component.ts
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Date: 10/31/2020
 * ; Description: component for managing mat stepper
 * ================================
 * 
 */

import { Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

//import { StepOneComponent } from './step-one.component';
import { VerifyUsernameComponent } from '../verify-username/verify-username.component';

//import { StepTwoComponent } from './step-two.component';
import { VerifySecurityQuestionsComponent } from '../verify-security-questions/verify-security-questions.component';

//import { StepThreeComponent } from './step-three.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';


@Component({
  selector: 'app-reset-password-process',
  templateUrl: './reset-password-process.component.html',
  styleUrls: ['./reset-password-process.component.css']
})
export class ResetPasswordProcessComponent {

  @ViewChild(VerifyUsernameComponent) stepOneComponent: VerifyUsernameComponent;
  @ViewChild(VerifySecurityQuestionsComponent) stepTwoComponent: VerifySecurityQuestionsComponent;
  @ViewChild(ResetPasswordComponent) stepThreeComponent: ResetPasswordComponent;

  get form1() {
     return this.stepOneComponent ? this.stepOneComponent.form1 : null;
  }

  get form2() {
     return this.stepTwoComponent ? this.stepTwoComponent.form2 : null;
  }

  get form3() {
     return this.stepThreeComponent ? this.stepThreeComponent.form3 : null;
  }

  constructor(private fb: FormBuilder) { }


}





