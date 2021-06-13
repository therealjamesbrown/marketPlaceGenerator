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
const PaymentService = require('../../models/payments');
const router = express.Router();

//bring in our base and error response classes
const BaseResponse = require('../../services/base-response');
const ErrorResponse = require('../../services/error-response');

//default server error/success message, this is generic unless we feel a need to update the param
const internalServerError = "Internal Server Error!";
const serverSuccess = "Success!"


/**
* 
* --CREATE Payment Service-- 
* 
*/
router.post('/register', async(req, res) => {

    try{
        //get the request details
        const newPaymentService = {
            paymentMethodName : req.body.paymentMethodName
        }
        PaymentService.create(newPaymentService, function(err, createdPaymentService) {
            if(err){
                console.log(err);
                const createdPaymentServiceErrorResponse = new ErrorResponse('500', internalServerError, err);
                res.status(500).send(createdPaymentServiceErrorResponse.toObject());
            } else {
                console.log(createdPaymentService);
                const createdPaymentServiceSuccessResponse = new BaseResponse('200', serverSuccess, createdPaymentService);
                res.json(createdPaymentServiceSuccessResponse.toObject());
            }
        })
    } catch(e){
        console.log(e);
        const createdPaymentServiceCatchErrorResponse = new ErrorResponse('500', internalServerError, e.message);
        res.status(500).send(createdPaymentServiceCatchErrorResponse.toObject());
    }
})



/**
 * 
 * Find all Payments Services
 * 
 */
router.get('/', async(req, res) => {
    try{
        PaymentService.find({}).exec(function(err, foundPaymentServices) {
            if (err) {
                console.log(err);
                const findAllPaymentsMongoDBErrorResponse = new ErrorResponse(500, internalServerError, err);
                res.status(500).send(findAllPaymentsMongoDBErrorResponse.toObject());
            } else {
                console.log(foundPaymentServices);
                const findAllPaymentsSuccessResponse = new BaseResponse(200, serverSuccess, foundPaymentServices);
                res.json(findAllPaymentsSuccessResponse.toObject());
            }
        })
    } catch(e){
        const findPaymentsServicesCatchErrorResponse = new ErrorResponse(500, internalServerError, e.message);
        res.status(500).send(findPaymentsServicesCatchErrorResponse.toObject());
    }
})

/**
 * 
 * Update Payment Service
 * 
 */
router.patch('/update/:id', function(req, res) {
    console.log(req.body);
    try { 
    // Finds the payment service by id
    PaymentService.findOne({ "_id": req.params.id }, function(err, paymentService) {
         if (err){
             const ErrorMessage = new ErrorResponse('500', 'Internal Server Error', err)
             res.json(ErrorMessage.toObject())
         }
        // disableds the payment
         else { 
             paymentService.set({
             isEnabled: req.body.status
         })
            paymentService.save(function(err, updatedPaymentService) {
                if (err) {
                    const ErrorMessage = new ErrorReponse('500', 'Internal Server Error', err)
                    res.json(ErrorMessage.toObject())
                } else {
                    const SuccessMessage = new BaseResponse('200', 'PATCH Request Success', updatedPaymentService)
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