const post = require("../model/post");
const Post = require("../model/post");
// get all posts
exports.getAllPosts = async (req, res, next) => {
  const posts = await Post.find()
    .populate({
      path: "creator",
      select: "_id profileImage userName",
    })
    .populate({
      path: "comments",
      populate: {
        path: "creator",
        select: "_id profileImage userName",
      },
    });

  if (posts.length > 0) {
    res.status(200).json({
      message: "get all posts",
      posts: posts,
    });
  } else if (posts.length < 0) {
    res.status(200).json({
      message: "no  posts to view",
    });
  } else {
    res.status(401).json({
      message: "something go wronf",
    });
  }
};
// ADD POST FUNCTION
exports.addPost = async (decode, req, res, next) => {
  const userId = decode.userId;
  const {
    creatorBigCity,
    creatorCity,
    creatorPhone,
    postDate,
    postText,
    createByWorker,
    job,
  } = req.body;
  console.log(req.body);
  let postImages = [];
  if (req.files) {
    const url = `${req.protocol}://${req.get("host")}/uploads/`;
    postImages = req.files.map((file) => {
      return url + file.filename;
    });
  }
  const newPost = await new Post({
    creator: userId,
    creatorBigCity,
    creatorCity,
    creatorPhone,
    postText,
    postDate,
    createByWorker,
    postImages,
    job,
  }).save();
  newPost.populate("users");
  res.status(200).json({
    message: "post add",
    newPost,
  });
};

//DELETE POST BY ID
exports.deletePost = async (decode, req, res, next) => {
  const creator = decode.userId;
  const postId = req.params.id;
  const deletedPost = await Post.findOneAndDelete({ _id: postId, creator });
  res.status(200).json({
    message: "post deleted",
    deletedPost,
  });
};
// GET POST FOR SPECIAL USER
exports.userPosts = async (decode, req, res, next) => {
  const userId = decode.userId;
  const userPosts = await Post.find({ creator: userId }).populate({
    path: "creator",
    select: "_id profileImage userName",
  });
  res.status(200).json({
    message: "user posts ",
    userPosts,
  });
};
