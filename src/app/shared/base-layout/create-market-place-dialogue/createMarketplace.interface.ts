/**
 * 
 * ================================
 * ; Title: invoice.interface.ts
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Modified by: James Brown
 * ; Date: 10/14/2020
 * ; Description: component responsible for creating new invoices/orders.
 * ================================
 * 
 */

export interface Marketplace {
    username: {type: String},
     type: {type: String},
     businessName: {type: String,},
     industry: {type: String},
     password: {type: String},
     contactFirstName: {type: String},
     contactLastName: {type: String},
     phone: {type: String},
     address: {type: String},
     email: {type: String},
     isDisabled: {type: Boolean},
     role: { type: String}, 
     securityQuestions: { type: any}
}