/**
 * 
 * ================================
 * ; Title: MarketPlaceGenerator
 * ; Authors: James Brown
 * ; Date: 05/08/2021
 * ; Description: Seller API
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

router.get('/:marketplaceId', function(req, res) {
    try {
    // Finds user
    Marketplace.findOne({ "_id": req.params.marketplaceId }, function(err, user) {
        if (err) { 
            const ErrorMessage = new ErrorResponse('500', 'Internal Server Error', err)
            res.json(ErrorMessage.toObject());
        }
        // Sends user data
        else { 
            const SuccessMessage = new BaseResponse('200', 'Success!', user)
            res.json(SuccessMessage.toObject()) ;
        }
    })
} catch (e) {
        const ErrorMessage = new ErrorMessage('500', 'Internal Server Error', err)
        res.json(ErrorMessage.toObject());
}})


/**
* 
* --CREATE Seller-- 
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
            const saltRounds = 10; //set the number of times the password is getting salted
            let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds); //salt that thang

            //create the new seller object
            let newSeller = {
                username: req.body.username,
                type: req.body.type,
                businessName: req.body.businessName,
                industry: req.body.industry,
                password: hashedPassword,
                contactFirstName: req.body.contactFirstName,
                contactLastName: req.body.contactLastName,
                phone: req.body.phone,
                address: req.body.address,
                email: req.body.email,
                securityQuestions: req.body.securityQuestions,
                buyers: req.body.buyers,
            };
            
//add the seller to the marketplace
marketplace.sellers.push(newSeller);
            //try to save the marketplace in the db.
            marketplace.save(function(err, savedMarketplace ){
                if(err) {
                    console.log(err);
                } else {
                    //console.log(marketplace);
                    const RegisterSellerSuccessMessage = new BaseResponse('200', serverSuccess, newSeller)
                    res.json(RegisterSellerSuccessMessage.toObject()) ;
                }
            })
        }
    })
} catch (e) {
        const ErrorMessage = new ErrorMessage('500', 'Internal Server Error', err)
        res.json(ErrorMessage.toObject());
}})


/*
        //get the role details from the client
        const newRole = {
            text: req.body.text,
            isDisabled: req.body.isDisabled
        }
        //insert the new role into mongo
        Role.create(newRole, function(err, createdRole){
            if(err){
                console.log(err);
                const createRoleErrorResponse = new ErrorResponse('500', internalServerError, err);
                res.status(500).send(createRoleErrorResponse.toObject());
            } else {
                console.log(createdRole);
                const createRoleSuccessResponse = new BaseResponse('200', serverSuccess, createdRole);
                res.json(createRoleSuccessResponse.toObject());
            }
        });
} catch (e) {
    console.log(e);
    const createRoleCatchErrorResponse = new ErrorResponse('500', internalServerError, e.message);
    res.status(500).send(createRoleCatchErrorResponse.toObject());
}
})*/


/**
* 
* --Update Seller-- 
* 
*/
router.put('/:roleId/update', async(req, res) =>{
    try{
    //find the role object/document by id in mongo
    Role.findOne({'_id': req.params.roleId}, function(error, role){
        if(error){
            console.log(error, 'upper error');
            const updateRoleMongoErrorResponse = new ErrorResponse('500', internalServerError, error);
            res.status(500).send(updateRoleMongoErrorResponse.toObject());
        } else {

            //grab the request body properties and set them to 
            //object we pulled from the db
            role.set({
                text: req.body.text,
                isDisabled: req.body.isDisabled
            });

            //save the updated document to mongo
            role.save(function(err, updatedRole){
                if(err){
                    console.log(err);
                    const saveUpdatedRoleErrorResponse = new ErrorResponse('500', internalServerError, err);
                    res.status(500).send(saveUpdatedRoleErrorResponse.toObject());
                } else {
                    console.log(updatedRole);
                    const saveUpdatedRoleSuccess = new BaseResponse('200', serverSuccess, updatedRole);
                    res.json(saveUpdatedRoleSuccess.toObject());
                }
            })
        }
    })
} catch(e){
    console.log(e);
    const updateRoleCatchErrorResponse = new ErrorResponse('500', internalServerError, e.message);
    res.json(updateRoleCatchErrorResponse.toObject());
}
})

/**
 * 
 * --Delete Seller--
 * 
 */

 router.patch('/:id', function(req, res) {
    try { 
    // Finds the user
    Role.findOne({ "_id": req.params.id }, function(err, user) {
         if (err){
             const ErrorMessage = new ErrorResponse('500', 'Internal Server Error', err)
             res.json(ErrorMessage.toObject())
         }
        // Removes the user
         else { 
             user.set({
             isDisabled: true
         })
            user.save(function(err, user) {
                if (err) {
                    const ErrorMessage = new ErrorReponse('500', 'Internal Server Error', err)
                    res.json(ErrorMessage.toObject())
                } else {
                    const SuccessMessage = new BaseResponse('200', 'PATCH Request Success', user)
                    res.status(200).json(SuccessMessage.toObject())
                }
            })
        }
     })
    } catch(e) {
        const ErrorMessage = new ErrorResponse('500', 'Internal Server Error', err)
        res.json(ErrorMessage.toObject())
    }
 })


 module.exports = router; 