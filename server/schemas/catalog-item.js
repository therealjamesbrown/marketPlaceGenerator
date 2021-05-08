/**
 * 
 * ================================
 * ; Title: catalog-item.js
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Modified by: James Brown
 * ; Date: 10/21/2020
 * ; Description: Catalog-Item Schema
 * ================================
 * 
 */

 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 let catalogItemSchema = new Schema({
     title: { type: String },
     price: { type: Number }
 })

module.exports = catalogItemSchema;