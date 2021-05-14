import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MarketplaceService } from './marketplace.service';




@Component({
  selector: 'app-create-market-place-dialogue',
  templateUrl: './create-market-place-dialogue.component.html',
  styleUrls: ['./create-market-place-dialogue.component.css']
})
export class CreateMarketPlaceDialogueComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private marketPlaceService: MarketplaceService,
    private fb: FormBuilder, 
    @Inject(MAT_DIALOG_DATA) data
    ) { }

//bring in our interface
text: any;
createMarketplaceForm: FormGroup;
enteredText:any [];
industryDataSource: any[] = [
  {
    value: 'Automotive',
  },
  {
    value: 'Sports',
  },
  {
    value: 'Medicine',
  },
  {
    value: 'Technology',
  }
];



  ngOnInit(): void {
    console.log(this.industryDataSource);
    this.createMarketplaceForm = this.fb.group({
      username: ['', Validators.required],
      businessName: ['', Validators.required],
      industry: ['', Validators.required],
      type: [{value: 'marketplace', disabled: true}, Validators.required],
      contactFirstName: ['', Validators.required],
      contactLastName: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      securityQuestions: ['', Validators.required]
    })
  }

//create the marketplace object by grabbing form values and post it to the api with the marketplace service
 createMarketplace(){

  const marketplace = {
    username: this.createMarketplaceForm.controls.username.value,
    businessName: this.createMarketplaceForm.controls.businessName.value,
    industry: this.createMarketplaceForm.controls.industry.value,
    type: this.createMarketplaceForm.controls.type.value,
    contactFirstName: this.createMarketplaceForm.controls.contactLastName.value,
    contactLastName: this.createMarketplaceForm.controls.contactLastName.value,
    phone: this.createMarketplaceForm.controls.phone.value,
    address: this.createMarketplaceForm.controls.address.value,
    email: this.createMarketplaceForm.controls.email.value,
    password: this.createMarketplaceForm.controls.password.value,
    securityQuestions: this.createMarketplaceForm.controls.securityQuestions.value
  }

  console.log(marketplace);


  this.marketPlaceService.createRole(marketplace).subscribe( res => {
    marketplace
  }, err => {
    console.log(err)
    alert(`There was an issue creating the role. Please ensure the role doesnt already exist. If this issue is reoccurring, please contact the system admin.`);
  })
}
}
