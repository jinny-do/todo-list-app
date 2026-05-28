<script setup lang="js">
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
</script>

<template>
  <div class="app">
    <div class="container">
      <!-- 버튼 숨김용 prop 전달 -->
      <Header :hideButtons="true" />

      <main class="content">
        <router-view />
      </main>

      <Footer />
    </div>
  </div>
</template>

<style scoped>
.app {
  width: 100%;
  min-height: 100vh;

  background: #000;

  display: flex;
  justify-content: center;

  padding: 50px;

  box-sizing: border-box;
}

.container {
  width: 100%;
  max-width: 900px;

  background: #fff8e7;

  border-radius: 16px;

  overflow: hidden;

  display: flex;
  flex-direction: column;
}

.content {
  padding: 0px;

  flex: 1;
}
</style>
