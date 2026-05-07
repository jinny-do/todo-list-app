require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

// 라우터 불러오기
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// [수정된 부분] 프론트엔드의 요청 주소와 일치하도록 앞에 /api를 다시 붙였습니다.
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${PORT}`);
});
