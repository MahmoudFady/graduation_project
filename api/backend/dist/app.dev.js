"use strict";

require("dotenv").config();

var express = require("express");

var mongoose = require("mongoose");

var morgan = require("morgan");

var userRoutes = require("./router/user");

var postRoutes = require("./router/post");

var reviewRoutes = require("./router/review");

var reportRoutes = require("./router/report");

var path = require("path");

var app = express();
app.use(morgan("dev"));
/**
 * CONNECTING TO DATA BSE
 */

mongoose.connect(process.env.MONGO_DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(function () {
  console.log("Connected to database! at ulrl  " + process.env.MONGO_DB_URL);
})["catch"](function () {
  console.log("Connection failed!");
});
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use("/uploads", express["static"](path.join(__dirname + "/uploads")));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept , Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/report", reportRoutes);
module.exports = app;