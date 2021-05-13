/**
 * 
 * ================================
 * ; Title: marketplace.service.ts
 * ; Authors: James Brown
 * ; Date: 10/14/2020
 * ; Description: component responsible for interfacing with our apis for the marketplace creation
 * ================================
 * 
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Marketplace } from './createMarketplace.interface';

@Injectable({
    providedIn: 'root'
  })
  export class MarketplaceService {
        //import http client
  constructor(private http: HttpClient) {   }

   /**
    * 
    * Create Marketplace
    * 
    */
createRole(Marketplace): Observable<any>{
    return this.http.post(`/api/roles/`, {
      username: Marketplace.username,
      businessName: Marketplace.businessName,
      industry: Marketplace.industry,
      type: Marketplace.type,
      contactFirstName: Marketplace.contactFirstName,
      contactLastName: Marketplace.contactLastName,
      phone: Marketplace.phone,
      address: Marketplace.address,
      email: Marketplace.email,
      password: Marketplace.password,
      securityQuestions: Marketplace.securityQuestions
    })
  }
  

  }