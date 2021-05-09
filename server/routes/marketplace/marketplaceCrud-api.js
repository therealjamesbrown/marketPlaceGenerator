/**
 * 
 * ================================
 * ; Title: marketPlaceSignup
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Date: 10/14/2020
 * ; Description: API that handles CRUD operations for users
 * ================================
 * 
 */

 const express = require('express');
 //import marketplace user model
 const User = require('../../models/marketplace/marketplaceUser');
 const router = express.Router();
 var bcrypt = require('bcryptjs')
 //let cors = require('cors')
 let bodyParser = require('body-parser');
 
 //bring in our base and error response classes
 const BaseResponse = require('../../services/base-response');
 const ErrorResponse = require('../../services/error-response');
 const saltRounds = 10; //set the number of times the password is getting salted
 
 
 /**
  * 
  * --Find All Users--
  * 
  */
 
  router.get('/', function(req, res) {
 try {
     User.find({}, function(err, user) {
         if (err) { 
             const ErrorMessage = new ErrorResponse('500', 'Internal Server Erorr', err)
             res.json(ErrorMessage.toObject()) 
         } else { 
             const SuccessMessage = new BaseResponse('200', 'GET Request Success', user)
             res.json(SuccessMessage.toObject()) }
     })} catch (e) {
         const ErrorMessage = new ErrorResponse('500', 'Internal Server Erorr', err)
         res.json(ErrorMessage.toObject())
     }
  })

 
 /**
  * 
  * --Find User by ID--
  * Created by SK
  */
 router.get('/:id', async(req, res) => {
     try {
       User.findOne({'_id': req.params.id}, function(err, user) {
   
         console.log(req.params.id)
   
         if (err) {
           console.log(err);
   
           const mongoDbErrorResponse = new ErrorResponse ('500', 'Internal server error', err);
   
           res.status(500).send(mongoDbErrorResponse.toObject());
         } else {
   
           console.log(user);
           res.json(user);
         }
       })
     } catch (e) {
       console.log(e);
   
       const errorCatchResponse = new ErrorResponse('500', 'Internal server error', err)
       res.status(500).send(errorCatchResponse.toObject());
     }
   });
 
 
 
 /**
  * 
  * --Find User by username--
  * Created by JB
  */
 router.get('/username/:username', async(req, res) => {
     try {
         console.log(req.params.username)
       User.findOne({'username': req.params.username}, function(err, user) {
   
         //console.log('i fired')
   
         if (err) {
           console.log(err); 
   
           const mongoDbErrorResponse = new ErrorResponse ('500', 'Internal server error', err);
   
           res.status(500).send(mongoDbErrorResponse.toObject());
         } else {
   
           console.log(user);
           const mongoDBFindUserByIDSuccess = new BaseResponse('200', 'Success!', user);
           res.json(mongoDBFindUserByIDSuccess.toObject());
         }
       })
     } catch (e) {
       console.log(e);
       const errorCatchResponse = new ErrorResponse('500', 'Internal server error', err)
       res.status(500).send(errorCatchResponse.toObject());
     }
   });
 
 
 
 
 /**
  * 
  * FindSelectedSecurityQuestion
  * 
  */
 router.get('/:username/security-questions', async(req, res) => {
     try {
         User.findOne({'username': req.params.username}, function(err, user) {
             if(err){
                 console.log(err);
                 const findSelectedSecurityQuestionsMongoDbErrorResponse = new ErrorResponse('500', 'Internal Server Error', err);
                 res.status(500).send(findSelectedSecurityQuestionsMongoDbErrorResponse.toObject());
             } else {
                 console.log(user);
                 const findSelectedSecurityQuestionsResponse = new BaseResponse('200', 'Query Successful', user);
                 res.json(findSelectedSecurityQuestionsResponse.toObject());
             }
         })
     } catch(e) {
         console.log(e);
         const findSelectedSecurityQuestionsCatchErrorResponse = new ErrorResponse('500', 'Internal Server Error', e.message);
         res.status(500).send(findSelectedSecurityQuestionsCatchErrorResponse.toObject());
     }
 })
 
 
 
 
 /**
  * 
  * --Find Security Questions by ID--
  * Created by BM
  */
 
 router.get('/securityQuestions/findById', function(req, res) {
     try {
     User.findOne({ "username": req.body.username }, function(err, user) {
         if (err) {
             const ErrorMessage = new ErrorResponse('500', 'Internal Server Error', err)
             res.json(ErrorMessage.toObject())
         } else {
             const SuccessMessage = new BaseResponse('200', 'GET Request Success', user.username/* Will Be selectedSecuriyQuestions */)
             res.json(SuccessMessage.toObject())
         }   
     })
 } catch (e) {
     const ErrorMessage = new ErrorResponse('500', 'Internal Server Error', e)
     res.json(ErrorMessage.toObject())
 }
 })
 
 /**
 * 
 * --CREATE User-- 
 * 
 */
 router.post('/', async(req, res) => {
     try{
         let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds); //salt that thang
 
         let newUser = {
             username:    req.body.username,
             password:    hashedPassword,
             firstName:   req.body.firstName,
             lastName:    req.body.lastName,
             phoneNumber: req.body.phoneNumber,
             address:     req.body.address,
             email:       req.body.email,
             role:        req.body.role
         }
         console.log(newUser)
         User.create(newUser, function(err, user){
             if(err){
                 console.log(err);
                 const createUserMongoDbErrorResponse = new ErrorResponse('500', 'Internal Server Error!', err);
                 res.status(500).send(createUserMongoDbErrorResponse.toObject());
             } else {
                 console.log(user);
                 const createUserSuccessResponse = new BaseResponse('200', 'Success!', user);
                 res.json(createUserSuccessResponse.toObject());
             }
         })
     } catch(e){
         console.log(e);
         const createUserCatchErrorResponse = new ErrorResponse('500', 'Internal Server Error', e.message);
         res.status(500).send(createUserCatchErrorResponse.toObject());
     }
 });
 
 
 /**
 * 
 * --Update User-- 
 * 
 */
 
 router.put('/:id', async(req, res) => {
     try {
         User.findOne({'_id': req.params.id}, function(err, user){
             if (err) {
                 console.log(err);
                 const updateUserMongoDbErrorResponse = new ErrorResponse('500', 'Internal Server Error', err);
                 res.status(500).send(updateUserMongoDbErrorResponse.toObject());
             } else {
                 console.log(user);
 
                 user.set({
                     firstName: req.body.firstName,
                     lastName: req.body.lastName,
                     username: req.body.username,
                     phoneNumber: req.body.phoneNumber,
                     address: req.body.address,
                     email: req.body.email,
                     role: req.body.role
                 });
 
                 user.save(function(err, savedUser) {
                     if(err) {
                         console.log(err);
                         const saveUserMongoDbErrorResponse = new ErrorResponse('500', 'Internal Server Error!', err);
                         res.status(500).send(saveUserMongoDbErrorResponse.toObject());
                     } else {
                         console.log(savedUser);
                         const saveUserSuccessResponse = new BaseResponse('200', 'Success!', savedUser);
                         res.json(saveUserSuccessResponse.toObject());
                     }
                 })
             }
         })
     } catch (e) {
         console.log(e);
         const updateUserCatchErrorResponse = new ErrorResponse('500', 'Internal Server Error!', e.message);
         res.status(500).send(updateUserCatchErrorResponse.toObject());
     }
 })
 
 
 
 
 
 /**
 * 
 * --Update User Security Questions-- 
 * 
 */
 
 router.put('/:username/security-questions', async(req, res) => {
     try {
         User.findOne({'username': req.params.username}, function(err, user){
             if (err) {
                 console.log(err);
                 const updateSecurityQuestionsUserMongoDbErrorResponse = new ErrorResponse('500', 'Internal Server Error', err);
                 res.status(500).send(updateSecurityQuestionsUserMongoDbErrorResponse.toObject());
             } else {
                 console.log(user);
                 user.set({
                     securityQuestions: req.body.securityQuestions
                 });
 
                 user.save(function(err, savedUser) {
                     if(err) {
                         console.log(err);
                         const saveUserSecurityQuestionsMongoDbErrorResponse = new ErrorResponse('500', 'Internal Server Error!', err);
                         res.status(500).send(saveUserSecurityQuestionsMongoDbErrorResponse.toObject());
                     } else {
                         console.log(savedUser);
                         const saveUserSecurityQuestionsSuccessResponse = new BaseResponse('200', 'Success!', savedUser);
                         res.json(saveUserSecurityQuestionsSuccessResponse.toObject());
                     }
                 })
             }
         })
     } catch (e) {
         console.log(e);
         const updateUserSecurityQuestionsCatchErrorResponse = new ErrorResponse('500', 'Internal Server Error!', e.message);
         res.status(500).send(updateUserSecurityQuestionsCatchErrorResponse.toObject());
     }
 })
 
 
 
 
 
 /**
  * 
  * --Delete User--
  * 
  */
 router.patch('/:id', function(req, res) {
 try {
     User.findOne({ "_id": req.params.id }, function(err, user) {
         if (err) { 
             const ErrorMessage = new ErrorResponse('500', 'Internal Server Erorr', err)
             console.log(ErrorMessage.toObject())
         } else {
             user.set({
                 isDisabled: true
             })
             user.save(function() {
             const SuccessMessage = new BaseResponse('200', 'DELETE Request Success', user)
             res.json(SuccessMessage.toObject())
     })}})} catch (e) {
             const ErrorMessage = new ErrorResponse('500', 'Internal Server Erorr', err)
             res.json(ErrorMessage.toObject())
     }   
 })
 
  module.exports = router; 