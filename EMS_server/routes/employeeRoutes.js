// routes/employee.routes.js
const express = require("express");
const router = express.Router();
const {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee
} = require("../controllers/employeeController");
const { verifyToken } = require("../middleware/authMiddleware");
const { checkRole } = require("../middleware/roleMiddleware");

//everyone logged in can view
router.get("/",verifyToken, getEmployees);

//only ADMIN can add
router.post("/", verifyToken,checkRole(["ADMIN"]),addEmployee);

//ADMIN & MANAGER can edit
router.put("/:id",verifyToken,checkRole(["ADMIN","MANAGER"]), updateEmployee);

//only ADMIN
router.delete("/:id",verifyToken,checkRole(["ADMIN"]),deleteEmployee);

module.exports = router;