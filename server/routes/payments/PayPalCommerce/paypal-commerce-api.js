/**
 * 
 * ================================
 * ; Title: MarketPlaceGenerator
 * ; Authors: James Brown
 * ; Date: 05/08/2021
 * ; Description: PayPal Commerce Platform - 3rd party onboarding. 
 * ================================
 * 
 */

const express = require('express');
const paypalFunctions = require('./paypal-commerce-functions');
const PaymentService = require('../../../models/payments');
const MarketplaceUser = require('../../../models/marketplace/marketplaceUser');
const router = express.Router();
let https = require('https');
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
let sellerSandboxClientId;
let sellerAccountId;
let partnerAccountId;
let productionClientID;
let productionSecret;
let bnCode;
let bearerToken;
let paypalRestPaths;
let responseBody;
let orderId;

//store partner config settings in the db (hard coding for now)
environment = 'sandbox' //options are sandbox or production
sandboxClientId = 'AWWarvYmG1fqjxQEsJPjOZoaH6s9-UHj_6yjcmvjZm8VL6YG1606X45O9QtlfIz8EMe-6ftLGyDC09ot';
sandboxSecret = 'EFmxZ__ixoMDGcP5CvwaekwyOinHxQw81IIxwpM89Xw4Bt8CrVVqiOln4Kp-D2JYckm_GQbAg_8bq5Li';
partnerAccountId = 'JK2JY4ZRHE4PU';

paypalRestPaths = {
    oAuth: '/v1/oauth2/token',
    partnerReferralsV2: '/v2/customer/partner-referrals',
    trackSellerOnboardingStatus: '/v1/customer/partners',
    ordersV2Create: '/v2/checkout/orders',
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


/**
 * 
 * @param accessToken 
 * @param sellerId 
 * function for calling paypal to get partner referral redirect url
 */

function partnerReferral(accessToken, sellerId){
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
     
let postData = JSON.stringify({"tracking_id":sellerId,"partner_config_override":{"return_url":"https://mrktgen.herokuapp.com/#/seller/onboarding-complete"},"operations":[{"operation":"API_INTEGRATION","api_integration_preference":{"rest_api_integration":{"integration_method":"PAYPAL","integration_type":"THIRD_PARTY","third_party_details":{"features":["PAYMENT"]}}}}],"products":["EXPRESS_CHECKOUT"],"legal_consents":[{"type":"SHARE_DATA_CONSENT","granted":true}]});
    req.write(postData);
    req.end();

})
}

/**
 * 
 * @param accessToken 
 * @param sellerId 
 * @param partnerId
 * function for calling paypal to get partner referral redirect url
 */

