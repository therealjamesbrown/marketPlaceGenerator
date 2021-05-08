/**
 * 
 * ================================
 * ; Title: BCRS PROJECT
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Modified by: James Brown
 * ; Date: 10/14/2020
 * ; Description: Application for Bobs Computer Repair Shop.
 * ================================
 * 
 */

// Install Dependencies

let mongoose = require('mongoose')

// Import Schema 
let Schema = mongoose.Schema

// defines a new schema with id; questionsId and answer.
let SecurityQuestionSchema = new Schema({
    questionId: { type: String },  //SK added brackets, was questionId: string,
    answer: {type: String },  //SK added brackets, was answer: string
    isDisabled: {type: Boolean, default: false} //added by SK 10/23/20
}, {
    collection: "securityQuestions"
})

// Exports the securityQuestions model
module.exports = mongoose.model('securityQuestions', SecurityQuestionSchema)