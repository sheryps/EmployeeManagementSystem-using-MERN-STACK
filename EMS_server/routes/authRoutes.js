const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");
const { checkRole } = require("../middleware/roleMiddleware");


router.post("/register",verifyToken,checkRole(["ADMIN"]), register);
router.post("/login", login);

module.exports = router;