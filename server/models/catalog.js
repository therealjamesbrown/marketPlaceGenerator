/**
 * 
 * ================================
 * ; Title: Catalog.js
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Modified by: James Brown
 * ; Date: 10/14/2020
 * ; Description: Model that connects to the catalog collection
 * ================================
 * 
 */

/**
 * --For my own sanity... JB--
 * The main difference between the schema and model is that the model
 * connects to the DB and the schema doesn't. We should only use the model
 * when we are needing to interact with that collection of data. If
 * we are just enforcing the rules of the model in another model, 
 * we should create a separate schema to mirror the rules.
 * 
 */

let mongoose = require('mongoose')

let Schema = mongoose.Schema;

let CatalogSchema = new Schema({
    title: { type: String },
    price: { type: Number },
    isDisabled: {type: Boolean, default: false} //set a default here
}, { 
    collection: 'catalog'
})

module.exports = mongoose.model('Catalog', CatalogSchema);