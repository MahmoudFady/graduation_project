const express = require("express");
const user = require("../controller/user");
const checkAuth = require("../middleware/check-auth");
const upload = require("../middleware/upload");
const router = express.Router();
router.post(
  "/signup",
  upload.uploadFiles().array("workerIdentityImages"),
  user.signup
);
router.post("/signin", user.signin);
router.get("/:id", user.getUser);
router.get("/", user.getAllUsers);
router.patch(
  "/edit",
  upload.uploadFiles().single("profileImage"),
  checkAuth,
  user.edit
);
router.patch("/acceptWorker/:id", user.acceptWorker);
router.patch("/blockWorker/:id", checkAuth, user.blockWorker);

module.exports = router;
