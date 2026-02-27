const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { verifyToken } = require("../middleware/authMiddleware");
const { checkRole } = require("../middleware/roleMiddleware");

// Get all users (Admin only)
router.get("/", verifyToken, checkRole(["ADMIN"]), async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete user (Admin only)
router.delete("/:id", verifyToken, checkRole(["ADMIN"]), async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
});

// Update user role (Admin only)
router.put(
  "/:id/role",
  verifyToken,
  checkRole(["ADMIN"]),
  async (req, res) => {
    try {
      const { role } = req.body;

      if (!["ADMIN", "MANAGER", "EMPLOYEE"].includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
      }

      const user = await User.findByIdAndUpdate(
        req.params.id,
        { role },
        { new: true }
      ).select("-password");

      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Role update failed" });
    }
  }
);

module.exports = router;