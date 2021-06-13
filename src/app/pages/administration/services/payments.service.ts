/**
 * 
 * service that interacts with the payment services api from the client
 * 
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private http: HttpClient) { }

 //create payment service
 createPaymentService(paymentMethodName:string): Observable<any>{
   return this.http.post('/v1/api/payments/register', {
     paymentMethodName
   })
 }

  //find all payments services
  findAllPaymentServices(): Observable<any>{
    return this.http.get('/v1/api/payments');
  }



  //update payment service
  updatePaymentService(paymentMethodID: string, isEnabled: boolean): Observable<any>{
    console.log(isEnabled);
    return this.http.patch(`/v1/api/payments/update/${paymentMethodID}`, {
      status: isEnabled
    })
  }
}
