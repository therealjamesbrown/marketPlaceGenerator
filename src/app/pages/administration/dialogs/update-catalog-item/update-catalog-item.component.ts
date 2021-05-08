/**
 * 
 * ================================
 * ; Title: updateCatalogItemDialog.component.ts
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Date: 10/14/2020
 * ; Description: component for updating item
 * ================================
 * 
 */



import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CatalogService } from '../../services/catalog.service';

@Component({
  selector: 'app-update-catalog-item',
  templateUrl: './update-catalog-item.component.html',
  styleUrls: ['./update-catalog-item.component.css']
})
export class UpdateCatalogItemComponent implements OnInit {
  title;
  price;
  catalogItemId;
  isDisabled;
  updateCatalogItemForm: FormGroup;
  enteredText:any [];
  options: Boolean[] = [true, false];
  selected;

  constructor(
    private catalogService: CatalogService, 
    private http: HttpClient,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateCatalogItemComponent>,
    @Inject(MAT_DIALOG_DATA) data){ 

      //set the values passed from the parent component
      this.title = data.data.title;
      this.price = data.data.price;
      this.catalogItemId = data.data._id;
      this.isDisabled = data.data.isDisabled;

      this.updateCatalogItemForm = this.fb.group({
      //pass the values into the form
        title: [this.title, Validators.required],
        price: [this.price, Validators.required],
        catalogItemId: [this.catalogItemId],
        isDisabled: [this.isDisabled, Validators.required]
      })
    }

  ngOnInit(): void {
  }

  updateCatalogItem(){
    //get the current values from the form
    const title = this.updateCatalogItemForm.controls.title.value;
    const price = this.updateCatalogItemForm.controls.price.value;
    const catalogItemId = this.updateCatalogItemForm.controls.catalogItemId.value;
    const isDisabled = this.selected;

    //call the service and pass updated form values into the service
    this.catalogService.updateCatalogItem(catalogItemId, title, price, isDisabled).subscribe( res =>{
      catalogItemId
      title
      price
      isDisabled
    }, err => {
      console.log(err);
    })
  }

}
