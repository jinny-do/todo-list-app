<script setup lang="js">
import axios from "axios";
import { onMounted, ref } from "vue";

const name = ref("");
const email = ref("");

// 수정을 위한 변수 선언
const isEditing = ref(false);
const editName = ref("");

onMounted(async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/user/me");

    name.value = res.data.name;
    email.value = res.data.email;
  } catch (err) {
    console.error(err);
  }
});

// 수정 버튼을 눌렀을 때
const startEdit = () => {
  // 기존 이름이 보이게
  editName.value = name.value; 
  isEditing.value = true;
};

// 취소 버튼을 눌렀을 때
const cancelEdit = () => {
  isEditing.value = false;
};

// 저장 버튼을 눌렀을 때
const saveProfile = async () => {
  if (!editName.value.trim()) {
    alert("이름을 입력해주세요!");
    return;
  }

  try {
    // 보낼 데이터 (이름만)
    const payload = { name: editName.value };

    // 백엔드로 수정 요청 보내기
    await axios.put("http://localhost:3000/api/user/me", payload);

    // 요청 성공 시 화면 업데이트
    name.value = editName.value;
    isEditing.value = false;
    alert("이름이 성공적으로 변경되었습니다.");
  } catch (err) {
    console.error(err);
    alert("정보 수정에 실패했습니다.");
  }
};
</script>

<template>
  <div class="container">
    <div class="profile">
      <router-link to="/todo" class="profile-header-link">
        <h2 class="profile-header-text">📝{{ name }}님의 TODO LIST</h2>
      </router-link>
      <div class="profile-box">
        <div class="profile-img-box">
          <div class="profile-img"></div>
        </div>
        
        <div class="user-info-box">
          <div v-if="!isEditing" class="view-mode">
            <div class="user-info">
              <p>이름 : {{ name }}</p>
              <p>이메일 : {{ email }}</p>
            </div>
            <button type="button" class="re-btn" @click="startEdit">회원정보 수정</button>
          </div>

          <div v-else class="edit-mode">
            <div class="user-info">
              <p class="email-text">이메일 : {{ email }}</p>
              
              <div class="input-group">
                <label>이름 :</label>
                <input type="text" v-model="editName" @keyup.enter="saveProfile" />
              </div>
            </div>
            
            <div class="btn-group">
              <button type="button" class="re-btn" @click="saveProfile">저장</button>
              <button type="button" class="re-btn cancel-btn" @click="cancelEdit">취소</button>
            </div>
          </div>
        </div>
        <img src="/img/pen.png" alt="연필" class="pen" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 50px;
}

.profile {
  margin: auto;
  max-width: 900px;
  padding: 20px;
  background-color: #c89b5a;
  border-radius: 20px;
  border: 3px dashed #8b5e3c;
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}

.profile-header-link {
  text-decoration: none;
}

.profile-header-text:hover {
  color: var(--bg-color);
  transition: all 0.3s;
  cursor: pointer;
}

.profile-header-text {
  color: var(--text-color);
}

.profile-box {
  padding: 40px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 30px;
  position: relative;
}

.profile-img-box {
  background-color: #fff;
  width: 250px;
  height: 335px;
  border: 5px solid #8b5e3c;
  border-radius: 10px;
}

.profile-img {
  width: 100%;
  height: 100%;
  background-image: url("/img/logo.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.user-info-box {
  font-size: 30px;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 5px solid #8b5e3c;
  text-align: center;
  min-height: 335px;
}

/* 평상시 / 수정중 */
.view-mode, .edit-mode {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
}

.email-text {
  font-size: 22px;
  color: #555;
  margin-bottom: 10px;
}

.input-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  font-size: 22px;
}

.input-group input {
  padding: 8px 12px;
  border: 2px solid #c89b5a;
  border-radius: 8px;
  font-size: 18px;
  width: 200px;
  outline: none;
}

.input-group input:focus {
  border-color: #8b5e3c;
}

.btn-group {
  display: flex;
  gap: 15px;
}

.re-btn {
  padding: 10px 20px;
  font-size: 20px;
  font-weight: 600;
  border-radius: 10px;
  border: none;
  background-color: #b38b54;
  color: #fff;
  cursor: pointer;
}

.re-btn:hover {
  background-color: #8b5e3c;
  transition: all 0.3s;
}

.cancel-btn {
  background-color: #8b8b8b;
}

.cancel-btn:hover {
  background-color: #555;
}

.pen {
  position: absolute;
  width: 70px;
  right: 30px;
}
</style>