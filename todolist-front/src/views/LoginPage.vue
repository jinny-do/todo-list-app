<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const email = ref("");
const pw = ref("");

const handleLogin = async () => {
  if (!email.value.trim() || !pw.value.trim()) {
    alert("아이디와 비밀번호를 입력해 주세요!");
    return;
  }

  if (!isEmailValid(email.value)) {
    alert("이메일 형식이 올바르지 않습니다!");
    return;
  }

  try {
    const res = await axios.post("http://localhost:3000/auth/login", {
      email: email.value,
      password: pw.value,
    });

    alert(res.data.message);

    router.push("/todo");
  } catch (err) {
    alert(err.response?.data?.message);
  }
};

const isEmailValid = (email) => {
  return email.includes("@") && email.includes(".");
};
</script>

<template>
  <div class="container">
    <form @submit.prevent="handleLogin">
      <div class="login-form">
        <div class="id-pw-form">
          <div class="id-input lg">
            <label for="id">ID : </label>
            <input
              type="email"
              name="id"
              id="id"
              placeholder="아이디"
              v-model="email"
            />
          </div>
          <div class="pw-input lg">
            <label for="pw">PW : </label>
            <input
              type="password"
              name="pw"
              id="pw"
              placeholder="비밀번호"
              v-model="pw"
            />
          </div>
        </div>

        <button type="submit" class="login-btn">로그인</button>
        <span
          >처음이신가요?
          <router-link to="/signup">회원가입하기</router-link></span
        >
      </div>
    </form>
  </div>
</template>

<style scoped>
.login-form {
  padding: 20px 80px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 15px;
  border-radius: 20px;
  border: 2px solid var(--sub-color);
  justify-content: center;
  align-items: center;
}

.id-pw-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.lg {
  display: flex;
  justify-content: center;
  align-items: center;
}

.lg > label {
  font-size: 25px;
  width: 60px;
  flex: 1;
}

.lg > input {
  padding: 5px;
  border-radius: 10px;
  border: 2px solid var(--sub-color);
  background-color: #fef8e685;
}

.lg > input:focus {
  outline: none;
  border: 3px solid var(--text-color);
}

.login-btn {
  padding: 5px 18px;
  border-radius: 10px;
  font-size: 20px;
  background-color: var(--text-color);
  color: #fff;
  border: none;
  cursor: pointer;
}

.login-btn:hover {
  background-color: var(--sub-color);
  color: var(--text-color);
  transition: all 0.3s;
}
</style>
