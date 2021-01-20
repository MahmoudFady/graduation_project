"use strict";

exports.getAllReports = function _callee(req, res, next) {
  var reports;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Report.find());

        case 2:
          reports = _context.sent;

          if (reports.length > 0) {
            res.status(200).json({
              message: "get all reports",
              reports: reports
            });
          } else if (reports.length < 0) {
            res.status(200).json({
              message: "no  reports to view"
            });
          } else {
            res.status(401).json({
              message: "something go wrong"
            });
          }

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.addReport = function _callee2(req, res, next) {
  var data, newReport;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          data = req.body;
          _context2.next = 3;
          return regeneratorRuntime.awrap(new Report({
            creatorName: data.creatorName,
            message: data.message
          }).save());

        case 3:
          newReport = _context2.sent;

          if (newReport) {
            res.status(200).json({
              message: "newReport added",
              report: newReport
            });
          } else {
            res.status(401).json({
              message: "something go wronf"
            });
          }

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.deleteReport = function _callee3(req, res, next) {
  var id, report;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Report.findById(id));

        case 3:
          report = _context3.sent;

          if (report) {
            res.status(200).json({
              message: "report deleted"
            });
          } else {
            res.status(401).json({
              message: "something go wronf"
            });
          }

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
};