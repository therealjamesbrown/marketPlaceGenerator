/**
 * 
 * ================================
 * ; Title: administration.component.ts
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Modified by: James Brown
 * ; Date: 10/14/2020
 * ; Description: component responsible for administration page
 * ================================
 * 
 */

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})


export class AdministrationComponent implements OnInit {
  
  //Variable Declaration
  users: any


  constructor() { }
  ngOnInit() { }   
  
}

