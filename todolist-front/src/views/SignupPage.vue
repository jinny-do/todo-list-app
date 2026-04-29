<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const name = ref("");
const email = ref("");
const pw = ref("");
const pwChk = ref("");
const isMatch = ref(true);

const router = useRouter();

const handleSignup = async () => {
  if (
    !name.value.trim() ||
    !email.value.trim() ||
    !pw.value.trim() ||
    !pwChk.value.trim()
  ) {
    alert("빈 칸을 모두 작성해 주세요!");
    return;
  }

  if (!emailValChk(email.value)) {
    alert("이메일을 정확히 입력해 주세요!");
    return;
  }
  if (!isMatch.value) {
    alert("비밀번호가 일치하지 않습니다!");
    return;
  }

  try {
    const res = await axios.post("http://localhost:3000/auth/signup", {
      name: name.value,
      email: email.value,
      password: pw.value,
    });

    alert(res.data);
    router.push("/intro");
  } catch (err) {
    alert(err.response?.data || "회원가입 실패");
  }
};

const emailValChk = (email) => {
  return email.includes("@") && email.includes(".");
};

watch([pw, pwChk], ([newPw, newPwChk]) => {
  if (!newPwChk) {
    isMatch.value = true;
  } else {
    isMatch.value = newPw === newPwChk;
  }
});

// 이메일 중복 확인
const checkEmail = async () => {
  if (!email.value.trim()) {
    alert("이메일을 입력하세요");
    return;
  }

  try {
    const res = await axios.post("http://localhost:3000/auth/check-email", {
      email: email.value,
    });

    if (res.data.available) {
      alert("사용 가능한 이메일입니다.");
    } else {
      alert("이미 사용중인 이메일입니다.");
    }
  } catch (err) {
    alert("에러");
  }
};
</script>

<template>
  <div class="container">
    <div class="main-logo-img"></div>
    <h1 class="signup-text">회원가입</h1>
    <form @submit.prevent="handleSignup">
      <div class="signup-form">
        <div class="signup">
          <div class="name-form form">
            <label for="name">이름 : </label>
            <input type="text" name="name" id="name" v-model="name" />
          </div>

          <div class="email-form form">
            <label for="email">이메일 : </label>
            <div class="email-btn">
              <input type="email" id="email" name="email" v-model="email" />
              <button
                type="button"
                class="email-chk hover-btn"
                @click="checkEmail"
              >
                중복 확인
              </button>
            </div>
          </div>

          <div class="pw-form form">
            <label for="pw">비밀번호 : </label>
            <input type="password" name="pw" id="pw" v-model="pw" />
          </div>
          <div class="pw-chk-form form">
            <label for="pw-chk">비밀번호 확인 : </label>
            <input type="password" name="pw-chk" id="pw-chk" v-model="pwChk" />
          </div>
          <div class="pw-chk-text" v-if="!isMatch">
            비밀번호가 일치하지 않습니다!
          </div>
        </div>

        <button type="submit" class="signup-btn hover-btn">회원가입</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.container {
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.signup-text {
  font-size: 50px;
  color: var(--text-color);
}

.signup-form {
  background-color: #fff;
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 2px solid var(--sub-color);
}

.signup {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.form > label {
  font-size: 25px;
  width: 130px;
  flex: 1;
  text-align: right;
}

.form input {
  padding: 5px;
  border-radius: 10px;
  border: 2px solid var(--sub-color);
  background-color: #fef8e685;
}

.form input:focus {
  outline: none;
  border: 3px solid var(--text-color);
}

.signup-btn {
  padding: 5px 20px;
  font-size: 20px;
  border-radius: 10px;
  border: none;
  background-color: var(--text-color);
  color: #fff;
  cursor: pointer;
}

.hover-btn:hover {
  background-color: var(--sub-color);
  color: var(--text-color);
  transition: all 0.3s;
}

.email-form {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.email-form label {
  width: 130px;
  text-align: right;
  flex-shrink: 0;
}
.email-btn {
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: end;
}

.email-chk {
  padding: 5px;
  font-size: 12px;
  background-color: var(--text-color);
  border-radius: 8px;
  border: none;
  color: #fff;
  cursor: pointer;
}

.pw-chk-text {
  text-align: right;
  color: #ff0000;
}
</style>
