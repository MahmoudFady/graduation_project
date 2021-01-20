"use strict";

var express = require("express");

var router = express.Router();

var comment = require("../controller/comment");

var upload = require("../middleware/upload");

var checkAuth = require("../middleware/check-auth");

router.post("/addComment/:postId", upload.uploadFiles().array("commentImages", 10), checkAuth, comment.addComment);
module.exports = router;