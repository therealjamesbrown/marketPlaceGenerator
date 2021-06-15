import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateMarketPlaceDialogueComponent } from '../../base-layout/create-market-place-dialogue/create-market-place-dialogue.component';
import { CreateSellerComponent } from '../../base-layout/create-seller/create-seller.component'


@Component({
  selector: 'app-create-dialogue',
  templateUrl: './create-dialogue.component.html',
  styleUrls: ['./create-dialogue.component.css']
})
export class CreateDialogueComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  
/**
 * 
 * function launch dialog to create the marketplace user
 * 
 */
//createRoleDialog
createMarketplace(){
  const dialogRef = this.dialog.open(CreateMarketPlaceDialogueComponent, {
    data: {
      
    },
    width: "800px"
  });

  dialogRef.afterClosed().subscribe(result => {
   
  })
}

/**
 * 
 * function launch dialog to create the marketplace user
 * 
 */
//createRoleDialog
registerSeller(){
  const dialogRef = this.dialog.open(CreateSellerComponent, {
    data: {
      
    },
    width: "800px"
  });

  dialogRef.afterClosed().subscribe(result => {
   
  })
}


}