function trackSellerOnboardingStatus(accessToken, partnerAccountId, merchantIdInPayPal){
  return new Promise( resolve => {
    let options = {
      'method': 'GET',
      'hostname': endpoint,
      'path': `${paypalRestPaths.trackSellerOnboardingStatus}/${partnerAccountId}/merchant-integrations/${merchantIdInPayPal}`,
      'headers': {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip',
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

       //pass that action url back in the response
       resolve(responseBody);
      });
    
      res.on("error", function (error) {
        console.error(error);
      });
    });
     
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
 * Internal application ROUTES
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
 * 
 * PayPal V2 ORDERS RELATED STUFF
 * PayPal V2 ORDERS RELATED STUFF
 * PayPal V2 ORDERS RELATED STUFF
 * PayPal V2 ORDERS RELATED STUFF
 * PayPal V2 ORDERS RELATED STUFF
 * PayPal V2 ORDERS RELATED STUFF
 * PayPal V2 ORDERS RELATED STUFF
 * PayPal V2 ORDERS RELATED STUFF
 * 
 */



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
   * PayPal ONBOARING RELATED STUFF
   * PayPal ONBOARING RELATED STUFF
   * PayPal ONBOARING RELATED STUFF
   * PayPal ONBOARING RELATED STUFF
   * PayPal ONBOARING RELATED STUFF
   * PayPal ONBOARING RELATED STUFF
   * PayPal ONBOARING RELATED STUFF
   * PayPal ONBOARING RELATED STUFF
   * PayPal ONBOARING RELATED STUFF
   * PayPal ONBOARING RELATED STUFF
   * PayPal ONBOARING RELATED STUFF
   * PayPal ONBOARING RELATED STUFF
   * PayPal ONBOARING RELATED STUFF
   */







/**
 * 
 * 
 * 
 * onBoarding - partnerReferrals
 * step 1 of the onboarding process. this call goes to paypal to retrieve the onboarding redirect url
 * 
 * 
 */ 


router.post('/onboard', async(req, res) => {
  try{
      //make call to PayPal to get access token
     getAccessToken().then(accessToken => {
         //pass the access token and seller id from the client session to the partner referrals api
      partnerReferral(accessToken, req.body.sellerId).then(responseBody => {
          const createPartnerReferralSuccessResponse = new BaseResponse(200, serverSuccess, responseBody);
          res.json(createPartnerReferralSuccessResponse.toObject());
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
 * onBoarding - route for callback once buyer approves permissions and is routed to client side.
 * this step calls paypal to get the seller client ID/fullonboarding details since the GET redirect only has a few details.
 * step 2 on the server. 
 * 
 */
router.post('/onboard/complete', async(req, res) => {
  //console.log(req.body);
  let merchantIdInPayPal = req.body.merchantIdInPayPal;
  try{
    //make call to PayPal to get access token
   getAccessToken().then(accessToken => {
       //pass the access token and seller id from the client session to the partner referrals api
    trackSellerOnboardingStatus(accessToken, partnerAccountId, req.body.merchantIdInPayPal).then(responseBody => {
      //send response back to internal client. 
       // const trackSellerOnboardingSuccessResponse = new BaseResponse(200, serverSuccess, responseBody);
       // res.json(trackSellerOnboardingSuccessResponse.toObject());
        
        //write merchant details and onboarding status to the db. 
      MarketplaceUser.findOne({ 'username': req.body.marketplaceUsername }, function(err, marketplaceUser){
        if (err) {
          const singinMongoDbErrorMessage = new ErrorResponse('500', 'Internal Server Error', err) 
          res.status(500).json(singinMongoDbErrorMessage.toObject());  
      }else if(!marketplaceUser){
        console.log('no user exists');
        const invalidUserNameResponse = new BaseResponse('200', 'Could not find marketplace or seller when storing pp onboarding details in db.', null);
        res.status(500).send(invalidUserNameResponse.toObject());
    } else {
      let sellersArr = marketplaceUser.sellers;
      let sellerSessionUser = sellersArr.find(o => o.username === req.body.merchantId);

      let newPaymentConfig = 
      {
          configName: 'PayPal-Commerce',
          environment: environment,
          status: 'active',
          merchant_client_id: responseBody.oauth_integrations[0].oauth_third_party[0].merchant_client_id,
          merchantIdInPayPal: merchantIdInPayPal,
          scopes: responseBody.oauth_integrations[0].oauth_third_party[0].scopes
      }

      sellerSessionUser.set({
        paymentsConfig: newPaymentConfig
    })

    console.log(sellerSessionUser.paymentsConfig)
    
    marketplaceUser.save(function(err) {
           if (err) {
               console.log(err)
           } else {
               const SuccessMessage = new BaseResponse('200', 'PATCH Request Success', sellerSessionUser.paymentsConfig)
               res.status(200).json(SuccessMessage.toObject())
           }
       })
      }
      }) //end mongodb request
        })
   })
} catch(e){
    const trackSellerOnboardingCatchErrorResponse = new ErrorResponse(500, internalServerError, e.message);
    res.status(500).send(trackSellerOnboardingCatchErrorResponse.toObject());
}
})


/**
 * 
 * onBoardingStatus - route for obtaining the status of paypal onboarding. used when displaying configuration options in 
 * the seller account. 
 * 
 */
 

 module.exports = router; 