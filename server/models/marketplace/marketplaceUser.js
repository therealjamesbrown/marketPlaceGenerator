/**
 * 
 * ================================
 * ; Title: user.js
 * ; Authors: James Brown
 * ; Date: 05/06/2021
 * ; Description: Marketplace User Model
 * ================================
 * 
 */

 let mongoose = require('mongoose')

 let Schema = mongoose.Schema;
 const SelectedSecurityQuestions = require('../../schemas/selected-security-questions');
 const MarketplaceUserRoleSchema = require('../../schemas/marketplace/marketplace-user-role');

 
 let MarketplaceUserSchema = new Schema({
     username: {type: String, required: true, unique: true, dropDups: true},
     type: {type: String},
     businessName: {type: String, required: true},
     industry: {type: String},
     password: {type: String, required: true},
     contactFirstName: {type: String},
     contactLastName: {type: String},
     phone: {type: String},
     address: {type: String},
     email: {type: String},
     isDisabled: {type: Boolean, default: false},
     role: { type: String, default: 'marketplace'}, //need to define default
     securityQuestions: [SelectedSecurityQuestions],
     dateCreated: { type: Date, default: new Date() },
     dateModified: { type: Date },
     sellers: { type: Array }
 }, { collection: 'user' })
 
 module.exports = mongoose.model('MarketPlaceUser', MarketplaceUserSchema);