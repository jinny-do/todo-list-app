const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken } = require("../middleware/auth");

router.get("/:id", userController.getUser);
router.get("/me", verifyToken, userController.getMyProfile);

module.exports = router;
