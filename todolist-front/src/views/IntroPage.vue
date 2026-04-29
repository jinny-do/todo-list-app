<script setup>
import LoginPage from "./LoginPage.vue";
</script>

<template>
  <div class="container">
    <div class="intro">
      <div class="main-logo-img"></div>
      <div class="intro-title">
        <div class="title">
          <h1>TODO LIST</h1>
        </div>
        <div class="sub-title">
          <h3>오늘의 하루를 기록하세요.</h3>
        </div>
      </div>
    </div>

    <div class="logtin-form">
      <LoginPage />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  padding: 20px;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

.intro-title {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.title {
  font-size: 30px;
  color: var(--text-color);
}

.sub-title {
  font-size: 30px;
}
</style>
