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
createRoleForm: FormGroup;
enteredText:any [];

  ngOnInit(): void {
    this.createRoleForm = this.fb.group({
      text: ['', Validators.required]
    })
  }

    //create the role and insert it into the db
 createRole(){
  
  const text = this.createRoleForm.controls.text.value;
  console.log(text);
  this.marketPlaceService.createRole(text).subscribe( res => {
    text
  }, err => {
    console.log(err)
    alert(`There was an issue creating the role. Please ensure the role doesnt already exist. If this issue is reoccurring, please contact the system admin.`);
  })
}
}
