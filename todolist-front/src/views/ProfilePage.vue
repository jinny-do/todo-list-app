<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

const name = ref("");
const email = ref("");

onMounted(async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/user/me");

    name.value = res.data.name;
    email.value = res.data.email;
  } catch (err) {
    console.error(err);
  }
});
</script>

<template>
  <div class="container">
    <div class="profile">
      <h2 class="profile-header-text">📝{{ name }}님의 TODO LIST</h2>
      <div class="profile-box">
        <div class="profile-img-box">
          <div class="profile-img"></div>
        </div>
        <div class="user-info">
          <p>이름 : {{ name }}</p>
          <p>이메일 : {{ email }}</p>
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
  padding: 20px;
  background-color: #c89b5a;
  border-radius: 20px;
  border: 3px dashed #8b5e3c;
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
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

.user-info {
  font-size: 30px;
  padding: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 5px solid #8b5e3c;
  text-align: center;
}

.pen {
  position: absolute;
  width: 70px;
  right: 30px;
}
</style>
