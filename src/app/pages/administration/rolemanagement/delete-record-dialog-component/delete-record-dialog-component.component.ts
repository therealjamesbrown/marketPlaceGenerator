/**
 * 
 * ================================
 * ; Title: deleteRecordDialog.component.ts
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Date: 10/14/2020
 * ; Description: component for creating role
 * ================================
 * 
 */


import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-record-dialog-component',
  templateUrl: './delete-record-dialog-component.component.html',
  styleUrls: ['./delete-record-dialog-component.component.css']
})
export class DeleteRecordDialogComponentComponent implements OnInit {

  recordId: string;
  dialogHeader: string;
  dialogBody: string;

  constructor(private dialogRef: MatDialogRef<DeleteRecordDialogComponentComponent>, @Inject(MAT_DIALOG_DATA) data) { 
    this.recordId = data._id;
    this.dialogHeader = data.dialogHeader;
    this.dialogBody = data.dialogBody;
  }

  ngOnInit(): void {
  }

}
