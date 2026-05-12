<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const newTodo = ref("");
const todos = ref([]);

const addTodo = () => {
  if (newTodo.value.trim() === "") return;

  const now = new Date();
  const dateString = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  const newItem = {
    id: Date.now(),
    text: newTodo.value,
    date: dateString,
    completed: false,
  };

  todos.value.push(newItem);
  newTodo.value = "";
};

const deleteTodo = (id) => {
  todos.value = todos.value.filter((todo) => todo.id !== id);
};

const editTodo = (id) => {
  const todo = todos.value.find((t) => t.id === id);
  const newText = prompt("할 일을 수정하세요", todo.text);
  if (newText && newText.trim() !== "") {
    todo.text = newText;
  }
};

const handleLogout = () => {
  localStorage.clear();
  alert("로그아웃 되었습니다.");
  window.location.href = "/intro";
};

const goToProfile = () => {
  router.push("/profile");
};
</script>

<template>
  <div class="page">
    <h1>오늘의 할 일</h1>
    <div class="container">
      <div class="todo-input">
        <input
          v-model="newTodo"
          placeholder="할 일을 입력하세요..."
          @keyup.enter="addTodo"
        />
        <button @click="addTodo">+</button>
      </div>

      <div v-for="item in todos" :key="item.id" class="todo-item">
        <div class="left">
          <input type="checkbox" v-model="item.completed" />
          <div>
            <p>{{ item.text }}</p>
            <small>{{ item.date }}</small>
          </div>
        </div>
        <div class="actions">
          <button @click="editTodo(item.id)">수정</button>
          <button @click="deleteTodo(item.id)">삭제</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  background: #fff8e7;
  padding: 30px;
  min-height: 100vh;
}

h1 {
  text-align: center;
  padding-bottom: 30px;
}

.container {
  width: 600px;
  margin: 0 auto;
  background: #fff8e7;
  padding: 30px;
  border-radius: 10px;
  border: 5px solid #c89b5a;
}

.todo-input {
  display: flex;
  gap: 10px;
  margin-bottom: 40px;
}

.todo-input input {
  flex: 1;
  padding: 15px;
  border: 2px solid #c89b5a;
  border-radius: 10px;
}

.todo-input button {
  background: #fff8e7;
  font-size: 20px;
  font-weight: bold;
  border: 5px solid #c89b5a;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 10px;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border: 5px solid #c89b5a;
  margin-bottom: 15px;
  border-radius: 10px;
  align-items: center;
}

.todo-item p {
  margin: 0;
  font-weight: bold;
}

.todo-item button {
  background: #fff8e7;
  border: 5px solid #c89b5a;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 8px;
  margin-left: 5px;
  font-weight: bold;
}

.left {
  display: flex;
  gap: 10px;
  align-items: center;
}

.left input[type="checkbox"]:checked + div p {
  text-decoration: line-through;
  color: #8b8b8b;
}

</style>
