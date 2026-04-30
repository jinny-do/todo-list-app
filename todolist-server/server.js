require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const authRoutes = require("./routes/auth");

const userRoutes = require("./routes/user");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`서버 실행 중: http://localhost:${process.env.PORT}`);
});
