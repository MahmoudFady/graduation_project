"use strict";

var Post = require("../model/post"); // get all posts


exports.getAllPosts = function _callee(req, res, next) {
  var posts;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Post.find().populate({
            path: "creator",
            select: "_id profileImage userName"
          }).populate({
            path: "comments",
            populate: {
              path: "creator",
              select: "_id profileImage userName"
            }
          }));

        case 2:
          posts = _context.sent;

          if (posts.length > 0) {
            res.status(200).json({
              message: "get all posts",
              posts: posts
            });
          } else if (posts.length < 0) {
            res.status(200).json({
              message: "no  posts to view"
            });
          } else {
            res.status(401).json({
              message: "something go wronf"
            });
          }

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}; // ADD POST FUNCTION


exports.addPost = function _callee2(decode, req, res, next) {
  var userId, _req$body, creatorBigCity, creatorCity, creatorPhone, postDate, postText, createByWorker, job, postImages, url, newPost;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          userId = decode.userId;
          _req$body = req.body, creatorBigCity = _req$body.creatorBigCity, creatorCity = _req$body.creatorCity, creatorPhone = _req$body.creatorPhone, postDate = _req$body.postDate, postText = _req$body.postText, createByWorker = _req$body.createByWorker, job = _req$body.job;
          postImages = [];

          if (req.files) {
            url = "".concat(req.protocol, "://").concat(req.get("host"), "/uploads/");
            postImages = req.files.map(function (file) {
              return url + file.filename;
            });
          }

          _context2.next = 6;
          return regeneratorRuntime.awrap(new Post({
            creator: userId,
            creatorBigCity: creatorBigCity,
            creatorCity: creatorCity,
            creatorPhone: creatorPhone,
            postText: postText,
            postDate: postDate,
            createByWorker: createByWorker,
            postImages: postImages,
            job: job
          }).save());

        case 6:
          newPost = _context2.sent;
          _context2.next = 9;
          return regeneratorRuntime.awrap(Post.findById(newPost.id).populate({
            path: "creator",
            select: "_id profileImage userName"
          }));

        case 9:
          newPost = _context2.sent;
          res.status(200).json({
            message: "post add",
            newPost: newPost
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  });
}; //DELETE POST BY ID


exports.deletePost = function _callee3(decode, req, res, next) {
  var creator, postId, deletedPost;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          //GET USER BY FROM RECIVED TOKEN
          creator = decode.userId; //GET POST ID FROM PARAMS OBJECT

          postId = req.params["postId"]; // GET POST BY ID THEN DELETE IT

          _context3.next = 4;
          return regeneratorRuntime.awrap(Post.findOneAndDelete({
            _id: postId,
            creator: creator
          }));

        case 4:
          deletedPost = _context3.sent;
          res.status(200).json({
            message: "post deleted",
            deletedPost: deletedPost
          });

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
}; // GET POSTS FOR SPECIAL USER < CREATOR VALUE>


exports.userPosts = function _callee4(decode, req, res, next) {
  var userId, userPosts;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          // GET USER ID FROM RECIVED TOKEN
          userId = decode.userId; // THEN GET ALL POSTS WHICH IT IS CREATOR FIELD MATH THAT USER ID

          _context4.next = 3;
          return regeneratorRuntime.awrap(Post.find({
            creator: userId
          }) // POPULATE THE CREATOR OF EACH POST
          .populate({
            path: "creator",
            select: "_id profileImage userName"
          }) // THEN POPULATE ALL COMMENTS WHICH BELOGN TO THAT POST
          .populate({
            path: "comments",
            // THEN POPULATE THE CREATRO OF THAT COMMENT
            populate: {
              path: "creator",
              select: "_id profileImage userName"
            }
          }));

        case 3:
          userPosts = _context4.sent;
          res.status(200).json({
            message: "user posts ",
            userPosts: userPosts
          });

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
}; //GET POST BY ID


exports.getPostById = function _callee5(req, res, next) {
  var postId, post;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          postId = req.params["postId"];
          _context5.next = 3;
          return regeneratorRuntime.awrap(Post.findById(postId) // POPULATE THE CREATOR OF EACH POST
          .populate({
            path: "creator",
            select: "_id profileImage userName"
          }) // THEN POPULATE ALL COMMENTS WHICH BELOGN TO THAT POST
          .populate({
            path: "comments",
            // THEN POPULATE THE CREATRO OF THAT COMMENT
            populate: {
              path: "creator",
              select: "_id profileImage userName"
            }
          }));

        case 3:
          post = _context5.sent;

          if (post) {
            res.status(200).json({
              message: "get post with id : " + postId,
              post: post
            });
          } else {
            res.status(200).json({
              message: "faild to get  post with id : " + postId,
              alert: "we suggest that id is not exist"
            });
          }

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  });
};