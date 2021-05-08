/**
 * 
 * ================================
 * ; Title: invoice.js
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Modified by: James Brown
 * ; Date: 10/14/2020
 * ; Description: Model that connects to the invoice collection
 * ================================
 * 
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

/*
import over Catalog so we can use items from the catalog to
 in the line items. 
*/
const CatalogItemSchema = require('../schemas/catalog-item');

let invoiceSchema = new Schema({
    lineItem:      [CatalogItemSchema],
    partsAmount:   { type: Number},
    laborAmount:   { type: Number },
    lineItemTotal: { type: Number },
    total:         { type: Number },
    username:      { type: String },
    orderDate:     { type: Date},
    isDisabled: {type: Boolean, default: false}  //added by SK 10/23/20 to allow us to do a soft delete vs hard delete
}, { 
    collection: 'invoice'
})

module.exports = mongoose.model('Invoice', invoiceSchema)