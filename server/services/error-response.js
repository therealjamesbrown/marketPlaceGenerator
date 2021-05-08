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



 /**
  * 
  * ERROR RESPONSE CLASS
  * 
  * Usage: This class is the base api response we return to the caller
  * on all of our apis when an error occurs. 
  * 
  */
 class ErrorResponse {
    constructor(httpCode, message, data){
        this.httpCode = httpCode;
        this.message  = message;
        this.data     = data;
    }

    toObject(){
        return {
            'httpCode':  this.httpCode,
            'message':   this.message,
            'data':      this.data,
            'timestamp': new Date().toLocaleDateString()
        }
    }
}

module.exports = ErrorResponse;