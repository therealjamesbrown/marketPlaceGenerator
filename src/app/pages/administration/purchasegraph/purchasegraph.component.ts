/**
 * 
 * ================================
 * ; Title: purchasegraph.component.ts
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Modified by: Sarah Kovar
 * ; Date: 11/6/2020
 * ; Description: component responsible for admin purchase graph
 * ================================
 * 
 */

import { Component, OnInit } from '@angular/core';
import { PurchasehistoryService } from '../../services/purchasehistory.service';
import { CatalogService } from './../services/catalog.service';

@Component({
  selector: 'app-purchasegraph',
  templateUrl: './purchasegraph.component.html',
  styleUrls: ['./purchasegraph.component.css']
})
export class PurchasegraphComponent implements OnInit {
  purchases: any;
  data: any;
  itemCount = [];
  labels = [];

  constructor(private PurchasehistoryService: PurchasehistoryService) { 

    this.PurchasehistoryService.findPurchasesbyServiceGraph().subscribe(res=> {
      this.purchases = res['data'];
      //console.log(this.purchases);
  
  for (const item of this.purchases) {
    this.labels.push(item._id.title);
    this.itemCount.push(item.count);
  }

  this.data = {
    labels: this.labels,
    datasets: [
      {
      backgroundColor: [
        '#ED0A3F',
        '#FF8833',
        '#5FA777',
        '#0066CC',
        '#6B3FA0',
        '#AF593E',
        '#6CDAE7',
        '#F1B60E'
      ],
      hoverBackgroundColor: [
        '#ED0A3F',
        '#FF8833',
        '#5FA777',
        '#0066CC',
        '#6B3FA0',
        '#AF593E',
        '#6CDAE7',
        '#F1B60E'
      ],
      data: this.itemCount
    },
    ]
  };

  //console.log('Data object');
  //console.log(this.data);
  })
}

    /**
       * Find All purchases
       */
  

  ngOnInit(): void {
  }

   /**
   * 
   * SECTION FOR PURCHASES APIS (create, update, delete)
   * You'll need to import http client and the related service
   */
  

}
