/**
 * 
 * ================================
 * ; Title: role.service.ts
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Modified by: James Brown
 * ; Date: 10/14/2020
 * ; Description: component responsible for interfacing with our apis for the role-management
 *  component
 * ================================
 * 
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../interfaces/role.interface'

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  //import http client
  constructor(private http: HttpClient) { }


  /**
   * 
   * Find All Roles
   * 
   */
   findAllRoles(): Observable<any>{
     return this.http.get(`/api/roles/`);
   }

   /**
   * 
   * Find Role By ID
   * 
   */
  findRoleById(roleId: string): Observable<any>{
    return this.http.get(`/api/roles/${roleId}`)
  }


   /**
    * 
    * Create Role
    * 
    */
createRole(text: Role): Observable<any>{
  return this.http.post(`/api/roles/`, {
    text: text 
  })
}


  /**
   * 
   * Update Role
   * 
   */
updateRole(roleId: String, text: Role, isDisabled: Boolean): Observable<any>{
  return this.http.put(`/api/roles/${roleId}/update`, {
    text,
    isDisabled
  })
}

  /**
   * 
   * Delete Role
   * 
   */
  deleteRole(roleId: String): Observable<any>{
    return this.http.patch(`/api/roles/${roleId}`,{
      roleId
    })
  }
}
