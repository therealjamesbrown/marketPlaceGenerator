/**
 * 
 * ================================
 * ; Title: updateRoledialog.component.ts
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Date: 10/14/2020
 * ; Description: component for updating role
 * ================================
 * 
 */

import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoleService } from '../../services/role.service';
import { MatSelectModule } from '@angular/material/select'

@Component({
  selector: 'app-update-role-dialog',
  templateUrl: './update-role-dialog.component.html',
  styleUrls: ['./update-role-dialog.component.css']
})
export class UpdateRoleDialogComponent implements OnInit {
  text;
  roleId;
  isDisabled;
  updateRoleForm: FormGroup;
  enteredText:any [];
  options: Boolean[] = [true, false];
  selected;
  constructor(private roleServce: RoleService, private http: HttpClient, private fb: FormBuilder, private dialogRef: MatDialogRef<UpdateRoleDialogComponent>, @Inject(MAT_DIALOG_DATA) data) { 
    this.text = data.data.text;
    this.roleId = data.data._id;
    this.isDisabled = data.data.isDisabled;
    
    this.updateRoleForm = this.fb.group({
      text: [this.text, Validators.required],
      roleId: [this.roleId],
      isDisabled: [this.isDisabled, Validators.required]
    });
  }
  

  ngOnInit(): void {
  }

updateRole(){
  const text = this.updateRoleForm.controls.text.value;
  const roleId = this.updateRoleForm.controls.roleId.value;
  const isDisabled = this.selected;

  this.roleServce.updateRole(roleId, text, isDisabled).subscribe( res => {
    text
    roleId
    isDisabled
  }, err => {
    console.log(err);
  })
}
}
