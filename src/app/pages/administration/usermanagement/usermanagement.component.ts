/**
 * 
 * ================================
 * ; Title: usermanagement.component.ts
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Date: 10/14/2020
 * ; Description: User mgmt component
 * ================================
 * 
 */

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { MatDialog } from '@angular/material/dialog'
import { PostDialogComponent } from '../dialogs/user-admin-post-dialog/post-dialog.component'
import { PutDialogComponent } from '../dialogs/user-admin-put-dialog/put-dialog.component'
import { PatchDialogComponent } from '../dialogs/user-admin-patch-dialog/patch-dialog.component'
import { RoleService } from '../services/role.service';
import { CookieService } from 'ngx-cookie-service';
import { MoreVertDialogComponent } from '../dialogs/user-options-dialog/dialogs/more-vert-dialog/more-vert-dialog.component'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
}
@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css']
})
export class UserManagementComponent implements OnInit {
  
  //Variable Declaration
  users: any
  displayedColumns: any = [ 'username', 'fistName', 'lastName', 'phoneNumber', 'address','isDisabled', 'actions', 'roles']

  constructor(public dialog: MatDialog, private http: HttpClient, private roleService: RoleService, private cookieService: CookieService) { }


  ngOnInit() {
    //Begin Brendans code
    this.http.get('http://localhost:3000/api/users', httpOptions).subscribe(data => {
      this.users = data['data'];
    })
    //end Brendans code
   }

   /**Begin Brendans code */
   post() {
     const dialogRef = this.dialog.open(PostDialogComponent, {
      disableClose: true,
      width:'800px'});
      //added by JB 10/28. After user is submitted, refresh the user list.
      dialogRef.afterClosed().subscribe(result => {
        this.http.get('http://localhost:3000/api/users', httpOptions).subscribe(data => {
      this.users = data['data'];
    })
      })
   }
  options(user) {
    this.cookieService.set('id', user._id)
    this.dialog.open(MoreVertDialogComponent)
  }
  }