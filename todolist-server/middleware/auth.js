const db = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("dotenv").config();

// 토큰 미들웨어
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "토큰 없음",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; //{ id: ...}
    next();
  } catch (err) {
    return res.status(401).json({
      message: "토큰이 유효하지 않음",
    });
  }
};
