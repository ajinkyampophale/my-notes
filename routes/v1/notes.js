'use strict';

const express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  logger = reqlib('/helpers/logger'),
  {setErrorResponse} = reqlib('/helpers/response'),
  sendResponse = reqlib('/middlewares/response'),
  notes = reqlib('/models/notes'),
  auth = reqlib('/middlewares/auth'),
  {validateCreate, validateCreateMultiple, validateUpdate, validateDelete} = reqlib('/validation/notes');

// get notes based on id
router.get('/get', auth, async (req, res, next) => {

  try{

    if(res.locals._notes.skipToLastMiddleware) return next();

    const {_id} = res.locals._notes.user;

    // check if id is valid or not
    if(!mongoose.Types.ObjectId.isValid(_id)){
      return setErrorResponse(res, next, 'Invalid id', 400);
    }

    const result = await notes.find({createdBy: _id});

    res.locals._notes.response.message = 'Successfull';
    res.locals._notes.response.data = result;
    return next();
  }
  catch(err){
    logger.error('Get notes api =>  ', err);
    return setErrorResponse(res, next);
  }

}, sendResponse);


// create single note using save or create
router.post('/create', auth, validateCreate, async (req, res, next) => {

  try{
    if(res.locals._notes.skipToLastMiddleware) return next();

    const {title, description} = req.body;
    const {_id} = res.locals._notes.user;

    // 1 => using save
    // create instance of notes
    // const notesObj = new notes({
    //   title, 
    //   description, 
    //   createdBy: _id
    // });

    // save the document
    // const result = await notesObj.save();

    // 2 => using create
    const result = await notes.create({
      title, 
      description, 
      createdBy: _id
    });

    res.locals._notes.response.message = 'Note created successfully!';
    res.locals._notes.response.data = result;
    return next();
  }
  catch(err){
    logger.error('Get notes api =>  ', err);
    return setErrorResponse(res, next);
  }

}, sendResponse);


// create multiple notes using insertMany
router.post('/createMultiple', auth, validateCreateMultiple, async (req, res, next) => {

  try{
    if(res.locals._notes.skipToLastMiddleware) return next();

    const {notesArray} = req.body;
    const {_id} = res.locals._notes.user;

    // adding createdBy to every element
    const insertArray = [];
    for(const ele of notesArray){
      insertArray.push({...ele, createdBy: _id})
    }

    // insert multiple documents
    const result = await notes.insertMany(insertArray);

    res.locals._notes.response.message = 'Notes created successfully!';
    res.locals._notes.response.data = result;
    return next();
  }
  catch(err){
    logger.error('Get notes api =>  ', err);
    return setErrorResponse(res, next);
  }

}, sendResponse);


// update note using updateOne
router.put('/update', auth, validateUpdate, async (req, res, next) => {

  try{
    if(res.locals._notes.skipToLastMiddleware) return next();

    const {title, description, notesId} = req.body;

    // check if id is valid or not
    if(!mongoose.Types.ObjectId.isValid(notesId)){
      return setErrorResponse(res, next, 'Invalid id', 400);
    }

    // update the document
    const result = await notes.updateOne({_id: notesId}, {
      title, 
      description
    });

    res.locals._notes.response.message = 'Note updated successfully!';
    res.locals._notes.response.data = result;
    return next();
  }
  catch(err){
    logger.error('Get notes api =>  ', err);
    return setErrorResponse(res, next);
  }

}, sendResponse);


// update multiple notes using updateMany
router.put('/updateMultiple', auth, validateUpdate, async (req, res, next) => {

  try{
    if(res.locals._notes.skipToLastMiddleware) return next();

    const {notesId, title, description,} = req.body;

    // check if id is valid or not
    if(!mongoose.Types.ObjectId.isValid(notesId)){
      return setErrorResponse(res, next, 'Invalid id', 400);
    }

    // update the document
    const result = await notes.updateMany({_id: notesId}, {title, description});

    res.locals._notes.response.message = 'Notes updated successfully!';
    res.locals._notes.response.data = result;
    return next();
  }
  catch(err){
    logger.error('Get notes api =>  ', err);
    return setErrorResponse(res, next);
  }

}, sendResponse);


// delete notes using deleteOne
router.delete('/delete', auth, validateDelete, async (req, res, next) => {

  try{
    if(res.locals._notes.skipToLastMiddleware) return next();

    const {notesId} = req.body;

    // check if id is valid or not
    if(!mongoose.Types.ObjectId.isValid(notesId)){
      return setErrorResponse(res, next, 'Invalid id', 400);
    }

    // delete the document
    const result = await notes.deleteOne({_id: notesId});

    res.locals._notes.response.message = 'Note deleted successfully!';
    res.locals._notes.response.data = result;
    return next();
  }
  catch(err){
    logger.error('Get notes api =>  ', err);
    return setErrorResponse(res, next);
  }

}, sendResponse);


// delete notes using deleteMany
router.delete('/deleteMultiple', auth, validateDelete, async (req, res, next) => {

  try{
    if(res.locals._notes.skipToLastMiddleware) return next();

    const {notesId} = req.body;

    // check if id is valid or not
    if(!mongoose.Types.ObjectId.isValid(notesId)){
      return setErrorResponse(res, next, 'Invalid id', 400);
    }

    // delete the document
    const result = await notes.deleteMany({_id: notesId});

    res.locals._notes.response.message = 'Notes deleted successfully!';
    res.locals._notes.response.data = result;
    return next();
  }
  catch(err){
    logger.error('Get notes api =>  ', err);
    return setErrorResponse(res, next);
  }

}, sendResponse);


module.exports = router;
