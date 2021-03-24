"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var User = require("../model/user");

var Post = require("../model/post");

var jwt = require("jsonwebtoken");

var bcrypt = require("bcrypt");

var sendMailTo = require("../middleware/send-mail-to"); // SIGN UP FUNCTION


exports.signup = function _callee(req, res, next) {
  var _req$body, userName, userEmail, userBigCity, userCity, userPhone, userPassword, isWorker, user, url, hash, MUTUAL, newUser, token, job, workerIdentityImages, _newUser;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(" sign up router"); //CATCH MUTUAL DATA BETWEEN WORKER AND USER

          _req$body = req.body, userName = _req$body.userName, userEmail = _req$body.userEmail, userBigCity = _req$body.userBigCity, userCity = _req$body.userCity, userPhone = _req$body.userPhone, userPassword = _req$body.userPassword, isWorker = _req$body.isWorker;
          console.log(isWorker);
          _context.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            userEmail: userEmail
          }));

        case 5:
          user = _context.sent;

          if (user) {
            _context.next = 31;
            break;
          }

          //CATCH THE STATIC PATH OT SHARE IMAGES OR UPLOADS IMAGES
          url = req.protocol + "://" + req.get("host") + "/uploads/"; // CHECK IF USE IS WORKER OR NOT
          // ENCRYBT USER PASSWORD

          _context.next = 10;
          return regeneratorRuntime.awrap(bcrypt.hash(userPassword, 10));

        case 10:
          hash = _context.sent;
          // HANDEL MUTUAL DATA INTO OBJECT
          MUTUAL = {
            profileImage: url + "default_profile.png",
            userName: userName,
            userEmail: userEmail,
            userPhone: userPhone,
            userBigCity: userBigCity,
            userCity: userCity,
            userPassword: hash
          }; // IF USER

          if (!(isWorker == "false")) {
            _context.next = 20;
            break;
          }

          _context.next = 15;
          return regeneratorRuntime.awrap(new User(_objectSpread({}, MUTUAL)).save());

        case 15:
          newUser = _context.sent;
          // SEND TOKEN IF USER
          token = jwt.sign({
            userId: newUser._id,
            userEmail: userEmail
          }, process.env.JWT_SECRET_KEY);
          res.status(200).json({
            message: "successfully user sign up",
            token: token,
            user: newUser
          });
          _context.next = 29;
          break;

        case 20:
          //  CATCH WORKER JOB
          console.log(req.body);
          job = req.body.job;
          workerIdentityImages = req.files.map(function (file) {
            return url + file.filename;
          }); // IF HE IS WORKER WE ADD NEW FILED (job, workerIdentityImages , accepted);

          _context.next = 25;
          return regeneratorRuntime.awrap(new User(_objectSpread({}, MUTUAL, {
            job: job,
            accepted: false,
            workerIdentityImages: workerIdentityImages
          })).save());

        case 25:
          _newUser = _context.sent;
          _context.next = 28;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(_newUser._id, {
            $set: {
              job: job,
              accepted: false,
              workerIdentityImages: workerIdentityImages
            }
          }, {
            //options
            returnNewDocument: true,
            "new": true,
            strict: false
          }));

        case 28:
          res.status(200).json({
            message: "successfully worker sign up"
          });

        case 29:
          _context.next = 32;
          break;

        case 31:
          res.status(201).json({
            message: "this email already used",
            duplicatedEamil: true
          });

        case 32:
        case "end":
          return _context.stop();
      }
    }
  });
}; // SIGN IN FUNCTION


exports.signin = function _callee2(req, res, next) {
  var _req$body2, userEmail, userPassword, user, isPasswordSame, _user, token;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // CATCH EMAIL AND PASSWORD FROM BODY
          _req$body2 = req.body, userEmail = _req$body2.userEmail, userPassword = _req$body2.userPassword; // GET USER FORM DB

          _context2.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            userEmail: userEmail
          }));

        case 3:
          user = _context2.sent;

          if (!user) {
            _context2.next = 19;
            break;
          }

          _context2.next = 7;
          return regeneratorRuntime.awrap(bcrypt.compare(userPassword, user.userPassword));

        case 7:
          isPasswordSame = _context2.sent;

          if (!(isPasswordSame && (user.accepted === undefined || user.accepted === true))) {
            _context2.next = 16;
            break;
          }

          _context2.next = 11;
          return regeneratorRuntime.awrap(User.findOne({
            userEmail: userEmail
          }).select("-__v -userPassword"));

        case 11:
          _user = _context2.sent;
          token = jwt.sign({
            userId: _user._id,
            userEmail: _user.userEmail
          }, process.env.JWT_SECRET_KEY);
          res.status(200).json({
            message: "successfully sign in",
            token: token,
            user: _user
          });
          _context2.next = 17;
          break;

        case 16:
          // IF ACCEPTED = FALSE
          if (user.accepted === false) {
            res.status(406).json({
              message: "sorry your account did not accepted yet"
            });
          } // OTHER WHISE SIGNIN MUST FAILD
          else {
              res.status(200).json({
                message: "faild to sign in"
              });
            }

        case 17:
          _context2.next = 20;
          break;

        case 19:
          res.status(200).json({
            message: "faild to sign in"
          });

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  });
}; // get one user by it's id


