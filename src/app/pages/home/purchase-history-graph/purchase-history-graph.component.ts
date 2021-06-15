import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserprofileService } from '../../services/userprofile.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-purchase-history-graph',
  templateUrl: './purchase-history-graph.component.html',
  styleUrls: ['./purchase-history-graph.component.css']
})
export class PurchaseHistoryGraphComponent implements OnInit {

  purchases: any;
  sellers: Array<any>;
  data: any;
  industryCount = [];
  labels = [];
  username: any = this.cookieService.get('sessionuser');
  marketplaceId: any = this.cookieService.get('userId')

  constructor(
    private userProfileService: UserprofileService,
    private cookieService: CookieService) {

    //create a class for the seller
    

    //call the api to retrieve a list of sellers
      this.userProfileService.getAllSellers(this.marketplaceId).subscribe(res => {
        this.sellers = res['data'];
  
        //loop the sellers array we got back
        for (const item of this.sellers){
  
          //need to check if an industry is already in the array, if it is don't push it since we want to avoid duplicates. 
          if(!this.labels.includes(item.industry)){
            this.labels.push(item.industry);
          } 
        
          //need to add number of each industry
            this.industryCount.push(item.industry);
            //console.log(this.industryCount);
        }
        let fashionCounter= 0;
        let homeCounter= 0;
        let medicineCounter= 0;
         //now we have the who array of all the values, just need to find out how many each appears then map it to the count
        for (let item of this.industryCount) {
          if (item === "Fashion"){
            fashionCounter ++;
          } else if (item === "Home"){
            homeCounter++;
          } else if (item === "Medicine"){
            medicineCounter++;
          }
        }

        this.data = {
          labels: this.labels,
          datasets: [
            //graph object
            {
              label: 'Number of Sellers',
              data: [fashionCounter, homeCounter, medicineCounter],
              fill: false,
              backgroundColor: [
                '#14a10d',
                'black',
                'white'],
    borderColor: '#2e7d32',
    tension: .04
            }
          ]
        };
      })
   }

  ngOnInit(): void {
  }

}
