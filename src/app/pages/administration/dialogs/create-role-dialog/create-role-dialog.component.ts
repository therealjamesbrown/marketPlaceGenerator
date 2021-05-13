/**
 * 
 * ================================
 * ; Title: createRoledialog.component.ts
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Date: 10/14/2020
 * ; Description: component for creating role
 * ================================
 * 
 */

import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Role } from '../../interfaces/role.interface';
import { RoleService } from 'src/app/pages/administration/services/role.service';


@Component({
  selector: 'app-create-role-dialog',
  templateUrl: './create-role-dialog.component.html',
  styleUrls: ['./create-role-dialog.component.css']
})
export class CreateRoleDialogComponent implements OnInit {
 
constructor(
  private roleServce: RoleService, 
  private http: HttpClient, 
  private fb: FormBuilder, 
  private dialogRef: MatDialogRef<CreateRoleDialogComponent>, 
  @Inject(MAT_DIALOG_DATA) data) { }

//bring in our interface
text: any;
createRoleForm: FormGroup;
enteredText:any [];

  ngOnInit(): void {
    this.createRoleForm = this.fb.group({
      text: ['', Validators.required]
    })
  }

  //create the role and insert it into the db
 createRole(){
  
  const text = this.createRoleForm.controls.text.value;
  console.log(text);
  this.roleServce.createRole(text).subscribe( res => {
    text
  }, err => {
    console.log(err)
    alert(`There was an issue creating the role. Please ensure the role doesnt already exist. If this issue is reoccurring, please contact the system admin.`);
  })
}
}
