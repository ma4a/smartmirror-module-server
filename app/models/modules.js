'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var moduleSchema = new Schema({
  author: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  git: {
   type: String
  },
  homepage: {
    type: String
  },
  version: {
    type: String
  }
}, {
  timestamps: true
});


module.exports = mongoose.model('Module', moduleSchema);
