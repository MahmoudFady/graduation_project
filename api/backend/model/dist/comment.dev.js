"use strict";

var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  commentText: String,
  commentImages: Array,
  commentDate: Date
});
module.exports = mongoose.model("Comment", commentSchema);