/**
 * 
 * ================================
 * ; Title: userprofile.service.ts
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Modified by: Sarah Kovar
 * ; Date: 10/24/2020
 * ; Description: service responsible for services that relate to the profile page
 * ================================
 * 
 */


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserprofileService {

  constructor(private http: HttpClient) { }

  /**
   * 
   * GET USER DETAILS
   * 
   */
  getUserDetails(username: string): Observable<any>{
    return this.http.get(`/api/users/username/${username}`);
  }



  /**
   * 
   * CHANGE PASSWORD
   * 
   */
   changeUserPassword(username: string, password:string): Observable<any>{
     return this.http.post(`/api/session/users/${username}/reset-password`,{
       password
     });
   }

   /**
    * 
    * GetAllSecurityQuestions
    * 
    */
   getAllSecurityQuestions(): Observable<any>{
     return this.http.get(`/api/securityQuestions`);
   }
   
  /**
   * 
   * CHANGE SECURITY QUESTIONS
   * 
   */
  updateUserContactDetails(userId, firstName, lastName, username, phoneNumber, address, email, role): Observable<any>{
    return this.http.put(`api/users/${userId}`, {
      firstName: firstName,
      lastName: lastName,
      username: username,
      phoneNumber: phoneNumber,
      address: address,
      email: email,
      role: role
    })
  }

  /**
   * 
   * Create Invoice
   * 
   */
  createInvoice(invoice){
    console.log(invoice);
    return this.http.post(`/api/invoices`, {
      lineItem: invoice.lineItems,
      partsAmount: invoice.partsAmount,
      laborAmount: invoice.laborAmount,
      lineItemTotal: invoice.lineItemTotal,
      total: invoice.total,
      username: invoice.userName,
      orderDate: invoice.orderDate
    })
  }


  /**
   * 
   * Get purchases by graph for the user api
   * 
   */
  getUserPurchasesByGraph(username): Observable<any>{
    return this.http.get(`/api/invoices/purchases-graph/user/${username}`);
  }


  /**
   * 
   * Get all sellers by industry
   * 
   */

  getAllSellers(marketplaceId): Observable<any>{
    return this.http.get(`/v1/api/marketplace/${marketplaceId}/locate-sellers`)
  }


  /**
   * 
   * Find User Role
   * 
   */
  getUserRole(username: string): Observable<any>{
    return this.http.get(`/api/users/${username}/role`);
  }
}


