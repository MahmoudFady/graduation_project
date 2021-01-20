"use strict";

var express = require("express");

var checkAuth = require("../middleware/check-auth");

var post = require("../controller/post");

var upload = require("../middleware/upload");

var router = express.Router();
router.get("/", post.getAllPosts);
router.post("/addPost", upload.uploadFiles().array("postImages", 5), checkAuth, post.addPost);
router["delete"]("/deletePost/:id", checkAuth, post.deletePost);
router.get("/userPosts", checkAuth, post.userPosts);
module.exports = router;