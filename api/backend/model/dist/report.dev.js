"use strict";

var mongoose = require("mongoose");

var reportSchema = new mongoose.Schema({
  creatorId: String,
  creatorName: String,
  message: String
});
module.exports = mongoose.model("Report", reportSchema);