const express = require("express");
const router = express.Router();

const employeeAPI = require("./api_employees")

router.use(employeeAPI)

module.exports = router;