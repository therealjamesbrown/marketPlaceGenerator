/**
 * 
 * ================================
 * ; Title: Session-API
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Date: 10/23/2020
 * ; Description: Application for Bobs Computer Repair Shop.
 * ================================
 * 
 */


 // Install dependencies
 let bcrypt = require('bcryptjs')
 const express = require('express')
 let router = express.Router()
 let saltRounds = 10

 // Import Base and Error Responses
let ErrorResponse = require('../services/error-response')
let BaseResponse = require('../services/error-response')

 // Import User Schema
 let User = require('../models/user')


 //Sign-in route
 router.post('/signin', async (req,res) => {
     try {
         console.log(req.body)
        User.findOne({ 'username': req.body.username }, function(err, user) {
            if (err) {
                const singinMongoDbErrorMessage = new ErrorResponse('500', 'Internal Server Error', err) //**this should be 'signin' */
                res.status(500).json(singinMongoDbErrorMessage.toObject());  //**this should be 'signin' */
            } 
           
            /**
                 * 
                 * Begin JB changes
                 * 
                 */

                 //check if the user doesn't exist bc compareSync doesn't like null values.
            else if(!user){
                console.log('no user exists');
                const invalidUserNameResponse = new BaseResponse('200', 'Invalid username and/or password, please try again.', null);
                res.status(401).send(invalidUserNameResponse.toObject());
            }
            else {

                //check here to see if the request was from a marketplace login or seller login
                if(req.body.role === 'Seller'){

                //if seller, compare the seller details and return a result. 
                //find the seller in the array of sellers
                let sellersArr = user.sellers;
                let sellerSessionUser = sellersArr.find(o => o.username === req.body.sellerUsername);
                // console.log(sellerSessionUser);
                console.log(sellerSessionUser);
                if(sellerSessionUser === undefined) {
                    console.log(`Username: ${req.body.username} is invalid.`);
                    const invalidUserNameResponse = new BaseResponse('200', 'Invalid username and/or password, please try again.', null);
                    res.status(401).send(invalidUserNameResponse.toObject());
                } else {
                    let sellerPasswordIsValid = bcrypt.compareSync(req.body.password, sellerSessionUser.password);
                /**
                  * 
                  * If password is valid, return success
                  */
                 if(sellerPasswordIsValid) {
                    if (user.isDisabled == true) {
                        user.set({
                            isDisabled: false,
                        })
                        user.save()
                        const signinResponse = new BaseResponse('200', 'Re-enabled and logged in', sellerSessionUser);
                        res.json(signinResponse.toObject());
                    } else {
                        console.log('Login Successful!');
                        const signinResponse = new BaseResponse('200', 'Login Successful', sellerSessionUser);
                        res.json(signinResponse.toObject());
                    }
            }

            
            /**
             * If pass is invalid, return invalid password message
             */
            else {
                console.log(`Username: ${req.body.username} is invalid.`);
                const invalidUserNameResponse = new BaseResponse('200', 'Invalid username and/or password, please try again.', null);
                res.status(401).send(invalidUserNameResponse.toObject());
            } 
                }

                
        


            /**
             * 
             * handle session for buyers
             * TODO
             */
                }
                else if (req.body.role === 'Buyer') {
                    console.log('i work')
                }
    
                
                else {
                //if marketplace, do the normal login we already wrote

                 let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

                 /**
                  * 
                  * If password is valid, return success
                  */
                if(passwordIsValid) {
                        if (user.isDisabled == true) {
                            user.set({
                                isDisabled: false,
                            })
                            user.save()
                            const signinResponse = new BaseResponse('200', 'Re-enabled and logged in', user);
                            res.json(signinResponse.toObject());
                        } else {
                            console.log('Login Successful!');
                            const signinResponse = new BaseResponse('200', 'Login Successful', user);
                            res.json(signinResponse.toObject());
                        }
                }

                /**
                 * If pass is invalid, return invalid password message
                 */
                else {
                    console.log(`Username: ${req.body.username} is invalid.`);
                    const invalidUserNameResponse = new BaseResponse('200', 'Invalid username and/or password, please try again.', null);
                    res.status(401).send(invalidUserNameResponse.toObject());
                }
            }
        }})
     } catch (e) {
         console.log("this error fired")
        const ErrorMessage = new ErrorResponse('500', 'Internal Server Error', err.message)
        res.status(500).json(ErrorMessage.toObject())
     }
 })


 /**
* 
* --Create User for Registration --
* Added by SK
*/
router.post('/register', async(req, res) => {
    try{

        User.findOne({'userName': req.body.username}, function(err, user)
        {
            if (err)
            {
                console.log(err);
                const registerUserMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
                res.status(500).send(registerUserMongoDbErrorResponse.toObject());
            }
            else 
            {
                if (!user)
                {
                    let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
                    standardRole = {
                        role: 'standard'
                    }

            let registeredUser = {
            username:    req.body.username,
            password:    hashedPassword,
            firstName:   req.body.firstName,
            lastName:    req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            address:     req.body.address,
            email:       req.body.email,
            role:        standardRole, 
            securityQuestions: req.body.securityQuestions
        };

        User.create(registeredUser, function(err, newUser){
            if(err){
                console.log(err);
                const newUserMongoDbErrorResponse = new ErrorResponse('500', 'Internal Server Error!', err);
                res.status(500).send(newUserMongoDbErrorResponse.toObject());
            } else {
                console.log(newUser);
                const registeredUserResponse = new BaseResponse('200', 'Success!', newUser);
                res.json(registeredUserResponse.toObject());
            }
        })
    }
    else {
        console.log('The provided username already exists in our system');
        const userAlreadyExistsErrorResponse = new ErrorResponse('500', 'User already exists in our system', null);
        res.status(500).send(userAlreadyExistsErrorResponse.toObject());
    }
}
        })
        
    } catch(e){
        console.log(e);
        const registerUserCatchErrorResponse = new ErrorResponse('500', 'Internal Server Error', e.message);
        res.status(500).send(registerUserCatchErrorResponse.toObject());
    }
});


 
/**
 * 
 * VERIFY USER API
 * By JB
 * 
 */
