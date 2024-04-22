const express = require("express");
const router = express.Router();
const employeer = require("../controllers/employees.controller");

router.get("/employees", employeer.getEmployees);
router.post("/employees", employeer.getEmployees);
router.get("/employees/oldest", employeer.getOldestEmployee);
// router.get("/employees/:name", employeer.getEmployees);

module.exports = router;
