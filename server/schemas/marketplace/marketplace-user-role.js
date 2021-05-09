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

 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 let userRoleSchema = new Schema({
     role: { type: String, default: 'marketplace'}
 })

 module.exports = userRoleSchema;