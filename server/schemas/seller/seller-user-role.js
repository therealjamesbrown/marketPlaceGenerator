/**
 * 
 * ================================
 * ; Title: seller-user-role.js
 * ; Authors: James Brown
 * ; Date: 10/21/2020
 * ; Description: seller schema
 * ================================
 * 
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SelectedSecurityQuestions = require('../selected-security-questions');


let sellerSchema = new Schema({
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
    role: { type: String, default: 'seller'}, 
    securityQuestions: { type: Array },
    dateCreated: { type: Date, default: new Date() },
    dateModified: { type: Date }
}) 

module.exports = sellerSchema;