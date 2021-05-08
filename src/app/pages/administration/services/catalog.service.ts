/**
 * 
 * ================================
 * ; Title: catalog.service.ts
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Modified by: Sarah Kovar
 * ; Date: 10/27/2020
 * ; Description: service for catalog api requests
 * ================================
 * 
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Catalog } from '../interfaces/catalog.interface';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private http: HttpClient) { }

  /**
     * 
     * Find All Items
     * 
     */
    findAllCatalogItems(): Observable<any>{
      return this.http.get('/api/catalog/');
    }

    /**
     * 
     * Find Item By Id
     * 
     */
    findCatalogItemById(catalogId: string): Observable<any>{
      return this.http.get(`/api/catalog/${catalogId}`)
    }

    /**
     * 
     * Create Item
     * 
     */
    createCatalogItem(title: string, price: number): Observable<any>{
      return this.http.post('/api/catalog/',{
        title,
        price
      })
    }

    /**
     * 
     * Update Item
     * 
     */
    updateCatalogItem(catalogItemId: string, title: string, price:number, isDisabled: boolean): Observable<any>{
      return this.http.put(`/api/catalog/${catalogItemId}/update`,{
        title,
        price,
        isDisabled
      })
    }

    /**
     * 
     * Delete Item
     * 
     */
    deleteCatalogItem(catalogId: string): Observable<any>{
      return this.http.patch(`/api/catalog/${catalogId}`,{
        //nothing needs to be passed since we have the disable written at the api level
      })
    }
}
