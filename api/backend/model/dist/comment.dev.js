"use strict";

var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
  commentText: String,
  creator: {
    type: type
  }
});