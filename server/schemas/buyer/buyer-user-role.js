/**
 * 
 * ================================
 * ; Title: buyer-user-role.js
 * ; Authors: James Brown
 * ; Date: 10/21/2020
 * ; Description: seller schema
 * ================================
 * 
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SelectedSecurityQuestions = require('../selected-security-questions');

let BuyerSchema = new Schema({
    username: {type: String, required: true, unique: true, dropDups: true},
    type: {type: String},
    password: {type: String, required: true},
    email: {type: String},
    isDisabled: {type: Boolean, default: false},
    role: { type: String, default: 'buyer'}, 
    securityQuestions: { type: Array },
    dateCreated: { type: Date, default: new Date() },
    dateModified: { type: Date }
}) 

module.exports = BuyerSchema;