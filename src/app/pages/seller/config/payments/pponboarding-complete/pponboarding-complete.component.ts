import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { SellerServiceService } from '../../../seller-service.service';

@Component({
  selector: 'app-pponboarding-complete',
  templateUrl: './pponboarding-complete.component.html',
  styleUrls: ['./pponboarding-complete.component.css']
})
export class PponboardingCompleteComponent implements OnInit {

  queryData;
  marketplaceUsername;
  sellerUserId;

  constructor(
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private cookieService: CookieService,
    private sellerService: SellerServiceService
  ) {
    //grab the query strings.
    this.queryData = this.activatedRoute.snapshot.queryParams;

    this.marketplaceUsername = this.cookieService.get('marketplaceUsername');
    this.sellerUserId = this.cookieService.get('sessionuser');
    this.cookieService.set('merchantIdinPayPal', this.queryData.merchantIdInPayPal, 1);
  
    //make a post to update the seller paymentconfig with the payment configuration.
  //make sure to send a call from the server side to PayPal to get the status back.
 // console.log(this.queryData)
this.sellerService.finalizePayPalOnboarding(this.marketplaceUsername, this.sellerUserId, this.queryData).subscribe(res => {
  //redirect back home
  this.router.navigate(['/seller/admin']);
})
   }

   /***
    * 
    * 
    *  is the object that you get from paypal
    * accountStatus: "BUSINESS_ACCOUNT"
consentStatus: "true"
isEmailConfirmed: "true"
merchantId: "shyanallen"
merchantIdInPayPal: "4ZPY26LB7PB76"
permissionsGranted: "true"
productIntentID: "addipmt"
productIntentId: "addipmt"
    * 
    * 
    */

  ngOnInit(): void {
  }

}
