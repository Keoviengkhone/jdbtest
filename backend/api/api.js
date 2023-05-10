const express = require("express");
const router = express.Router();

const employeeAPI = require("./api_employees")
const departmentAPI = require("./api_department")


router.use(employeeAPI)
router.use(departmentAPI)

module.exports = router;