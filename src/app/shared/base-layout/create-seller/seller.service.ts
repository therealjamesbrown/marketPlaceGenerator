/**
 * 
 * ================================
 * ; Title: Seller.service.ts
 * ; Authors: James Brown
 * ; Date: 10/14/2020
 * ; Description: component responsible for interfacing with our apis for the Seller creation
 * ================================
 * 
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class SellerService {
        //import http client
  constructor(private http: HttpClient) {   }


   /**
    * 
    * Create Seller
    * 
    */
createSeller(seller, marketplaceId): Observable<any>{
    console.log(seller.businessName);
    return this.http.post(`/v1/api/marketplaces/seller/${marketplaceId}/register`, {
      username: seller.username,
      businessName: seller.businessName,
      industry: seller.industry,
      type: seller.type,
      contactFirstName: seller.contactFirstName,
      contactLastName: seller.contactLastName,
      phone: seller.phone,
      address: seller.address,
      email: seller.email,
      password: seller.password,
      securityQuestions: seller.securityQuestions
    })
  }


  /**
   * 
   * Find all sellers registered on marketplace
   * 
   */
  findAllSellers(marketplaceId): Observable<any>{
    return this.http.get(`/v1/api/marketplaces/seller/${marketplaceId}`)
  }

  }