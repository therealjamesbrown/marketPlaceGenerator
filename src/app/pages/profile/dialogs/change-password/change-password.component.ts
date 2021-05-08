/**
 * 
 * ================================
 * ; Title: changePassword.component.ts
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Modified by: James Brown
 * ; Date: 10/14/2020
 * ; Description: component responsible for changin the user password in the profile page
 * ================================
 * 
 */



import { Component, OnInit } from '@angular/core';
import { UserprofileService } from 'src/app/pages/services/userprofile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, 
  MatSnackBarVerticalPosition 
 } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { SuccessComponent } from '../success/success.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  form: FormGroup;
  errorMessage: string;
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private userProfileServce: UserprofileService,
    private fb: FormBuilder, 
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private cookieService: CookieService,
    private dialog: MatDialog ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      password: [null, Validators.compose([Validators.required])]
    });
  }

changePassword(){
  const username = this.cookieService.get('sessionuser');
  const password = this.form.controls.password.value;

  //console.log(username);
  //console.log(password);

  this.userProfileServce.changeUserPassword(username, password).subscribe(res =>{
    console.log(res)
    if(res['message'] === 'Success!'){
      //open new dialog
      const dialogRef = this.dialog.open(SuccessComponent, {
        width: "100px"
      })

    } else {
      //call snackbar and display failure
      this.errorMessage = 'Something went wrong.';
        this.openSnackBar(this.errorMessage);

    }
  }, err => {
    console.log(err);
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
