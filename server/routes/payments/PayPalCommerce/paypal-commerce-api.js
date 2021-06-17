/**
 * 
 * ================================
 * ; Title: MarketPlaceGenerator
 * ; Authors: James Brown
 * ; Date: 05/08/2021
 * ; Description: Payments API
 * ================================
 * 
 */

const express = require('express');
const paypalFunctions = require('./paypal-commerce-functions');
const PaymentService = require('../../../models/payments');
const router = express.Router();
let https = require('follow-redirects').https;
let fs = require('fs');
let qs = require('querystring');

//bring in our base and error response classes
const BaseResponse = require('../../../services/base-response');
const ErrorResponse = require('../../../services/error-response');

//default server error/success message, this is generic unless we feel a need to update the param
const internalServerError = "Internal Server Error!";
const serverSuccess = "Success!"


//register payment configuration at the marketplace level
let environment;
let endpoint;
let sandboxClientId;
let sandboxSecret;
let productionClientID;
let productionSecret;
let bnCode;
let bearerToken;
let paypalRestPaths;
let responseBody;
let orderId;

//store config settings in the db (hard coding for now)
environment = 'sandbox' //options are sandbox or production
sandboxClientId = 'ATJLre1zGOE4EaB854PnEKBOvbz6il8NiXAa5b1-p4QCYvWoghdokl2LgzsravutwfhQXU8Wj8x48w3s';
sandboxSecret = 'EH87TZR94IEiE_2kcCm5S6f4jw_mIa8-4a7lcDWxX0ofhLsnYg4VU0DWeK3v8NHrZwSwqgmYYfW-LBfy'

paypalRestPaths = {
    oAuth: '/v1/oauth2/token',
    partnerReferralsV2: '/v2/customer/partner-referrals',
    ordersV2Create: '/v2/checkout/orders'
}


if(environment === 'sandbox'){
    endpoint = 'api.sandbox.paypal.com';
    credentials = Buffer.from(`${sandboxClientId}:${sandboxSecret}`).toString('base64');
} else {
    endpoint = 'api.paypal.com';
    credentials = Buffer.from(`${productionClientId}:${productionSecret}`).toString('base64');
}


/****
 * 
 * 
 * 
 * 
 * 
 * Functions
 * 
 * 
 * 
 * 
 * 
 * 
 */



/**
 * 
 * function for requesting oAuth token if it is expired
 * 
 */
