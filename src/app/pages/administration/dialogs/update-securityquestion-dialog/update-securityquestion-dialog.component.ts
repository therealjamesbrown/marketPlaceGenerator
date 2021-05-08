/**
 * 
 * ================================
 * ; Title: update-securityquestion-dialog.component.ts
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Modified by: Sarah Kovar
 * ; Date: 10/27/2020
 * ; Description: Security Question Update Component
 * ================================
 * 
 */

import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SecurityQuestionService } from '../../services/security-question.service';



@Component({
  selector: 'app-update-securityquestion-dialog',
  templateUrl: './update-securityquestion-dialog.component.html',
  styleUrls: ['./update-securityquestion-dialog.component.css']
})
export class UpdateSecurityquestionDialogComponent implements OnInit {

  questionId;
  securityQuestionId;
  isDisabled;
  updateSecurityQuestionForm: FormGroup;
  enteredText:any [];
  options: Boolean[] = [true, false];
  selected;

  constructor(private SecurityQuestionService: SecurityQuestionService, private http: HttpClient, private fb: FormBuilder, private dialogRef: MatDialogRef<UpdateSecurityquestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

      this.questionId = data.data.questionId;
      this.securityQuestionId = data.data._id;
      this.isDisabled = data.data.isDisabled;
      this.updateSecurityQuestionForm = this.fb.group({
        questionId: [this.questionId, Validators.required],
        securityQuestionId: [this.securityQuestionId],
        isDisabled: [this.isDisabled, Validators.required]
      })
     }

  ngOnInit(): void {
  }

  updateSecurityQuestion() {
    const questionId = this.updateSecurityQuestionForm.controls.questionId.value;
    const securityQuestionId = this.updateSecurityQuestionForm.controls.securityQuestionId.value;
    const isDisabled = this.selected;

    this.SecurityQuestionService.updateSecurityQuestion(securityQuestionId, questionId, isDisabled).subscribe( res => {
      securityQuestionId
      questionId
      isDisabled
    }, err => {
      console.log(err);
    })
  }

}







 
