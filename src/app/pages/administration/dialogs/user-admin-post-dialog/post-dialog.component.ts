/**
 * 
 * ================================
 * ; Title: post-dialog.component.ts
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Date: 10/14/2020
 * ; Description: User post dialog component
 * ================================
 * 
 */

import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms'
import { HttpClient, HttpHeaders } from '@angular/common/http'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
}

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.css']
})
export class PostDialogComponent implements OnInit {
  createUserForm: any
  roles: any
  selected: any
  role: any
  constructor(private fb: FormBuilder, private http: HttpClient) { }


  ngOnInit() {
    this.http.get('/api/roles').subscribe(res => {
      this.roles = res['data']
    })
    this.createUserForm = this.fb.group({
      username: [null, Validators.compose([Validators.required])],
      password:  [null, Validators.compose([Validators.required])],
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      address: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required])],
      phoneNumber: [null, Validators.compose([Validators.required])],
      role: [null, Validators.required]
    })
  }
  createUser() {
    let newUser = {
      username: this.createUserForm.get('username').value,
      password: this.createUserForm.get('password').value,
      firstName: this.createUserForm.get('firstName').value,
      lastName: this.createUserForm.get('lastName').value,
      address: this.createUserForm.get('address').value,
      email: this.createUserForm.get('email').value,
      phoneNumber: this.createUserForm.get('phoneNumber').value,
      role: this.createUserForm.controls.role.value
    }
    this.http.post('http://localhost:3000/api/users', newUser, httpOptions).subscribe(err => {
      if (err) console.log(err)
      else console.log("POST SUCCESS")
    }) 
    this.createUserForm.reset();
  }
  cancel() {

  }
}
