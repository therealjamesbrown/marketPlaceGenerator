/**
 * 
 * ================================
 * ; Title: role.guard.ts
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Modified by: James Brown
 * ; Date: 11/5/2020
 * ; Description: Role Guard
 * ================================
 * 
 */


import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
//import { RoleService} from '../pages/administration/services/role.service';
import { UserprofileService } from '../pages/services/userprofile.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  
  //constructor(private router: Router, private cookieService: CookieService, private roleService: RoleService) {}
  constructor(private router: Router, private cookieService: CookieService, private UserprofileService: UserprofileService) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
    {
     // return this.roleService.findUserRole(this.cookieService.get('sessionuser')).pipe(map(res =>
     return this.UserprofileService.getUserRole(this.cookieService.get('sessionuser')).pipe(map(res =>
        {
          if (res['data'].role === 'admin')
          {
            return true;
          }
          else{
            //this.router.navigate(['/']);
            return false;
          }
    }));
  }
  
}