function getAccessToken(){
    return new Promise((resolve, reject) => {
        let options = {
          'method': 'POST',
          'hostname': endpoint,
          'path': paypalRestPaths.oAuth,
          'headers': {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${credentials}`,
          },
          'maxRedirects': 20
        };
        
        let req = https.request(options, function (res) {
          let chunks = [];
        
          res.on("data", function (chunk) {
            chunks.push(chunk);
          });
        
          res.on("end", function (chunk) {
              //buffer the response
            let bufferedData = Buffer.concat(chunks);
            //convert it to json
            let responseBody = JSON.parse(bufferedData);
           resolve(responseBody.access_token);
          });
        
          res.on("error", function (error) {
            console.error(error);
          });
        });
        
        let postData = qs.stringify({
          'grant_type': 'client_credentials'
        });
        
        req.write(postData);
        
        req.end();
    })
}

/**
 * 
 * function for creating V2 order
 * @param accessToken - bearer token used for authorization
 */
function createOrderV2(accessToken){
    return new Promise((resolve, reject) => {
        let options = {
          'method': 'POST',
          'hostname': endpoint,
          'path': paypalRestPaths.ordersV2Create,
          'headers': {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          'maxRedirects': 20
        };
        
        let req = https.request(options, function (res) {
          let chunks = [];
        
          res.on("data", function (chunk) {
            chunks.push(chunk);
          });
        
          res.on("end", function (chunk) {
              //buffer the response
            let bufferedData = Buffer.concat(chunks);
            //convert it to json
            let responseBody = JSON.parse(bufferedData);
           resolve(responseBody);
          });
        
          res.on("error", function (error) {
            console.error(error);
          });
        });
        
        let postData = JSON.stringify({"intent":"CAPTURE","application_context":{"return_url":"https://example.com/return","cancel_url":"https://example.com/cancel"},"purchase_units":[{"amount":{"currency_code":"USD","value":"36.00"}}]});
        req.write(postData);
        req.end();
    })
}

/**
 * 
 * function for capturing V2 order
 * @param accessToken - bearer token used for authorization
 * @param orderId - unique paypal order id returned from the create call
 * 
 */
function captureOrderV2(accessToken, orderId){
    return new Promise( resolve => {
        let options = {
          'method': 'POST',
          'hostname': endpoint,
          'path': `${paypalRestPaths.ordersV2Create}/${orderId}/capture`,
          'headers': {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          'maxRedirects': 20
        };
        
        let req = https.request(options, function (res) {
          let chunks = [];
        
          res.on("data", function (chunk) {
            chunks.push(chunk);
          }); 
        
          res.on("end", function (chunk) {
              //buffer the response
            let bufferedData = Buffer.concat(chunks);
            //convert it to json
            let captureResponseBody = JSON.parse(bufferedData);
           resolve(captureResponseBody);
          });
        
          res.on("error", function (error) {
            console.error(error);
          });
        });
         
        let postData = "";
        req.write(postData);
        req.end();
    })
}


function partnerReferral(accessToken){
  return new Promise( resolve => {
    let options = {
      'method': 'POST',
      'hostname': endpoint,
      'path': paypalRestPaths.partnerReferralsV2,
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      'maxRedirects': 20
    };
    
    let req = https.request(options, function (res) {
      let chunks = [];
    
      res.on("data", function (chunk) {
        chunks.push(chunk);
      }); 
    
      res.on("end", function (chunk) {
          //buffer the response
        let bufferedData = Buffer.concat(chunks);
        //convert it to json
        let responseBody = JSON.parse(bufferedData);

        //find the action url from the hateos links returned
       let actionURL = responseBody.links.find(e => e.rel === 'action_url');

       //pass that action url back in the response
       resolve(actionURL.href);
      });
    
      res.on("error", function (error) {
        console.error(error);
      });
    });
     
    let postData = JSON.stringify({"tracking_id":"id1","operations":[{"operation":"API_INTEGRATION","api_integration_preference":{"rest_api_integration":{"integration_method":"PAYPAL","integration_type":"THIRD_PARTY","third_party_details":{"features":["PAYMENT","REFUND"]}}}}],"products":["EXPRESS_CHECKOUT"],"legal_consents":[{"type":"SHARE_DATA_CONSENT","granted":true}]});
    req.write(postData);
    req.end();

})
}



/****
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * ROUTES
 * 
 * 
 * 
 * 
 * 
 */


/**
 * 
 * OAuthAccess Token Request call
 * 
 */

//route to handled access-token requests from a marketplace perspective. 
router.post('/access-token', async(req, res) => {
    try{
        //make call to PayPal to get
       getAccessToken().then(data => {
        const getAccessSuccessResponse = new BaseResponse(200, serverSuccess, data);
        res.json(getAccessSuccessResponse.toObject());
       })
    } catch(e){
        const findPaymentsServicesCatchErrorResponse = new ErrorResponse(500, internalServerError, e.message);
        res.status(500).send(findPaymentsServicesCatchErrorResponse.toObject());
    }
})
 




/**
 * 
 * Orders V2 API calls (entire process ie: create/capture/refund)
 * 
 */
router.post('/create-order', async(req, res) => {
    try{
        //make call to PayPal to get access token
       getAccessToken().then(accessToken => {
           //pass the access token to paypal
        createOrderV2(accessToken).then(responseBody => {
            const createOrderSuccessResponse = new BaseResponse(200, serverSuccess, responseBody);
            res.json(createOrderSuccessResponse.toObject());
            }) 
       })
    } catch(e){
        const findPaymentsServicesCatchErrorResponse = new ErrorResponse(500, internalServerError, e.message);
        res.status(500).send(findPaymentsServicesCatchErrorResponse.toObject());
    }
})

/***
 * 
 * 
 * Capture Order after it has been approved
 * 
 * 
 */

router.post('/capture-order', async(req, res) => {
    try{
        //make call to PayPal to get access token
       getAccessToken().then(accessToken => {
           //pass the access token to paypal
        captureOrderV2(accessToken, req.body.orderId).then(captureResponseBody => {
            //console.log(captureResponseBody);
            const createOrderSuccessResponse = new BaseResponse(200, serverSuccess, captureResponseBody);
            res.json(createOrderSuccessResponse.toObject());
            //save order to database
            }) 
       })
    } catch(e){
        const findPaymentsServicesCatchErrorResponse = new ErrorResponse(500, internalServerError, e.message);
        res.status(500).send(findPaymentsServicesCatchErrorResponse.toObject());
    }
})




/**
 * 
 * 
 * 
 * onBoarding - partnerReferrals
 * 
 * 
 */


router.post('/onboard', async(req, res) => {
  try{
      //make call to PayPal to get access token
     getAccessToken().then(accessToken => {
         //pass the access token to the partner referrals api
      partnerReferral(accessToken).then(responseBody => {
          const createOrderSuccessResponse = new BaseResponse(200, serverSuccess, responseBody);
          res.json(createOrderSuccessResponse.toObject());
          //save order to database
          }) 
     })
  } catch(e){
      const findPaymentsServicesCatchErrorResponse = new ErrorResponse(500, internalServerError, e.message);
      res.status(500).send(findPaymentsServicesCatchErrorResponse.toObject());
  }
})
 



 module.exports = router; 