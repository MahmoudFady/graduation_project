"use strict";

var express = require("express");

var user = require("../controller/user");

var checkAuth = require("../middleware/check-auth");

var upload = require("../middleware/upload");

var router = express.Router();
router.post("/signup", upload.uploadFiles().array("workerIdentityImages"), user.signup);
router.post("/signin", user.signin);
router.get("/:id", user.getUser);
router.get("/", user.getAllUsers);
router.patch("/edit", upload.uploadFiles().single("profileImage"), checkAuth, user.edit);
router.patch("/acceptWorker/:id", user.acceptWorker);
router.patch("/blockWorker/:id", checkAuth, user.blockWorker);
module.exports = router;