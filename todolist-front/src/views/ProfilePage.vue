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
}

.profile-header-text {
  color: var(--text-color);
}

.profile-box {
  padding: 40px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 30px;
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
}
</style>
