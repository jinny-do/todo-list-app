const express = require("express");
const router = express.Router();
const { addTodo, getTodos, deleteTodo, updateTodo } = require("../controllers/todoController");

router.post("/", addTodo);
router.get("/:userId", getTodos);
router.delete("/:id", deleteTodo);
router.put("/:id", updateTodo);

module.exports = router;
