import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
