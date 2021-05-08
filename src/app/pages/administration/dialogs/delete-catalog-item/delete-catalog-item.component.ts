/**
 * 
 * ================================
 * ; Title: deleteCatalogItemDialog.component.ts
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Date: 10/14/2020
 * ; Description: component for deleting item
 * ================================
 * 
 */

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CatalogService } from '../../services/catalog.service';


@Component({
  selector: 'app-delete-catalog-item',
  templateUrl: './delete-catalog-item.component.html',
  styleUrls: ['./delete-catalog-item.component.css']
})
export class DeleteCatalogItemComponent implements OnInit {

  catalogItemId: string;
  dialogHeader: string;
  dialogBody: string;
  constructor(private dialogRef: MatDialogRef<DeleteCatalogItemComponent>,
    private catalogService: CatalogService,
    @Inject(MAT_DIALOG_DATA) data) {
      console.log(data.catalogItem._id);
      this.catalogItemId = data.catalogItem._id;
      this.dialogHeader = data.dialogHeader;
      this.dialogBody = data.dialogBody;
     }

  ngOnInit(): void {
  }

}
