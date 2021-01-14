'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notesSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  description: {
    type: String,
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model('notes', notesSchema);