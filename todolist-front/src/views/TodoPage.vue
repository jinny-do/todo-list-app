<script setup></script>

<template>
  <div class="page">
    <h1>오늘의 할 일</h1>
    <div class="container">
      <div class="todo-input">
        <input placeholder="할 일을 입력하세요..." />
        <button>+</button>
      </div>
      <div class="todo-item">
        <div class="left">
          <input type="checkbox" />
          <div>
            <p>Vue 3 학습하기</p>
            <small>2025-04-25</small>
          </div>
        </div>
        <div>
          <button>수정</button>
          <button>삭제</button>
        </div>
      </div>
      <div class="todo-item">
        <div class="left">
          <input type="checkbox" />
          <div>
            <p>프로젝트 구조 설계</p>
            <small>2025-04-26</small>
          </div>
        </div>
        <div>
          <button>수정</button>
          <button>삭제</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  background: #fff8e7;
  padding: 40px 20px;
}

h1 {
  text-align: center;
  padding-bottom: 40px;
}

.container {
  width: 600px;
  margin: 0 auto;
  background: #fff8e7;
  padding: 30px;
  border-radius: 10px;
  border: 5px solid #c89b5a;
}

::placeholder {
  color: #aaaaaa;
  font-size: 20px;
  font-weight: bold;
}

.todo-input {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
}

.todo-input input {
  flex: 1;
  padding: 15px;
}

.todo-input button {
  background: #fff8e7;
  color: #000000;
  font-size: 20px;
  font-weight: bold;
  border: 5px solid #c89b5a;
  padding: 15px 20px;
  cursor: pointer;
  border-radius: 10px;
}

.todo-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  border: 5px solid #c89b5a;
  margin-bottom: 15px;
  font-weight: bold;
  border-radius: 10px;
  font-size: large;
  align-items: center;
}

small {
  color: #8b8b8b;
}

.todo-item button {
  background: #fff8e7;
  color: #000000;
  font-size: 20px;
  font-weight: bold;
  border: 5px solid #c89b5a;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 10px;
  margin-right: 5px;
}

.left {
  display: flex;
  gap: 10px;
}

.left input[type="checkbox"]:checked + div p,
.left input[type="checkbox"]:checked + div small {
  text-decoration: line-through;
  color: #8b8b8b;
  opacity: 0.8;
}
</style>