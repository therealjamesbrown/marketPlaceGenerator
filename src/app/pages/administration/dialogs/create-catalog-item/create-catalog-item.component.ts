/**
 * 
 * ================================
 * ; Title: createCatalogItemdialog.component.ts
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Date: 10/14/2020
 * ; Description: component for creating role
 * ================================
 * 
 */

import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CatalogService } from '../../services/catalog.service';

@Component({
  selector: 'app-create-catalog-item',
  templateUrl: './create-catalog-item.component.html',
  styleUrls: ['./create-catalog-item.component.css']
})
export class CreateCatalogItemComponent implements OnInit {

  constructor(
    private catalogService: CatalogService, 
    private http: HttpClient, 
    private fb: FormBuilder, 
    private dialogRef: MatDialogRef<CreateCatalogItemComponent>, 
    @Inject(MAT_DIALOG_DATA) data) { }

//bring in our interface
text: any;
createCatalogItemForm: FormGroup;
enteredText:any [];

  ngOnInit(): void {
    this.createCatalogItemForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required]
    })
  }

  createCatalogItem(){
    const title = this.createCatalogItemForm.controls.title.value;
    const price = this.createCatalogItemForm.controls.price.value;

    this.catalogService.createCatalogItem(title, price).subscribe( res => {
      title
      price
    }, err => {
      console.log(err);
    })
  }

}
