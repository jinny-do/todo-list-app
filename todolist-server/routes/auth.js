const express = require("express");
const router = express.Router();

const { signup, login, checkEmail } = require("../controllers/authController");

router.post("/signup", signup);

router.post("/login", login);

router.post("/check-email", checkEmail);

module.exports = router;
