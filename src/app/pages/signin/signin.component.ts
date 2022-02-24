/**
 * 
 * ================================
 * ; Title: signin.component.ts
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Modified by: James Brown
 * ; Date: 10/14/2020
 * ; Description: component responsible for handling signin form
 * ================================
 * 
 */

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { MatSnackBar, 
  MatSnackBarVerticalPosition 
 } from '@angular/material/snack-bar'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  form: FormGroup;
  errorMessage: string;
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  roles: Array<any> = ['Marketplace', 'Seller', 'Buyer']
  marketplaces: Array<any>;

  constructor(private router: Router, 
    private cookieService: CookieService, 
    private fb: FormBuilder, 
    private http: HttpClient,
    private _snackBar: MatSnackBar) { 
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      userName: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
      sellerUsername: [null, Validators.compose([Validators.required])],
      role: ['marketplace', Validators.compose([Validators.required])]
    });
  }

  signin(){

    const username = this.form.controls.userName.value;
  //  console.log(username)
    const password = this.form.controls.password.value;
    const sellerUsername = this.form.controls.sellerUsername.value;
    const role = this.form.controls.role.value;
    this.cookieService.set('marketplaceUsername', username, 1);
    //console.log(username);
    //console.log(password);
    

    this.http.post('/api/session/signin', {
      username,
      password,
      role,
      sellerUsername

    }).subscribe(res => {
      console.log(res['data']);
      if (res['data'].username){
       // console.log('i work')
        //user authenticated
        //set the username and ID cookies, we'll use these all over the application
        //console.log(res['data']);
        this.cookieService.set('sessionuser', res['data'].username, 1);
        this.cookieService.set('userId', res['data']._id, 1);
        this.cookieService.set('role', res['data'].role, 1);
        
        
        //route based on the role
        if(res['data'].role === 'marketplace'){
          this.router.navigate(['/marketplace']);
        } else if (res['data'].role === 'seller'){
          //setting this for the payments config of paypal for now. will likely be deleting it later. 
          this.cookieService.set('merchantIdinPayPal', res['data'].paymentsConfig[0].merchantIdInPayPal, 1);
          this.router.navigate(['/seller']);
        } else if (res['data'].role === 'buyer'){
          this.router.navigate(['/buyer']);
        }
        //this.router.navigate(['/']);
      }
    }, err => {
      this.errorMessage = 'Invalid username or password. Try again.';
        this.openSnackBar(this.errorMessage);
    });
  }


  openSnackBar(errorMessage: string) {
    this._snackBar.open(errorMessage, 'Close', {
      duration: 7000,
      verticalPosition: 'top',
      panelClass: 'error'
    });
  }
}
