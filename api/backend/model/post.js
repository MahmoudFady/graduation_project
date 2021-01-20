const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  creatorBigCity: String,
  creatorCity: String,
  creatorPhone: String,
  postText: String,
  postImages: Array,
  createByWorker: Boolean,
  postDate: String,
  job: String,
});
module.exports = mongoose.model("Post", postSchema);