router.get('/verify/users/:username', async(req, res) => {
    try {
        User.findOne({'username': req.params.username}, function(err, user){
            console.log(user);
            if(err){
                console.log(err);
                const verifyUserMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
                res.status(500).send(verifyUserMongoDbErrorResponse.toObject());
            } else if(!user){
                const verifyUserDoesntExist = new BaseResponse('200', 'Success!', user);
                res.json(verifyUserDoesntExist.toObject());
            } 
            else {
                console.log(user);
                const verifyUserResponse = new BaseResponse('200', 'Success!', user);
                res.json(verifyUserResponse.toObject());
            }
        })

    } catch(e){
        console.log(e);
        const verifyUserCatchErrorResponse = new ErrorResponse('500', 'Internal Server Error', e.message);
        res.status(500).send(verifyUserCatchErrorResponse.toObject());
    }
})



/**
 * 
 * VERIFY SECURITY QUESTIONS
 * by JB
 * 
 */
router.post('/verify/users/:username/security-questions', async(req, res) => {
    try{
        User.findOne({'username': req.params.username}, function(err, user){
            if(err){
                console.log(err);
                const verifySecurityQuestionsMondoDbErrorResponse = new ErrorResponse('500', 'Internal Server Error', err);
                res.status(500).send(verifySecurityQuestionsMondoDbErrorResponse.toObject());
            } else {
                
                //Find the selected security question objects in the DB and assign them to a variable
                const selectedSecurityQuestionOne = user.securityQuestions.find(question => question.questionText === req.body.questionText1); 
                const selectedSecurityQuestionTwo = user.securityQuestions.find(question2 => question2.questionText === req.body.questionText2);
                const selectedSecurityQuestionThree = user.securityQuestions.find(question3 => question3.questionText === req.body.questionText3);


                //Take the object from above and compare the answer from the db to the answer from the user.
                const isValidAnswerOne = selectedSecurityQuestionOne.answerText === req.body.answerText1;
                const isValidAnswerTwo = selectedSecurityQuestionTwo.answerText === req.body.answerText2;
                const isValidAnswerThree = selectedSecurityQuestionThree.answerText === req.body.answerText3;

                //Check if all three questions are correct. If so, return a success.
                if(isValidAnswerOne && isValidAnswerTwo && isValidAnswerThree){
                    console.log(`User ${user.username} answer their security questions correctly.`);
                    const validSecurityQuestionResponse = new BaseResponse('200', 'Success!', user);
                    res.json(validSecurityQuestionResponse.toObject());
                    //else return a success with failure.
                } else {
                    console.log(`User ${user.username} did not answer their security questions correctly.`);
                    const invalidSecurityQuestionsResponse = new BaseResponse('200', 'Error', user);
                    res.json(invalidSecurityQuestionsResponse.toObject());
                }
            }
        })

    } catch(e){
        console.log(e);
        const verifySecurityQuestionsCatchErrorResponse = new ErrorResponse('500', 'Internal Server Error', e.message);
        res.status(500).send(verifySecurityQuestionsCatchErrorResponse.toObject());
    }
});

/*
 // Password Reset Route
 router.put('/users/:username/reset-password', function(req, res) {
    // Find a user by username
    User.findOne({ "username": req.params.username }, function(err, user) {
        if (err) {
            const ErrorMessage = new ErrorResponse('500', 'Internal Server Error', err)
            res.status(500).json(ErrorMessage.toObject())
        } else {
            // Hash the new password
            let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds)
                     // Update the Password
            user.set({
                        password: hashedPassword
                    })
            user.save(function(err, user) {
                        if (err) {
                            const ErrorMessage = new ErrorResponse('500', 'Internal Server Error', err)
                            res.status(500).json(ErrorMessage.toObject())
                        } else {
                            const SuccessMessage = new BaseResponse('200', 'PUT Request Success', user)
                            res.status(200).json(SuccessMessage.toObject())
                        }
            })
        }
    })
 })
*/

  // Password Reset Route copied and modified by SK
  router.post('/users/:username/reset-password', async(req, res) => {
    try
    {
        const password = req.body.password;
        //console.log('req body logging fired')
    User.findOne({ "username": req.params.username }, function(err, user) {
        if (err) {
            console.log(err);
            const resetPasswordMongodbErrorResponse = new ErrorResponse('500', 'Internal Server Error', err)
            res.status(500).send(resetPasswordMongodbErrorResponse.toObject());
        } 
        else 
        {
            console.log(user);
            // Hash the new password
            let hashedPassword = bcrypt.hashSync(password, saltRounds)
                     // Update the Password
            user.set({
                        password: hashedPassword
                    });
            user.save(function(err, updatedUser) {
                        if (err) {
                            console.log(err);
                            const updatedUserMongodbErrorResponse = new ErrorResponse('500', 'Internal Server Error', err)
                            res.status(500).send(updatedUserMongodbErrorResponse.toObject())
                        } 
                        else 
                        {
                            console.log(updatedUser)
                            const updatedPasswordResponse = new BaseResponse('200', 'Success!', updatedUser);
                            res.json(updatedPasswordResponse.toObject());
                        }
            })
        }
    })
 }
 catch(e)
 {
     console.log(e);
     const resetPasswordCatchError = new ErrorResponse('500', 'Internal server error', e);
     res.status(500).send(resetPasswordCatchError.toObject());
 }
});


 module.exports = router;