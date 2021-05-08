/**
 * 
 * ================================
 * ; Title: roles.js
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Modified by: Sarah Kovar
 * ; Date: 10/21/2020
 * ; Description: Role Model
 * ================================
 * 
 */

let mongoose = require('mongoose')

let Schema = mongoose.Schema;

let RolesSchema = new Schema({
    text: {type: String, unique: true, dropDups: true}, 
    isDisabled: {type: Boolean, default: false}

}, { 
    collection: 'roles'
})

module.exports = mongoose.model('Roles', RolesSchema);