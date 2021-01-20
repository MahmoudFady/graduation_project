const express = require("express");
const checkAuth = require("../middleware/check-auth");
const post = require("../controller/post");
const upload = require("../middleware/upload");
const router = express.Router();

router.get("/", post.getAllPosts);
router.post(
  "/addPost",
  upload.uploadFiles().array("postImages", 5),
  checkAuth,
  post.addPost
);
router.delete("/deletePost/:id", checkAuth, post.deletePost);
router.get("/userPosts", checkAuth, post.userPosts);

module.exports = router;
