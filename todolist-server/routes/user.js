const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken } = require("../middleware/auth");

router.get("/me", verifyToken, userController.getMyProfile);
router.get("/:id", userController.getUser);

module.exports = router;
