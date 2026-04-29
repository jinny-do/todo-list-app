const db = require("../db/db");
const bcrypt = require("bcrypt");

// 회원가입
exports.signup = (req, res) => {
  const { name, email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) return res.status(500).send("DB오류");

      if (results.length > 0) {
        return res.status(400).send("이미 가입된 이메일입니다.");
      }

      try {
        const hashedPw = await bcrypt.hash(password, 10);

        db.query(
          "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
          [name, email, hashedPw],
          (err) => {
            if (err) return res.status(500).send("회원가입 실패");

            res.send("회원가입 성공");
          },
        );
      } catch (error) {
        res.status(500).send("서버오류");
      }
    },
  );
};

// 로그인
exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) return res.status(500).send("DB 오류");

      if (results.length === 0) {
        return res
          .status(400)
          .json({ message: "이메일 또는 비밀번호가 일치하지 않습니다." });
      }

      const user = results[0];

      try {
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res
            .status(400)
            .send("이메일 또는 비밀번호가 일치하지 않습니다.");
        }

        res.send("로그인 성공");
      } catch (error) {
        res.status(500).send("서버오류");
      }
    },
  );
};

// 이메일 중복 확인
exports.checkEmail = (req, res) => {
  const { email } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).send("DB오류");

    if (results.length > 0) {
      return res.send({ available: false });
    } else {
      return res.send({ available: true });
    }
  });
};
