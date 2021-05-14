/**
 * 
 * ================================
 * ; Title: changeSecurityQuestions.component.ts
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Modified by: James Brown
 * ; Date: 10/14/2020
 * ; Description: component responsible for changin the user security questions in the profile page
 * ================================
 * 
 */

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { UserprofileService } from 'src/app/pages/services/userprofile.service';
import { SuccessComponent } from '../success/success.component';

@Component({
  selector: 'app-change-security-questions',
  templateUrl: './change-security-questions.component.html',
  styleUrls: ['./change-security-questions.component.css']
})
export class ChangeSecurityQuestionsComponent implements OnInit {

securityQuestionsDataSource: any[];
filteredSecurityQuestionsDataSource: any[];
form: FormGroup;
errorMessage: string;
verticalPosition: MatSnackBarVerticalPosition = 'bottom';
username: string =  this.cookieService.get('sessionuser');;
userId: string = this.cookieService.get('userId');;


  constructor(
    private userProfileService: UserprofileService,
    private fb: FormBuilder, 
    private _snackBar: MatSnackBar,
    private cookieService: CookieService,
    private dialog: MatDialog,
    private http: HttpClient) {
    this.userProfileService.getAllSecurityQuestions().subscribe(res =>{
      //console.log(res.data);
      //get all the security questions and set it to our initial data array
      this.securityQuestionsDataSource = res.data;

      //Initialize the new array, filter out the disabled ones, and pushed the active ones into the new array
      this.filteredSecurityQuestionsDataSource = [];
      for (let question of this.securityQuestionsDataSource){
        if(question.isDisabled !== true){
          this.filteredSecurityQuestionsDataSource.push(question);
        } 
      }
      //console.log(this.filteredSecurityQuestionsDataSource);
    })
   } 

  ngOnInit(): void {
    //set the form up so we can get access to the selected questions and entered answers
    this.form = this.fb.group({
      securityQuestionSeletedOne: [null, Validators.compose([Validators.required])],
      securityQuestionOneAnswer: [null, Validators.compose([Validators.required])],
      securityQuestionSeletedTwo: [null, Validators.compose([Validators.required])],
      securityQuestionTwoAnswer: [null, Validators.compose([Validators.required])],
      securityQuestionSeletedThree: [null, Validators.compose([Validators.required])],
      securityQuestionThreeAnswer: [null, Validators.compose([Validators.required])],
    });
  }

  changeSecurityQuestions(){
    const securityQuestionSeletedOne = this.form.controls.securityQuestionSeletedOne.value;
    const securityQuestionOneAnswer =  this.form.controls.securityQuestionOneAnswer.value;
    const securityQuestionSeletedTwo = this.form.controls.securityQuestionSeletedTwo.value;
    const securityQuestionTwoAnswer = this.form.controls.securityQuestionTwoAnswer.value;
    const securityQuestionSeletedThree = this.form.controls.securityQuestionSeletedThree.value;
    const securityQuestionThreeAnswer = this.form.controls.securityQuestionThreeAnswer.value;

    /*
    console.log(securityQuestionOneAnswer);
    console.log(securityQuestionSeletedOne);
    console.log(securityQuestionSeletedTwo);
    console.log(securityQuestionTwoAnswer);
    console.log(securityQuestionSeletedThree);
    console.log(securityQuestionThreeAnswer);
    */

    /**
     * 
     * Make the post request to update the questions
     * 
     */
    this.http.put(`api/users/${this.username}/security-questions`, {
      securityQuestions: [
        {
          questionText: securityQuestionSeletedOne,
          answerText: securityQuestionOneAnswer
        },
        {
          questionText: securityQuestionSeletedTwo,
          answerText: securityQuestionTwoAnswer
        },
        {
          questionText: securityQuestionSeletedThree,
          answerText: securityQuestionThreeAnswer
        }
      ]
    }).subscribe(res => {
      //console.log(res);
      if(res['message'] === 'Success!'){
        //open new dialog
        const dialogRef = this.dialog.open(SuccessComponent, {
          width: "100px"
        })
  
      } else {
        //call snackbar and display failure
   //call snackbar and display failure
   this.errorMessage = 'Something went wrong.';
   this.openSnackBar(this.errorMessage);
  
      }
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
