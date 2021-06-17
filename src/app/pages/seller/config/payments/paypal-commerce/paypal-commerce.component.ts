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

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.paypalCommerceConfigForm = this.fb.group({
      environment: [''],
      sandboxClientId: ['', Validators.required],
      sandboxSecret: ['', Validators.required],
      productionClientId: ['', Validators.required],
      productionSecret: ['', Validators.required]
    })
  }

updateConfig(){
  
}

}
