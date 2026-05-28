<script setup lang="js">
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const newTodo = ref("");
const todos = ref([]);
const userStr = localStorage.getItem("user");
const userId = userStr ? JSON.parse(userStr).id : null;

// 수정 모드를 위한 변수들 추가
const editingId = ref(null); // 현재 수정 중인 할 일의 ID
const editContent = ref(""); // 수정 중인 텍스트 내용

console.log("저장된 userId:", userId);

const addTodo = async () => {
  if (newTodo.value.trim() === "") return;
  
  if (!userId) {
    alert("로그인 정보가 없습니다. 다시 로그인해 주세요.");
    router.push("/intro");
    return;
  }
  
  const payload = { userId, content: newTodo.value };
  
  try {
    await axios.post("http://localhost:3000/api/todos", payload);
    newTodo.value = "";
    
    // 추가 후 목록 갱신
    const todosRes = await axios.get(`http://localhost:3000/api/todos/${userId}`);
    todos.value = todosRes.data;
  } catch (error) {
    console.error("에러:", error.response?.data || error.message);
  }
};

const deleteTodo = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/api/todos/${id}`);
    todos.value = todos.value.filter((todo) => todo.id !== id);
  } catch (error) {
    console.error(error);
  }
};

// 1. 수정 버튼을 눌렀을 때 (수정 모드 시작)
const startEdit = (todo) => {
  editingId.value = todo.id;
  editContent.value = todo.content;
};

// 2. 수정을 취소했을 때
const cancelEdit = () => {
  editingId.value = null;
  editContent.value = "";
};

// 3. 수정 후 저장 버튼을 눌렀을 때
const saveEdit = async (todo) => {
  if (editContent.value.trim() === "") return;
  
  try {
    await axios.put(`http://localhost:3000/api/todos/${todo.id}`, { content: editContent.value });
    todo.content = editContent.value;
    editingId.value = null;
  } catch (error) {
    console.error(error);
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

// 날짜를 한국 시간에 맞게 YYYY-MM-DD 형태로 바꿔주는 함수
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
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
          <input type="checkbox" :checked="item.is_completed" @change="async () => { await axios.put(`http://localhost:3000/api/todos/${item.id}`, { is_completed: !item.is_completed }); item.is_completed = !item.is_completed; }" />
          
          <div class="content-box">
            <div v-if="editingId === item.id">
              <input 
                v-model="editContent" 
                class="inline-edit-input"
                @keyup.enter="saveEdit(item)"
                @keyup.esc="cancelEdit"
              />
            </div>
            <div v-else>
              <p>{{ item.content }}</p>
            </div>
            <small>{{ formatDate(item.created_at) }}</small>
          </div>
        </div>
        
        <div class="actions">
          <template v-if="editingId === item.id">
            <button @click="saveEdit(item)">저장</button>
            <button @click="cancelEdit">취소</button>
          </template>
          <template v-else>
            <button @click="startEdit(item)">수정</button>
            <button @click="deleteTodo(item.id)">삭제</button>
          </template>
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

.left {
  display: flex;
  gap: 10px;
  align-items: center;
  flex: 1;
}

.content-box {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.todo-item p {
  margin: 0;
  font-weight: bold;
}

.left input[type="checkbox"]:checked + .content-box p {
  text-decoration: line-through;
  color: #8b8b8b;
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

.todo-item button:hover {
  background: #c89b5a;
  color: white;
}

.inline-edit-input {
  width: 90%;
  padding: 5px;
  border: 2px dashed #c89b5a;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
  background-color: transparent;
}
</style>