/**
 * 
 * ================================
 * ; Title: delete-security-question-dialog.component.ts
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Modified by: Sarah Kovar
 * ; Date: 10/26/2020
 * ; Description: Security Question Soft Delete Dialog Component
 * ================================
 * 
 */

import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-delete-securityquestion-dialog',
  templateUrl: './delete-securityquestion-dialog.component.html',
  styleUrls: ['./delete-securityquestion-dialog.component.css']
})
export class DeleteSecurityquestionDialogComponent implements OnInit {

  questionId: string;
  //_id: string;
  dialogHeader: string;
  dialogBody: string;


  constructor(private dialogRef: MatDialogRef<DeleteSecurityquestionDialogComponent>,   
    @Inject(MAT_DIALOG_DATA) data) { 

    //this._id = data._id;
    this.questionId = data._id;
    this.dialogHeader = data.dialogHeader;
    this.dialogBody = data.dialogBody;
  }

  ngOnInit(): void {
  }

}
