/**
 * 
 * ================================
 * ; Title: more-vert-dialog.component.ts
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Date: 10/14/2020
 * ; Description: User more-vert-dialog component
 * ================================
 * 
 */

import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'
import { MatDialog } from '@angular/material/dialog'
import { PutDialogComponent } from '../../../user-admin-put-dialog/put-dialog.component'
import { PatchDialogComponent } from '../../../user-admin-patch-dialog/patch-dialog.component'

@Component({
  selector: 'app-more-vert-dialog',
  templateUrl: './more-vert-dialog.component.html',
  styleUrls: ['./more-vert-dialog.component.css']
})
export class MoreVertDialogComponent implements OnInit {

  constructor(private dialog: MatDialog, private cookieService: CookieService) { }

  ngOnInit(): void {
  }
  update() {
    this.dialog.open(PutDialogComponent)
   }
   delete() {
    this.dialog.open(PatchDialogComponent)
  } 
}
