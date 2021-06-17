/**
 * 
 * ================================
 * ; Title: paypal-commerce-functions.js
 * ; Authors: James Brown
 * ; Date: 10/21/2020
 * ; Description: re-usable paypal functions.
 * ================================
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