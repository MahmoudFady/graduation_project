// => ALL REQUIRED MODULES USED IN FILE
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const userRoutes = require("./router/user");
const workerRoutes = require("./router/worker");
const postRoutes = require("./router/post");
const reviewRoutes = require("./router/review");
const commentRoutes = require("./router/comment");
const searchRoutes = require("./router/search");
const reportRoutes = require("./router/report");
const path = require("path");

const app = express();
// => GET INFO ABOUT THE RECIVIED REQUEST (URL , STATUS)
app.use(morgan("dev"));
// => CONNECTING TO DATA BSE
mongoose
  .connect(process.env.MONGO_DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  // => ON SUCCESS
  .then(() => {
    console.log("connected to database at url  " + process.env.MONGO_DB_URL);
  })

  // => ON FAILUER
  .catch(() => {
    console.log("Connection failed!");
  });
// => TO READ AND RECIVE DATA FROM REQUEST BODY
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// => MAKE FOLDER UPLOADS STATIC TO ACCESS IMAGES FROM IT
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));
// => ENABLE CORS (CROSS ORIGIN RESOURCE SHARING)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept , Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});
// => ALL API ROUTES
app.use("/api/user", userRoutes);
app.use("/api/worker", workerRoutes);
app.use("/api/post", postRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/report", reportRoutes);

module.exports = app;
