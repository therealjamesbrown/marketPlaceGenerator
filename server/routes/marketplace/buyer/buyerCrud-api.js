/**
 * 
 * ================================
 * ; Title: MarketPlaceGenerator
 * ; Authors: James Brown
 * ; Date: 05/08/2021
 * ; Description: Buyer API
 * ================================
 * 
 */

const express = require('express');
const Marketplace = require('../../../models/marketplace/marketplaceUser');
const router = express.Router();
var bcrypt = require('bcryptjs');

//bring in our base and error response classes
const BaseResponse = require('../../../services/base-response');
const ErrorResponse = require('../../../services/error-response');

//default server error/success message, this is generic unless we feel a need to update the param
const internalServerError = "Internal Server Error!";
const serverSuccess = "Success!"



/**
 * 
 * --Find marketplace by ID--
 * 
 */



/**
* 
* --CREATE Buyer-- 
* 
*/

router.post('/:marketplaceId/register', async(req, res) => {
    try{

         // Finds user
    Marketplace.findOne({ "_id": req.params.marketplaceId }, function(err, marketplace) {
        if (err) { 
            const ErrorMessage = new ErrorResponse('500', 'Internal Server Error', err)
            res.json(ErrorMessage.toObject());
        }
        // Sends user data
        else { 

            //insert the seller into the marketplace
            //console.log(marketplace);
            //console.log(req.body);
            const saltRounds = 10; //set the number of times the password is getting salted
            let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds); //salt that thang

            let newBuyer = {
                username: req.body.username,
                type: 'buyer',
                password: hashedPassword,
                email: req.body.email,
                securityQuestions: req.body.securityQuestions,
            };

            console.log(newBuyer);
            
//add the seller to the marketplace
marketplace.buyers.push(newBuyer);
            //try to save the marketplace in the db.
            marketplace.save(function(err, savedMarketplace ){
                if(err) {
                    console.log(err);
                } else {
                    //console.log(marketplace);
                    const RegisterSellerSuccessMessage = new BaseResponse('200', serverSuccess, newBuyer)
                    res.json(RegisterSellerSuccessMessage.toObject()) ;
                }
            })
        }
    })
} catch (e) {
        const ErrorMessage = new ErrorMessage('500', internalServerError, err)
        res.json(ErrorMessage.toObject());
}})


 module.exports = router; 