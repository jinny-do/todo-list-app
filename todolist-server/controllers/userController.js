const db = require("../db/db");

// 특정 유저 정보 가져오기
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
    }
  );
};

// 내 정보 가져오기
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
    }
  );
};

// 이름 수정하기
exports.updateMyProfile = (req, res) => {
  const userId = req.user.id;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "이름을 입력해주세요." });
  }

  db.query(
    "UPDATE users SET name = ? WHERE id = ?",
    [name, userId],
    (err, results) => {
      if (err) {
        console.error("이름 수정 중 DB 오류:", err);
        return res.status(500).json({ message: "DB 오류" });
      }

      res.status(200).json({ message: "이름이 성공적으로 변경되었습니다." });
    }
  );
};