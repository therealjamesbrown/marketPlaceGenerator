/**
 * 
 * ================================
 * ; Title: auth.guard.ts
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Modified by: James Brown
 * ; Date: 10/14/2020
 * ; Description: file used for checking if a cookie was set/
 *                user has authorization to access a given page. 
 * ================================
 * 
 */

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  //import our cookie service and router so we can use them with this guard
  constructor(private router: Router, private cookieService: CookieService){

  }

  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = this.cookieService.get('sessionuser');
    if(isAuthenticated){
      return true;
    } else {
    //if no sessionUser is present, then redirect them to the signin page.
    this.router.navigate(['/session/signin']);
    return false;
   }
  }
}
