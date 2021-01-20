exports.getAllReports = async (req, res, next) => {
  const reports = await Report.find();
  if (reports.length > 0) {
    res.status(200).json({
      message: "get all reports",
      reports: reports,
    });
  } else if (reports.length < 0) {
    res.status(200).json({
      message: "no  reports to view",
    });
  } else {
    res.status(401).json({
      message: "something go wrong",
    });
  }
};
exports.addReport = async (req, res, next) => {
  const data = req.body;
  const newReport = await new Report({
    creatorName: data.creatorName,
    message: data.message,
  }).save();
  if (newReport) {
    res.status(200).json({
      message: "newReport added",
      report: newReport,
    });
  } else {
    res.status(401).json({
      message: "something go wronf",
    });
  }
};
exports.deleteReport = async (req, res, next) => {
  const id = req.params.id;
  const report = await Report.findById(id);
  if (report) {
    res.status(200).json({
      message: "report deleted",
    });
  } else {
    res.status(401).json({
      message: "something go wronf",
    });
  }
};
