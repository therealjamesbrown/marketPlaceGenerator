/**
 * 
 * ================================
 * ; Title: invoice.interface.ts
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Modified by: James Brown
 * ; Date: 10/14/2020
 * ; Description: component responsible for creating new invoices/orders.
 * ================================
 * 
 */
import { Catalog } from '../pages/administration/interfaces/catalog.interface'

export interface Invoice {
    lineItem:      Catalog,
    partsAmount:   { type: Number},
    laborAmount:   { type: Number },
    lineItemTotal: { type: Number },
    total:         { type: Number },
    username:      { type: String },
    orderDate:     { type: Date}
}