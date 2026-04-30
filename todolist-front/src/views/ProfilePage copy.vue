<script setup></script>

<template>
  <div class="container">
    <div class="profileImage">
      <img src="/img/logo.png" alt="Profile Image" />
    </div>
    <p>아이디 : todo</p>
    <p>이메일 : todo@aaa.com</p>
    <p>이름 : 투두</p>
    <p>생일 : 2000-01-01</p>
  </div>
</template>

<style scoped>
.container {
  width: 600px;
  height: 300px;
  background-color: #c89b5a;
  padding: 40px;
  border: 5px solid #8b5e3c;
  position: relative;
  box-shadow:
    rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
}

.profileImage {
  width: 250px;
  height: 335px;
  background-color: #ffffff;
  position: absolute;
  top: 20px;
  left: 20px;
  border: 5px solid #8b5e3c;
}

.profileImage img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
