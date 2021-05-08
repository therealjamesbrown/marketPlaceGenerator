/**
 * 
 * ================================
 * ; Title: user.interface.ts
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Modified by: James Brown
 * ; Date: 10/14/2020
 * ; Description: user interface used for password reset
 * ================================
 * 
 */



export interface User {
    username: { type: String };
    password: { type: String };
    firstName: { type: String };
    lastName: { type: String };
    phoneNumber: { type: String };
    address: { type: String };
    email: { type: String };
}
