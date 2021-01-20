const express = require("express");
const router = express.Router();
const report = require("../controller/report");
router.get("/", report.getAllReports);
router.post("/addReport", report.addReport);
router.get("/deleteReport/:id", report.deleteReport);

module.exports = router;
