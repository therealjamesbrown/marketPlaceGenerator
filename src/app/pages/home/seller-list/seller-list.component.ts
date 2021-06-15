import { Component, OnInit, Inject } from '@angular/core';
import { SellerService } from 'src/app/shared/base-layout/create-seller/seller.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';


@Component({
  selector: 'app-seller-list',
  templateUrl: './seller-list.component.html',
  styleUrls: ['./seller-list.component.css']
})
export class SellerListComponent implements OnInit {

  constructor(
    private sellerService: SellerService,
    private cookieService: CookieService    
  ) { }

  marketplaceId;
  sellerListDataSource: Array<any>;
  displayedColumns: string[] = ['businessName', 'industry', 'email', 'dateCreated'];
  ngOnInit(): void {

    //grab the marketplace id
    this.marketplaceId = this.cookieService.get('userId');

    //call the service to get all sellers
    this.sellerService.findAllSellers(this.marketplaceId).subscribe( res => {
      this.sellerListDataSource = res.data.sellers;    
      //console.log(this.sellerListDataSource)
      //take the above var and loop the sellers and map them to a table on the client view side. 
    })
  }

}
