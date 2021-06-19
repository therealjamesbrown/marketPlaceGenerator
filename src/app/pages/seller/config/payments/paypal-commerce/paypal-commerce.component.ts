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
    
    this.sellerUsername = this.cookieService.get('sessionuser');
    this.marketplaceUsername = this.cookieService.get('marketplaceUsername');


        //get all the configured options.
    this.SellerService.getConfiguredOptions(this.marketplaceUsername, this.sellerUsername).subscribe( res => {
      //if paypal config exists, then 
      if(res[0].environment !== null ) {
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


 /**
  * 
  * 	
  * 
  -check onboarding status  when loading the paypal commerce component.  

	-if paypal is onboarded, then display revoke option within the configure dialog/along with current data. 

	-if PayPal is not onboarded, display connect, which will launch the on boarding flow.
  * 
  * 
  */




   }




  ngOnInit(): void {


  }

  
removePayPal(){

  //grab our form values
  const config = {
  }

  //need to write our apis to call our server to save the information in the db. 
 this.SellerService.setConfiguredOptions(this.marketplaceUsername, this.sellerUsername, config).subscribe(res => {
   console.log(res);
 })
}

onboardPayPal(){
//get the action url to redirect
this.SellerService.onboardingCall().subscribe(res => {
  // console.log(res.data); 
  window.open(res.data);
  this.router.navigate(['/seller/admin']);
 })
}
}