exports.getUser = function _callee3(req, res, next) {
  var userId, user, userPosts;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          userId = req.params.id;
          _context3.next = 3;
          return regeneratorRuntime.awrap(User.findById(userId).select("-userPassword -__v"));

        case 3:
          user = _context3.sent;

          if (!user) {
            _context3.next = 11;
            break;
          }

          _context3.next = 7;
          return regeneratorRuntime.awrap(Post.find({
            creator: userId
          }).populate({
            path: "creator",
            select: "_id profileImage userName"
          }).populate({
            path: "comments",
            populate: {
              path: "creator",
              select: "_id profileImage userName"
            }
          }));

        case 7:
          userPosts = _context3.sent;
          res.status(200).json({
            message: "successfully get user",
            user: user,
            userPosts: userPosts
          });
          _context3.next = 12;
          break;

        case 11:
          res.status(204).json({
            message: "user does not exist"
          });

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  });
}; // GET ALL USER FUNCTION


exports.getAllUsers = function _callee4(req, res, next) {
  var users;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(User.find().select("-userPassword -__v"));

        case 2:
          users = _context4.sent;

          if (users.length > 0) {
            res.status(200).json({
              message: "successfully get all users ",
              usersCount: users.length,
              users: users
            });
          } else {
            res.status(200).json({
              message: "no existed user yet"
            });
          }

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
}; // EDIT USER FUNCTION


exports.edit = function _callee5(decode, req, res, next) {
  var _req$body3, userName, userEmail, userPhone, userBigCity, userCity, job, userOld, profileImage, newUser;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _req$body3 = req.body, userName = _req$body3.userName, userEmail = _req$body3.userEmail, userPhone = _req$body3.userPhone, userBigCity = _req$body3.userBigCity, userCity = _req$body3.userCity, job = _req$body3.job;
          _context5.next = 3;
          return regeneratorRuntime.awrap(User.findById(decode.userId));

        case 3:
          userOld = _context5.sent;
          profileImage = userOld.profileImage;

          if (req.file) {
            profileImage = req.protocol + "://" + req.get("host") + "/uploads/" + req.file.filename;
          }

          _context5.next = 8;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(decode.userId, {
            $set: {
              profileImage: profileImage,
              userName: userName,
              userEmail: userEmail,
              userPhone: userPhone,
              userBigCity: userBigCity,
              userCity: userCity,
              job: job
            }
          }, {
            returnNewDocument: true,
            "new": true
          }).select("-userPassword -__v"));

        case 8:
          newUser = _context5.sent;
          res.status(200).json({
            message: "successfully user updated",
            newUser: newUser
          });

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  });
}; //ACCEPT WOKER FUNCTION


exports.acceptWorker = function _callee6(req, res, next) {
  var userId, newUser;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          userId = req.params.id;
          _context6.next = 3;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(userId, {
            $set: {
              accepted: true
            }
          }, {
            returnNewDocument: true,
            "new": true,
            strict: false
          }).select("-userPassword -__v"));

        case 3:
          newUser = _context6.sent;
          sendMailTo(newUser.userEmail, "تم الموافقه ع حسابك");
          res.status(200).json({
            message: "successfully add  worker",
            newUser: newUser
          });

        case 6:
        case "end":
          return _context6.stop();
      }
    }
  });
}; //BLOCK WORKER WOKER FUNCTION


exports.blockWorker = function _callee7(decode, req, res, next) {
  var userId, newUser;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          userId = req.params.id;
          _context7.next = 3;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(userId, {
            $set: {
              accepted: false
            }
          }, {
            returnNewDocument: true,
            "new": true,
            strict: false
          }).select("-userPassword -__v"));

        case 3:
          newUser = _context7.sent;
          res.status(200).json({
            message: "successfully add  worker",
            newUser: newUser
          });

        case 5:
        case "end":
          return _context7.stop();
      }
    }
  });
};