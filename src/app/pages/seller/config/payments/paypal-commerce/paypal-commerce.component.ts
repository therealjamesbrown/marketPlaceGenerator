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

  environment: any; 
  sandboxClientId: any;
  sandboxSecret: any;
  productionClientId: any;
  productionSecret: any;
  paypalCommerceConfigForm: FormGroup;
  capabilities: any;
  actionURL: string;
  miniBrowserURL: string;
  trustedUrl: SafeResourceUrl;
  marketplaceUsername: string;
  sellerUsername: string;
  initPayPalData: any;
  configName;


  constructor(
    private fb: FormBuilder,
    private SellerService: SellerServiceService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private cookieService: CookieService
  ) {
    
    this.sellerUsername = this.cookieService.get('sessionuser');
    this.marketplaceUsername = this.cookieService.get('marketplaceUsername');
    console.log(this.marketplaceUsername)

    this.paypalCommerceConfigForm = this.fb.group({
      environment: [this.environment],
      sandboxClientId: [this.sandboxClientId],
      sandboxSecret: [this.sandboxSecret],
      productionClientId: [this.productionClientId],
      productionSecret: [this.productionSecret]
        })
   

    this.SellerService.getConfiguredOptions(this.marketplaceUsername, this.sellerUsername).subscribe( res => {
     console.log(this.initPayPalData);
      this.initPayPalData = res[0];
     this.environment = this.initPayPalData.environment.toString();
     this.sandboxClientId = this.initPayPalData.sandboxClientId.toString();
     this.sandboxSecret = this.initPayPalData.sandboxSecret.toString();
     this.productionClientId = this.initPayPalData.productionClientId.toString();
     this.productionSecret = this.initPayPalData.productionSecret.toString();
     this.configName = this.initPayPalData.configName.toString();

    this.paypalCommerceConfigForm = this.fb.group({
      environment: [this.environment],
      sandboxClientId: [this.sandboxClientId],
      sandboxSecret: [this.sandboxSecret],
      productionClientId: [this.productionClientId],
      productionSecret: [this.productionSecret]
        })
    })



   }



  //get the current values of the config and pass them into the form
  ngOnInit(): void {


  }

updateConfig(){

  //grab our form values
  const config = {
    configName: this.configName,
    environment: this.paypalCommerceConfigForm.controls.environment.value,
    sandboxClientId: this.paypalCommerceConfigForm.controls.sandboxClientId.value,
    sandboxSecret: this.paypalCommerceConfigForm.controls.sandboxSecret.value,
    productionClientId: this.paypalCommerceConfigForm.controls.productionClientId.value,
    productionSecret: this.paypalCommerceConfigForm.controls.productionSecret.value
  }


  //need to write our apis to call our server to save the information in the db. 
 this.SellerService.setConfiguredOptions(this.marketplaceUsername, this.sellerUsername, config).subscribe(res => {
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
