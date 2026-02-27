const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const { checkRole } = require("../middleware/roleMiddleware");
const { getDashboardStats } = require("../controllers/dashboardController");

// Only ADMIN and MANAGER can view dashboard
router.get(
  "/stats",
  verifyToken,
  checkRole(["ADMIN", "MANAGER"]),
  getDashboardStats
);

module.exports = router;