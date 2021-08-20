/**
 * 
 * ================================
 * ; Title: notfound.component.ts
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Modified by: James Brown
 * ; Date: 10/14/2020
 * ; Description: component responsible for handling 400 errors
 * ================================
 * 
 */


import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {

  role: any = this.cookieService.get('role');
  constructor(private cookieService: CookieService) {
    this.role
   }

  ngOnInit(): void {
  }

}
