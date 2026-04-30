const db = require("../db/db");

exports.getUser = (req, res) => {
  const userId = req.params.id;

  db.query(
    "SELECT name,email FROM users WHERE id = ?",
    [userId],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "DB 오류",
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          message: "유저 없음",
        });
      }

      res.json(results[0]);
    },
  );
};

exports.getMyProfile = (req, res) => {
  const userId = req.user.id;

  db.query(
    "SELECT name, email FROM users WHERE id = ?",
    [userId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "DB 오류" });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "유저 없음" });
      }

      res.json(results[0]);
    },
  );
};
