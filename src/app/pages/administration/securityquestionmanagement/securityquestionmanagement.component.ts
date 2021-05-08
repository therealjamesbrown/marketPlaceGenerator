/**
 * 
 * ================================
 * ; Title: securityquestionmanagement.component.ts
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Modified by: James Brown
 * ; Date: 10/25/2020
 * ; Description: component responsible for admin security question page
 * ================================
 * 
 */

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { SecurityQuestionService } from '../services/security-question.service';
import { SecurityQuestion } from '../interfaces/security-question.interface';
import { FormGroup } from '@angular/forms';
import { DeleteSecurityquestionDialogComponent } from '../dialogs/delete-securityquestion-dialog/delete-securityquestion-dialog.component';
import { CreateSecurityquestionDialogComponent } from '../dialogs/create-securityquestion-dialog/create-securityquestion-dialog.component';
import { UpdateSecurityquestionDialogComponent } from '../dialogs/update-securityquestion-dialog/update-securityquestion-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: "app-securityquestionmanagement",
  templateUrl: "./securityquestionmanagement.component.html",
  styleUrls: ["./securityquestionmanagement.component.css"],
})
export class SecurityquestionmanagementComponent implements OnInit {
  securityQuestions: SecurityQuestion[];
  questionId: string;
  displayedColumns: string[] = ["question", "status", "action"];

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private securityQuestionService: SecurityQuestionService
  ) {
    /**
     * Find all Security Questions
     */

    this.securityQuestionService.findAllSecurityQuestions().subscribe(
      (res) => {
        this.securityQuestions = res["data"];
        //console.log(res);
        //console.log(this.securityQuestionService);
      },
      (err) => {
       // console.log(err);
      }
    );
  }

  ngOnInit(): void {}

  /**
   *
   * SECTION FOR SECURITY QUESTION API CALLS (create, update, delete)
   * You'll need to import http client and the related service
   */

  //createSecurityQuestionDialog
  createSecurityQuestion(){
    const dialogRef = this.dialog.open(CreateSecurityquestionDialogComponent, {
      data: {
        
      },
      disableClose: true,
      width: "800px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'create'){

       this.securityQuestionService.findAllSecurityQuestions().subscribe(res => {
         this.securityQuestions = res['data'];
         //console.log(this.securityQuestions);
       }, err => {
         console.log(err);
       })
      }
    })
  }



  //updateSecurityQuestionDialog

 updateSecurityQuestion(data){
  console.log(data);
  const dialogRef = this.dialog.open(UpdateSecurityquestionDialogComponent, {
    data: {
      data,
      dialogHeader: 'Update Security Question'
    },
    disableClose: true,
    width: '800px'
  });

  dialogRef.afterClosed().subscribe(result => {
    if(result === 'update'){
      
      this.securityQuestionService.findAllSecurityQuestions().subscribe(res => {
        this.securityQuestions = res['data'];
        console.log(this.securityQuestions);
      }, err => {
        console.log(err);
      })
    }
  })
}



  //deleteSecurityQuestionDialog

  deleteSecurityQuestion(questionId){
  const dialogRef = this.dialog.open(DeleteSecurityquestionDialogComponent, {
    data: {
      questionId,
      dialogHeader: 'Disabling Question',
      dialogBody: `Are you sure you want to disable security question ${questionId}?`
    },
    disableClose: true,
    width: '800px'
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result == 'confirm') {
      console.log(questionId)
      this.securityQuestionService.deleteSecurityQuestion(questionId).subscribe(res => {
        console.log('Security question successfully disabled')
        this.securityQuestionService.findAllSecurityQuestions().subscribe(res=> {
          this.securityQuestions = res['data'];
          console.log(this.securityQuestions);
        }, err => {
          console.log(err);
        })
      })
    }
  })

}
  
}
