<script setup lang="js">
import { useRouter } from "vue-router";

const props = defineProps({
  hideButtons: {
    type: Boolean,
    default: false,
  },
});

const router = useRouter();

const handleLogout = () => {
  localStorage.clear();

  alert("로그아웃 되었습니다.");

  window.location.href = "/intro";
};

const goToProfile = () => {
  router.push("/profile");
};
</script>

<template>
  <header class="header">
    <h1>Cat-do</h1>

    <!-- hideButtons 가 true면 버튼 숨김 -->
    <div
      class="header-button"
      v-if="!hideButtons"
    >
      <button
        class="profile-btn"
        @click="goToProfile"
      >
        프로필
      </button>

      <button
        class="logout-btn"
        @click="handleLogout"
      >
        로그아웃
      </button>
    </div>
  </header>
</template>

<style scoped>
.header {
  padding: 20px;
  background: #c89b5a;
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-button {
  gap: 15px;
  display: flex;
}

.profile-btn {
  background: #fff8e7;
  color: black;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.logout-btn {
  background: #ffc0cb;
  color: black;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}
</style>
