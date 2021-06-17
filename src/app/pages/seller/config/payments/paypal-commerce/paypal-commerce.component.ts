import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-paypal-commerce',
  templateUrl: './paypal-commerce.component.html',
  styleUrls: ['./paypal-commerce.component.css']
})
export class PaypalCommerceComponent implements OnInit {

  environment: any; //sandbox or live
  sandboxClientId: any;
  sandboxSecret: any;
  productionClientId: any;
  productionSecret: any;
  paypalCommerceConfigForm: FormGroup;
  capabilities: any;

  constructor(
    private fb: FormBuilder
  ) { }

  //get the current values of the config and pass them into the form


  ngOnInit(): void {
    this.paypalCommerceConfigForm = this.fb.group({
      environment: ['', Validators.required],
      sandboxClientId: ['', Validators.required],
      sandboxSecret: ['', Validators.required],
      productionClientId: ['', Validators.required],
      productionSecret: ['', Validators.required]
    })
  }

updateConfig(){

  //grab our form values
  const config = {
    environment: this.paypalCommerceConfigForm.controls.environment.value,
    sandboxClientId: this.paypalCommerceConfigForm.controls.sandboxClientId.value,
    sandboxSecret: this.paypalCommerceConfigForm.controls.sandboxSecret.value,
    productionClientId: this.paypalCommerceConfigForm.controls.productionClientId.value,
    productionSecret: this.paypalCommerceConfigForm.controls.productionSecret.value
  }

  console.log(config)
  //need to write our apis to call our server to save the information in the db. 

  
}

}
