/**
 * 
 * ================================
 * ; Title: patch-dialog.component.ts
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Date: 10/14/2020
 * ; Description: User patch dialog component
 * ================================
 * 
 */

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Component({
  selector: 'app-patch-dialog',
  templateUrl: './patch-dialog.component.html',
  styleUrls: ['./patch-dialog.component.css']
})
export class PatchDialogComponent implements OnInit {

  constructor(private cookieService: CookieService, private http: HttpClient) { }

  ngOnInit() { }
  cancel() {

  }
  delete() {
    let id = this.cookieService.get('id')
    this.http.patch(`http://localhost:3000/api/users/${id}`, httpOptions).subscribe(err => {
      if (err) console.log(err)
     else console.log("DELETE Success")
   }) 
  }
}
