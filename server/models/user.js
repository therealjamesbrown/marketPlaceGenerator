/**
 * 
 * ================================
 * ; Title: user.js
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Modified by: Sarah Kovar
 * ; Date: 10/21/2020
 * ; Description: User Model
 * ================================
 * 
 */

let mongoose = require('mongoose')

let Schema = mongoose.Schema;
const SelectedSecurityQuestions = require('../schemas/selected-security-questions');
const UserRoleSchema = require('../schemas/user-role');
//console.log(UserRoleSchema);

let UserSchema = new Schema({
    username: {type: String, required: true, unique: true, dropDups: true},
    password: {type: String, required: true},
    firstName: {type: String},
    lastName: {type: String},
    phoneNumber: {type: String},
    address: {type: String},
    email: {type: String},
    isDisabled: {type: Boolean, default: false},
    role: {UserRoleSchema}, //need to define default
    securityQuestions: [SelectedSecurityQuestions],
    date_created: { type: Date, default: new Date() },
    date_modified: { type: Date }
}, { collection: 'user' })

module.exports = mongoose.model('User', UserSchema);