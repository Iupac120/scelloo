const express = require("express")
const router = express.Router()

const {getTimeReport, getCompletionReport} = require("../controllers/reportController");

router.get('/report-time',getTimeReport)
router.get('/report',getCompletionReport)

module.exports = router