require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const userRoutes = require("./router/user");
const postRoutes = require("./router/post");
const reviewRoutes = require("./router/review");
const reportRoutes = require("./router/report");
const path = require("path");

const app = express();
app.use(morgan("dev"));
/**
 * CONNECTING TO DATA BSE
 */
mongoose
  .connect(process.env.MONGO_DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database! at ulrl  " + process.env.MONGO_DB_URL);
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
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
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/review", reviewRoutes);

app.use("/api/report", reportRoutes);

module.exports = app;
