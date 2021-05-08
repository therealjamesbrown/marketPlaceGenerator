/**
 * 
 * ================================
 * ; Title: create-securityquestion-dialog.component.ts
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Modified by: Sarah Kovar
 * ; Date: 10/26/2020
 * ; Description: Create Security Question Dialog Component
 * ================================
 * 
 */

import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SecurityQuestionService } from '../../services/security-question.service';



@Component({
  selector: 'app-create-securityquestion-dialog',
  templateUrl: './create-securityquestion-dialog.component.html',
  styleUrls: ['./create-securityquestion-dialog.component.css']
})
export class CreateSecurityquestionDialogComponent implements OnInit {

  constructor(private fb: FormBuilder, private SecurityQuestionService: SecurityQuestionService, private http: HttpClient, private dialogRef: MatDialogRef<CreateSecurityquestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) { }

    questionId: string;
    createSecurityQuestionForm: FormGroup;
    enteredQuestionId: any [];


  ngOnInit(): void {
    this.createSecurityQuestionForm = this.fb.group({
      questionId: ['', Validators.required]
    })
  }

 createSecurityQuestion(){
  
  const questionId = this.createSecurityQuestionForm.controls.questionId.value;

  console.log(questionId);
  this.SecurityQuestionService.createSecurityQuestion(questionId).subscribe( res => {
    questionId
  }, err => {
    console.log(err)
    alert(`There was an issue creating the security question. Please ensure the question doesn't already exist. If this issue is reoccurring, please contact the system admin.`);
  })
}
}
