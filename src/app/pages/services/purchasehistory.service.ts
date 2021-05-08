/**
 * 
 * ================================
 * ; Title: purchasehistory.service.ts
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Modified by: Sarah Kovar
 * ; Date: 10/27/2020
 * ; Description: service for purchase history api requests
 * ================================
 * 
 */


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchasehistoryService {

  constructor(private http: HttpClient) { }


  /**
   * 
   * Find all purchases from invoice collection
   * 
   */

   findAllPurchasesByUserName(username): Observable<any>{
     return this.http.get(`/api/invoices/user/${username}`)
   }


   /**
    * 
    * Archive Transactions
    * 
    */
    archiveTransaction(invoideId): Observable<any>{
      return this.http.patch(`/api/invoices/${invoideId}`,{
        //no need to pass any body
      })
    }

  findPurchasesbyServiceGraph() {
    return this.http.get ('/api/invoices/purchases-graph');
  }


}
