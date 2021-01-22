"use strict";

var Comment = require("../model/comment");

var User = require("../model/user");

var Post = require("../model/post");

exports.addComment = function _callee(decode, req, res, next) {
  var postId, creator, commentText, commentImages, url, commentDate, newComment, oldPost, oldComments, newComments, newPost;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // GET POST ID TO ADD THIS COMMENT
          postId = req.params["postId"]; // GET CREATOR ID FORM RECIVED TOKEN

          creator = decode.userId;
          commentText = req.body.commentText; // HANDLE CODE IF USER SEND IAMGES

          commentImages = [];

          if (req.files) {
            url = "".concat(req.protocol, "://").concat(req.get("host"), "/uploads/");
            commentImages = req.files.map(function (file) {
              return url + file.filename;
            });
          } // SET COMMENT DATE


          commentDate = new Date().toLocaleDateString(); // SAVE COMMENT DATA INTO DB

          _context.next = 8;
          return regeneratorRuntime.awrap(new Comment({
            creator: creator,
            commentText: commentText,
            commentImages: commentImages,
            commentDate: commentDate
          }).save());

        case 8:
          newComment = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap(Post.findById(postId));

        case 11:
          oldPost = _context.sent;
          oldComments = oldPost.comments;
          newComments = [];
          console.log(oldComments.length); // IF THAT POST DOES NOT HAVE COMMENTS

          if (oldComments.length == 0) {
            console.log("now comments yet");
            newComments = [newComment._id];
          } // ELSE THAT POST HASE COMMENTS
          else {
              newComments = oldComments;
              newComments.push(newComment._id);
            } // THEN ADD NEW COMMENT ID TO COMMENTS FIELD OF THAT POST


          _context.next = 18;
          return regeneratorRuntime.awrap(Post.updateOne({
            _id: postId
          }, {
            $set: {
              comments: newComments
            }
          }));

        case 18:
          newPost = _context.sent;
          res.status(200).json({
            message: "comment add",
            newPost: newPost,
            newComment: newComment
          });

        case 20:
        case "end":
          return _context.stop();
      }
    }
  });
};