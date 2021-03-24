const express = require("express");
const router = express.Router();
const comment = require("../controller/comment");
const upload = require("../middleware/upload");
const checkAuth = require("../middleware/check-auth");
router.get("/:postId", comment.getPostComment);
router.post(
  "/addComment/:postId",
  upload.uploadFiles().array("commentImages", 10),
  checkAuth,
  comment.addComment
);
module.exports = router;
