/**
 * 
 * ================================
 * ; Title: securityQuestion-api
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Date: 10/14/2020
 * ; Description: Application for Bobs Computer Repair Shop.
 * ================================
 * 
 */

//const { try } = require('bluebird'); //SK commented this out 10/22/20 at 10pm; no idea why this is here - I think it populates when you type 'try'
const express = require('express');
const SecurityQuestion = require('../models/securityQuestion');
const router = express.Router();

//bring in our base and error response classes
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');

/**
 * 
 * --Find All securityQuestions--
 * 
 */

 router.get('/', function(req, res) {
     try {
     SecurityQuestion.find({}, function(err, securityQuestion) {
         if (err) { 
            const ErrorMessage = new ErrorResponse('500', 'Internal Server Error', err) 
            res.json(ErrorMessage.toObject())
         } else { 
            const SuccessMessage = new BaseResponse('200', 'GET Request Success', securityQuestion)
            res.json(SuccessMessage.toObject())
        }})} catch (e) {
        const ErrorMessage = new ErrorResponse('500', 'Internal Server Error', err)
        res.json(ErrorMessage.toObject());
     }
 })


/**
 * 
 * --Find securityQuestion by ID--
 * 
 */
router.get('/:_id', async(req, res) => {
    try{
        SecurityQuestion.findOne({
            '_id': req.params._id
        },
        function(err, securityQuestion){
            if(err){
                console.log(err);
                const findSecurityQuestionMongoDbError = new ErrorResponse('500', 'Internal Server Error!', err);
                res.status(500).send(findSecurityQuestionMongoDbError.toObject());
            } else {
                console.log(securityQuestion);
                const findSecurityQuestionMongoDbSuccess = new BaseResponse('200', 'Success!', securityQuestion);
                res.json(findSecurityQuestionMongoDbSuccess.toObject());
            }
        })
    } catch (e){
        console.log(e);
        const findSecurityQuestionCatchError = new ErrorResponse('500', 'Internal Server Error!', e.message);
        res.status(500).send(findSecurityQuestionCatchError.toObject());
    }
})


/**
* 
* --CREATE securityQuestion-- 
* Created by SK
*/
router.post('/', async(req, res) => {
    try
    {
        let newSecurityQuestion = {
            questionId: req.body.questionId,
            answer: req.body.answer
        };

        SecurityQuestion.create(newSecurityQuestion, function(err, securityQuestion) {
            if (err)
            {
                console.log(err);
                const createSecurityQuestionMongodbErrorResponse = new ErrorResponse('500', 'Internal Server Error!', err);
                res.status(500).send(createSecurityQuestionMongodbErrorResponse.toObject());
            }
            else {
                console.log(securityQuestion);
                const createSecurityQuestionResponse = new BaseResponse('200', 'Success!', securityQuestion);
                res.json(createSecurityQuestionResponse.toObject());
            }
        })
    }
    catch (e)
    {
        console.log(e);
        const createSecurityQuestionCatchErrorResponse = new ErrorResponse('500', 'Internal Server Error!', e.message);
        res.status(500).send(createSecurityQuestionCatchErrorResponse.toObject());
    }
});


/**
* 
* --Update securityQuestion-- 
* Created by SK
*/

router.put('/:id', async(req,res) => { //double check this works /:_id JB //SK crashed server with underscore, removed
    try 
    {
        SecurityQuestion.findOne({'_id': req.params.id}, function(err, securityQuestion)  {
            if (err)
            {
                console.log(err);
                const updateSecurityQuestionMongodbErrorResponse = new ErrorResponse('500', 'Internal Server Error!', err);
                res.status(500).send(updateSecurityQuestionMongodbErrorResponse.toObject());
            }
            else 
            {   console.log(securityQuestion);

                securityQuestion.set({
                    questionId: req.body.questionId,
                    answer: req.body.answer
                });

                securityQuestion.save(function( err, savedSecurityQuestion) {
                    if (err)
                    {
                        console.log(err);
                        const savedSecurityQuestionMongodbErrorResponse = new ErrorResponse('500', 'Internal Server Error!', err);
                        res.status(500).send(savedSecurityQuestionMongodbErrorResponse.toObject());
                    }
                    else
                    {
                        console.log(savedSecurityQuestion);
                        const updateSecurityQuestionResponse = new BaseResponse('200', 'Success!', savedSecurityQuestion);
                        res.json(updateSecurityQuestionResponse.toObject());
                    }
                })
            }
        })
    }
    catch (e)
    {
        console.log(e);
        const updateSecurityQuestionCatchErrorResponse = new ErrorResponse('500', 'Internal Server Error!', e.message);
        res.status(500).send(updateSecurityQuestionCatchErrorResponse.toObject());
    }
});



/**
 * 
 * --Delete securityQuestion--
 * 
 */

 
 router.patch('/:id', function(req, res) {
    try { 
    SecurityQuestion.findOne({ "_id": req.params.id }, function(err, securityQuestion) {
         if (err) { 
             console.log(err);
            const ErrorMessage = new ErrorResponse('500', 'Internal Server Error', err)
             res.json(ErrorMessage.toObject()) 
         } else { 
             securityQuestion.set({
                 isDisabled: true
             })
             securityQuestion.save(function(err, securityQuestion) {
                 if (err) { 
                     const ErrorMessage = new ErrorResponse('500', 'Internal Server Error', securityQuestion)
                     res.json(ErrorMessage.toObject())
                 } else {
                    const SuccessMessage = new BaseResponse('200', 'PATCH Request Success', securityQuestion)
                    res.json(SuccessMessage.toObject())
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