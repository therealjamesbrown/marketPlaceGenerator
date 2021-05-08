/**
 * 
 * ================================
 * ; Title: BCRS PROJECT
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Date: 10/14/2020
 * ; Description: Application for Bobs Computer Repair Shop.
 * ================================
 * 
 */

 const express = require('express');

//TODO Import Catalog model
const router = express.Router();

// Import the Catalog Model
const Catalog = require('../models/catalog')


//bring in our base and error response classes
 const BaseResponse = require('../services/base-response');
 const ErrorResponse = require('../services/error-response');

 

 /**
  * 
  * --Find All Items--
  * 
  */



router.get('/', async(req, res) => {
  try{
    //pulling all documents, so we'll leave the request object empty and 
    //just worry about the callback function.
    Catalog.find({},
      function(err, item){
        if(err){
          console.log(err);
          const mongoDbFindAllErrorResponse = new ErrorResponse('500', 'Internal Server Error', err)
          res.status(500).send(mongoDbFindAllErrorResponse.toObject());
        } else {
          console.log(item);
          const findAllSuccessResponse = new BaseResponse('200', 'Successful!', item);
          res.json(findAllSuccessResponse.toObject());
        }
      });
  }catch(e){
    console.log(e);
    const errorFindAllCatchResponse = new ErrorResponse('500', 'Internal Server Error', e.message);
    res.status(500).send(errorFindAllCatchResponse.toObject());
  }
});





 /**
  * 
  * --Find Item by ID--
  * 
  */

  router.get('/:id', function(req, res) {
    try {
      // Find the indivudal item
      Catalog.findOne({ "_id": req.params.id }, function(err, item) {
        if (err) {
          const ErrorMessage = new ErrorResponse('500', 'Internal Server Error', err);
          res.json(ErrorMessage.toObject())
        }
        // output the single item
  
        else { 
          const SuccessMessage = new BaseResponse('200', 'Successful GET Request', item)
                res.json(SuccessMessage.toObject())
      }})
    } catch (e) {
      console.log(e)
    }
  })


/**
 * 
 * --CREATE Item-- 
 * Created by SK
 */
router.post('/', async(req, res) => {
  try
  {
      let newCatalogItem = {
          title: req.body.title,
          price: req.body.price,
      };

      Catalog.create(newCatalogItem, function(err, catalogItem) {
          if (err)
          {
              console.log(err);
              const createCatalogItemMongodbErrorResponse = new ErrorResponse('500', 'Internal Server Error!', err);
              res.status(500).send(createCatalogItemMongodbErrorResponse.toObject());
          }
          else {
              console.log(catalogItem);
              const createCatalogItemResponse = new BaseResponse('200', 'Success!', catalogItem);
              res.json(createCatalogItemResponse.toObject());
          }
      })
  }
  catch (e)
  {
      console.log(e);
      const createCatalogItemCatchErrorResponse = new ErrorResponse('500', 'Internal Server Error!', e.message);
      res.status(500).send(createCatalogItemCatchErrorResponse.toObject());
  }
});




 /**
 * 
 * --Update Item-- 
 * Created by SK
 */

router.put('/:catalogItemId/update', async(req, res) =>{
  try{
  Catalog.findOne({'_id': req.params.catalogItemId}, function(error, catalogItem){
      if(error){
          console.log(err);
          const updateCatalogItemMongoErrorResponse = new ErrorResponse('500', 'Internal Server Error!', error);
          res.status(500).send(updateCatalogItemMongoErrorResponse.toObject());
      } else {

          catalogItem.set({
              title: req.body.title,
              price: req.body.price,
              isDisabled: req.body.isDisabled //10:27 - JB added disabled so we can enable/disable from the edit screen. this is line with the rest of apis.
          });
          catalogItem.save(function(err, updatedCatalogItem){
              if(err){
                  console.log(err);
                  const saveUpdatedCatalogItemErrorResponse = new ErrorResponse('500', 'Internal Server Error!', err);
                  res.status(500).send(saveUpdatedCatalogItemErrorResponse.toObject());
              } else {
                  console.log(updatedCatalogItem);
                  const saveUpdatedCatalogItemSuccess = new BaseResponse('200', 'Success!', updatedCatalogItem);
                  res.json(saveUpdatedCatalogItemSuccess.toObject());
              }
          })
      }
  })
} catch(e){
  console.log(e);
  const updateCatalogItemCatchErrorResponse = new ErrorResponse('500', 'Internal Server Error!', e.message);
  res.json(updateCatalogItemCatchErrorResponse.toObject());
}
})



 /**
  * 
  * --Delete Item--
  * 
  */
  router.patch('/:_id', async(req, res) => {
    try{
      Catalog.findOne({'_id': req.params._id}, function(error, item){
        if(error){
          console.log(error);
          const deleteTaskMongoErrorResponse = new ErrorResponse('500', 'Internal Server Error', err);  //sk fixed typo 'Reponse' to 'Response'
          res.status(500).send(deleteTaskMongoErrorResponse.toObject()); //sk fixed typo 'Reponse' to 'Response'
        } else {
          item.set({
            isDisabled: true
          });

          item.save(function(err, updatedItem){
            if(err){
              console.log(err);
              const updateIsDisabledStatusError = new ErrorResponse('500', 'Internal Server Error', err);
              res.status(500).send(updateIsDisabledStatusError.toObject());
            } else {
              console.log(updatedItem);
              const updateIsDisabledStatusSuccess = new BaseResponse('200', 'Success!', updatedItem);
              res.json(updateIsDisabledStatusSuccess.toObject());
            }
          })
        }
      })
    }catch(err){
      console.log(err);
      const updateIsDisabledCatchError = new ErrorResponse('500', 'Internal Server Error', err.message);
      res.status(500).send(updateIsDisabledCatchError.toObject());
    }
  })

 module.exports = router; 