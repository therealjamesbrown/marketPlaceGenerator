/**
 * 
 * ================================
 * ; Title: payments.js
 * ; Authors: JB
 * ; Date: 06/12/2021
 * ; Description: Model that connects to the payments collection
 * ================================
 * 
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

/*
import over Catalog so we can use items from the catalog to
 in the line items. 
*/

let paymentsSchema = new Schema({
    paymentMethodName: {type: String, required: true, unique: true},
    isEnabled: {type: Boolean, default: true}  
}, { 
    collection: 'payments'
})

module.exports = mongoose.model('Payments', paymentsSchema);