<script setup></script>

<template>
  <div class="container">
    <div class="header">
      <RouterLink to="/profile" class="nav">프로필</RouterLink>
    </div>
    <div class="main">
      <h1>메인</h1>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.nav {
  text-decoration: none;
  color: var(--text-color);
  font-size: 30px;
  font-weight: 900;
}

.nav:hover {
  color: #deb887;
  transition: all 0.3s;
}
</style>
