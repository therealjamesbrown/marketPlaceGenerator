/**
 * 
 * ================================
 * ; Title: error.component.ts
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Modified by: James Brown
 * ; Date: 10/14/2020
 * ; Description: component responsible for handling 500 server errors
 * ================================
 * 
 */

import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  role: any = this.cookieService.get('role');
  constructor(private cookieService: CookieService) {
    this.role
   }

  ngOnInit(): void {
  }

}
