const express = require("express");
const user = require("../controller/user");
const checkAuth = require("../middleware/check-auth");
const { uploadFiles } = require("../middleware/upload");
const router = express.Router();
// => GET ALL USERS
router.get("/", user.getAllUsers);
// => GET ALL ONLY USER WITHOUT WORKERS
router.get("/users", user.getUsers);
// => USER SIGNUP REQUEST
router.post(
  "/signup",
  uploadFiles().array("workerIdentityImages"),
  user.signup
);
// => USER SINGIN REQUEST
router.post("/signin", user.signin);
// => GET SPECIFIC USER BY ID
router.get("/:id", user.getUser);
// => UPDATE SPECIFIC USER BY ID
router.patch(
  "/:id",
  uploadFiles().single("profileImage"),
  checkAuth,
  user.edit
);
// DELETE SPECIFIC USER BY ID
router.delete("/:id", user.deleteUser);

module.exports = router;
