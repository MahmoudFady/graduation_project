const Report = require("../model/report");
exports.getAllReports = async (req, res, next) => {
  const reports = await Report.find().populate({
    path: "creator",
    select: "_id userName profileImage",
  });
  res.status(200).json({
    reports,
  });
};
exports.addReport = async (req, res, next) => {
  const { creator, reportMessage, reportTo } = req.body;
  const newReport = await new Report({
    creator,
    reportMessage,
    reportTo: "http://localhost:4200/view-profile/" + reportTo,
  }).save();
  res.status(200).json({
    message: "report added",
    newReport,
  });
};
exports.deleteReport = async (req, res, next) => {
  const id = req.params["id"];
  const deletedReport = await findByIdAndDelete(id);
  res.status(200).json({
    message: "report deleted",
    deletedReport,
  });
};
