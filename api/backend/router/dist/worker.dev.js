"use strict";

var express = require("express");

var worker = require("../controller/worker");

var upload = require("../middleware/upload");

var router = express.Router();
router.post("/signup", upload.uploadFiles().array("images", 5), worker.signup);
router.post("/signin", worker.signin);
router.patch("/accept/:id", worker.accept);
router["delete"]("/:id", worker.deleteWorker);
router.post("/review/:id", worker.review);
router.get("/acceptedWorkers", worker.acceptedWorkers);
router.get("/notAcceptedWorkers", worker.notAcceptedWorkers);
router.get("/:id", worker.getWorker);
router.get("/", worker.getAllWorkers);
router.patch("/edit/:id", upload.uploadFiles().single("image"), worker.edit);
module.exports = router;