"use strict";

var Worker = require("../model/worker");

var bcrypt = require("bcrypt");

var Review = require("../model/review");

var Post = require("../model/post");

var jwt = require("jsonwebtoken");

exports.signup = function _callee(req, res, next) {
  var _req$body, fullName, email, password, bigCity, city, job, phone, worker, hash, url, imgsPath, newJober, token;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, fullName = _req$body.fullName, email = _req$body.email, password = _req$body.password, bigCity = _req$body.bigCity, city = _req$body.city, job = _req$body.job, phone = _req$body.phone;
          _context.next = 3;
          return regeneratorRuntime.awrap(Worker.findOne({
            email: email
          }));

        case 3:
          worker = _context.sent;

          if (worker) {
            _context.next = 16;
            break;
          }

          _context.next = 7;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

        case 7:
          hash = _context.sent;
          url = req.protocol + "://" + req.get("host");
          imgsPath = req.files ? req.files.map(function (file) {
            return url + "/uploads/" + file.filename;
          }) : [];
          _context.next = 12;
          return regeneratorRuntime.awrap(new Worker({
            fullName: fullName,
            email: email,
            password: hash,
            address: {
              bigCity: bigCity,
              city: city
            },
            job: job,
            phone: phone,
            images: imgsPath,
            accepted: false,
            image: url + "/uploads/" + "default_profile.png"
          }).save());

        case 12:
          newJober = _context.sent;

          if (newJober) {
            token = jwt.sign({
              id: newJober._id,
              email: newJober.email
            }, process.env.JWT_SECRET_KEY);
            res.status(200).json({
              message: "worker successfully signup",
              token: token
            });
          } else {
            res.status(201).json({
              message: "something go wrong"
            });
          }

          _context.next = 17;
          break;

        case 16:
          res.status(201).json({
            message: "user existed."
          });

        case 17:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.signin = function _callee2(req, res, next) {
  var data, worker, resualt, token;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          data = req.body;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Worker.findOne({
            email: data.email
          }));

        case 3:
          worker = _context2.sent;

          if (!worker) {
            _context2.next = 8;
            break;
          }

          _context2.next = 7;
          return regeneratorRuntime.awrap(bcrypt.compare(data.password, worker.password));

        case 7:
          resualt = _context2.sent;

        case 8:
          if (!worker || !resualt) {
            res.status(201).json({
              message: "worker faild to signin."
            });
          } else if (!worker.accepted) {
            res.status(201).json({
              message: "worker doest accepted yet from admin"
            });
          } else if (worker.accepted && resualt) {
            token = jwt.sign({
              id: worker._id,
              email: worker.email
            }, process.env.JWT_SECRET_KEY);
            res.status(200).json({
              message: "worker successfully signin",
              token: token,
              userId: worker._id,
              fullName: worker.fullName,
              email: worker.email,
              bigCity: worker.address.bigCity,
              city: worker.address.city,
              phone: worker.phone,
              job: worker.job
            });
          } else {
            res.status(200).json({
              message: "something go wrong."
            });
          }

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.accept = function _callee3(req, res, next) {
  var worker;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Worker.findById(req.params.id));

        case 2:
          worker = _context3.sent;

          if (!worker) {
            _context3.next = 9;
            break;
          }

          _context3.next = 6;
          return regeneratorRuntime.awrap(Worker.updateOne({
            _id: req.params.id
          }, {
            $set: {
              accepted: true
            }
          }));

        case 6:
          res.status(200).json({
            message: "worker accepted"
          });
          _context3.next = 10;
          break;

        case 9:
          if (!worker) {
            res.status(201).json({
              message: "un existed worker to accept"
            });
          } else {
            res.status(201).json({
              message: "something go wrong."
            });
          }

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.deleteWorker = function _callee4(req, res, next) {
  var resualt;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Worker.deleteOne({
            _id: req.params.id
          }));

        case 2:
          resualt = _context4.sent;

          if (resualt.deletedCount != 0) {
            res.status(200).json({
              message: "worker deleted"
            });
          } else if (resualt.deletedCount === 0) {
            res.status(201).json({
              message: "un existed worker to delete"
            });
          } else {
            res.status(404).json({
              message: "something go wrong."
            });
          }

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.review = function _callee5(req, res, next) {
  var id, data, worker, newReview, newReviews;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          data = req.body;
          _context5.next = 4;
          return regeneratorRuntime.awrap(Worker.findById(id));

        case 4:
          worker = _context5.sent;
          newReview = new Review({
            fullName: data.fullName,
            message: data.message
          });

          if (!worker) {
            _context5.next = 25;
            break;
          }

          _context5.next = 9;
          return regeneratorRuntime.awrap(newReview.save());

        case 9:
          if (!(worker.reviews.length === 0)) {
            _context5.next = 15;
            break;
          }

          _context5.next = 12;
          return regeneratorRuntime.awrap(worker.update({
            $set: {
              reviews: [newReview._id]
            }
          }));

        case 12:
          res.status(200).json({
            message: "successfully review worker"
          });
          _context5.next = 25;
          break;

        case 15:
          if (!(worker.reviews.length > 0)) {
            _context5.next = 24;
            break;
          }

          newReviews = worker.reviews;
          newReviews.push(newReview._id);
          console.log(newReviews);
          _context5.next = 21;
          return regeneratorRuntime.awrap(Worker.updateOne({
            _id: id
          }, {
            $set: {
              reviews: newReviews
            }
          }));

        case 21:
          res.status(200).json({
            message: "successfully review worker"
          });
          _context5.next = 25;
          break;

        case 24:
          res.status(201).json({
            message: "something go wrong."
          });

        case 25:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.getWorker = function _callee6(req, res, next) {
  var id, worker;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          id = req.params.id;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Worker.findById(id).populate("reviews posts").select("-password"));

        case 3:
          worker = _context6.sent;

          if (worker) {
            res.status(200).json({
              userId: worker._id,
              fullName: worker.fullName,
              email: worker.email,
              bigCity: worker.address.bigCity,
              city: worker.address.city,
              phone: worker.phone,
              job: worker.job,
              image: worker.image,
              posts: worker.posts
            });
          }

        case 5:
        case "end":
          return _context6.stop();
      }
    }
  });
};

