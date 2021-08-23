import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SellerServiceService } from '../../../seller-service.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
 

@Component({
  selector: 'app-paypal-commerce',
  templateUrl: './paypal-commerce.component.html',
  styleUrls: ['./paypal-commerce.component.css']
})
export class PaypalCommerceComponent implements OnInit {

  sandboxClientId: any;
  sandboxSecret: any;
  productionClientId: any;
  productionSecret: any;
  capabilities: any;
  actionURL: string;
  miniBrowserURL: string;
  trustedUrl: SafeResourceUrl;
  marketplaceUsername: string;
  sellerUsername: string;
  initPayPalData: any;
  configData;
  configName;
  environment: any;
  merchantIdInPayPal;
  merchant_client_id;
  scopes;
  status;
  payPalConfigIsSetup = false;

  constructor(
    private fb: FormBuilder,
    private SellerService: SellerServiceService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private cookieService: CookieService
  ) {
    //load the import script for the in-context window when the component runs.
    this.loadPayPalUIWindow();

    //get the action url to redirect
this.SellerService.onboardingCall().subscribe(res => {
  this.actionURL = res.data;
 this.sanitizer.bypassSecurityTrustUrl(this.actionURL)
  })

    this.sellerUsername = this.cookieService.get('sessionuser');
    this.marketplaceUsername = this.cookieService.get('marketplaceUsername');


        //get all the configured options.
    this.SellerService.getConfiguredOptions(this.marketplaceUsername, this.sellerUsername).subscribe( res => {
      //if paypal config exists, then 
      if(res[0].environment !== null) {
        this.payPalConfigIsSetup = true;
      };
     console.log(res[0]);
     this.configData = res[0];
     this.configName = this.configData.configName;
     this.environment = this.configData.environment;
     this.merchantIdInPayPal = this.configData.merchantIdInPayPal;
     this.merchant_client_id = this.configData.merchant_client_id;
     this.scopes = this.configData.scopes;
     this.status = this.configData.status;
    })

   }





ngOnInit(): void {}

  
removePayPal(){
  //send an empty post request to overwrite current config
  const config = {
  }

  //need to write our apis to call our server to save the information in the db. 
 this.SellerService.setConfiguredOptions(this.marketplaceUsername, this.sellerUsername, config).subscribe(res => {
  // console.log(res);
 })
}

loadPayPalUIWindow(){
  const node = document.createElement('script');
      node.src = `https://www.paypal.com/webapps/merchantboarding/js/lib/lightbox/partner.js`;
      node.type = 'text/javascript';
      node.async = true;
      document.getElementsByTagName('head')[0].appendChild(node);
}

}
