const db = require("../db/db");

exports.addTodo = (req, res) => {
  const { userId, content } = req.body;
  console.log("받은 데이터:", { userId, content });
  
  if (!userId || !content) {
    return res.status(400).json({ error: "userId와 content가 필요합니다" });
  }
  
  db.query("INSERT INTO lists (user_id, content) VALUES (?, ?)", [userId, content], (err) => {
    if (err) {
      console.error("DB 에러:", err);
      res.status(500).json({ error: err.message });
    } else res.send("추가 성공");
  });
};

exports.getTodos = (req, res) => {
  const { userId } = req.params;
  db.query("SELECT id, content, is_completed, created_at FROM lists WHERE user_id = ? AND deleted_at IS NULL ORDER BY created_at DESC", [userId], (err, results) => {
    if (err) res.status(500).send("조회 실패");
    else res.json(results);
  });
};

exports.deleteTodo = (req, res) => {
  const { id } = req.params;
  db.query("UPDATE lists SET deleted_at = NOW() WHERE id = ?", [id], (err) => {
    if (err) res.status(500).send("삭제 실패");
    else res.send("삭제 성공");
  });
};

exports.updateTodo = (req, res) => {
  const { id } = req.params;
  const { content, is_completed } = req.body;
  let query = "UPDATE lists SET ";
  let params = [];
  if (content) { query += "content = ?"; params.push(content); }
  if (is_completed !== undefined) { query += content ? ", is_completed = ?" : "is_completed = ?"; params.push(is_completed); }
  query += " WHERE id = ?";
  params.push(id);
  db.query(query, params, (err) => {
    if (err) res.status(500).send("수정 실패");
    else res.send("수정 성공");
  });
};