exports.getAllWorkers = function _callee7(req, res, next) {
  var workers;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(Worker.find().populate("reviews").select("-password"));

        case 2:
          workers = _context7.sent;

          if (workers.length > 0) {
            res.status(200).json({
              message: "successfully get all worker ",
              jobersCount: workers.length,
              workers: workers
            });
          } else {
            res.status(200).json({
              message: "no existed worker yet"
            });
          }

        case 4:
        case "end":
          return _context7.stop();
      }
    }
  });
};

exports.edit = function _callee9(req, res, next) {
  var data, id, oldUser, updatedImage, url, updatedInfo, updatedWorker, workerPosts_old;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          data = req.body;
          id = req.params.id;
          _context9.next = 4;
          return regeneratorRuntime.awrap(Worker.findById(id));

        case 4:
          oldUser = _context9.sent;
          updatedImage = oldUser.image;

          if (req.file) {
            url = req.protocol + "://" + req.get("host");
            updatedImage = url + "/uploads/" + req.file.filename;
          }

          updatedInfo = {
            fullName: data.fullName,
            email: data.email,
            address: {
              bigCity: data.bigCity,
              city: data.city
            },
            phone: data.phone,
            image: updatedImage
          };
          _context9.next = 10;
          return regeneratorRuntime.awrap(Worker.updateOne({
            _id: id
          }, {
            $set: updatedInfo
          }));

        case 10:
          _context9.next = 12;
          return regeneratorRuntime.awrap(Worker.findById(id));

        case 12:
          updatedWorker = _context9.sent;
          workerPosts_old = updatedWorker.posts;
          workerPosts_old.forEach(function _callee8(postId) {
            return regeneratorRuntime.async(function _callee8$(_context8) {
              while (1) {
                switch (_context8.prev = _context8.next) {
                  case 0:
                    _context8.next = 2;
                    return regeneratorRuntime.awrap(Post.updateOne({
                      _id: postId
                    }, {
                      $set: {
                        creatorName: updatedInfo.fullName,
                        creatorImage: updatedImage
                      }
                    }));

                  case 2:
                  case "end":
                    return _context8.stop();
                }
              }
            });
          });
          res.status(200).json({
            message: "user updated",
            updatedImage: updatedImage
          });

        case 16:
        case "end":
          return _context9.stop();
      }
    }
  });
};

exports.acceptedWorkers = function _callee10(req, res, next) {
  var workers;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap(Worker.find({
            accepted: true
          }));

        case 2:
          workers = _context10.sent;

          if (workers.length > 0) {
            res.status(200).json({
              message: "successfully get accepted workers",
              workers: workers
            });
          } else {
            res.status(201).json({
              message: "no  accepted workers"
            });
          }

        case 4:
        case "end":
          return _context10.stop();
      }
    }
  });
};

exports.notAcceptedWorkers = function _callee11(req, res, next) {
  var workers;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return regeneratorRuntime.awrap(Worker.find({
            accepted: !true
          }));

        case 2:
          workers = _context11.sent;

          if (workers.length > 0) {
            res.status(200).json({
              message: "successfully get not accepted workers",
              workers: workers
            });
          } else {
            res.status(201).json({
              message: "no un accepted workers"
            });
          }

        case 4:
        case "end":
          return _context11.stop();
      }
    }
  });
};