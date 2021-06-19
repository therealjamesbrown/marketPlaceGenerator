import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerServiceService {

  constructor(private http: HttpClient) { }



  /**
   * 
   * get configured payment settings
   * 
   */

   getConfiguredOptions(marketplaceUsername, sellerUsername): Observable<any>{
     return this.http.get(`/v1/api/payments/${marketplaceUsername}/${sellerUsername}/configured`);
   }


   /**
   * 
   * update payment settings
   * 
   */
  setConfiguredOptions(marketplaceUsername, sellerUsername, data): Observable<any>{
    return this.http.put(`/v1/api/payments/${marketplaceUsername}/${sellerUsername}/save`,{
      configName: data.configName,
      environment: data.environment,
      sandboxClientId: data.sandboxClientId,
      sandboxSecret: data.sandboxSecret,
      productionClientId: data.productionClientId,
      productionSecret: data.productionSecret
    })
  }


  /**
   * PayPal ONBOARING RELATED STUFF
   * PayPal ONBOARING RELATED STUFF
   * PayPal ONBOARING RELATED STUFF
   * PayPal ONBOARING RELATED STUFF
   */

   
   /**
   * 
   * initiates onboarding with paypal
   * 
   */
  onboardingCall(): Observable<any>{
    return this.http.post(`/v1/api/payments/paypal-commerce/onboard`,{
    });
  }

  /**
   * 
   * paypalOnboardingComplete
   * 
   */

   finalizePayPalOnboarding(marketplaceUsername, sellerUsername, queryData): Observable<any>{
     return this.http.post(`/v1/api/payments/paypal-commerce/onboard/complete`, {
       marketplaceUsername,
       sellerUsername,
       queryData
     })
   }



  /**
   * 
   * get paypal onboarding details
   * 
   */
  getPayPalOnboardingDetails(marketplaceUsername, sellerUsername): Observable<any>{
    return this.http.get(`/v1/api/payments/${marketplaceUsername}/${sellerUsername}/configured`);
  }
}
