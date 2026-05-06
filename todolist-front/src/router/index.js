import { createRouter, createWebHashHistory } from "vue-router";
import IntroPage from "../views/IntroPage.vue";
import SignupPage from "../views/SignupPage.vue";
import TodoPage from "../views/TodoPage.vue";
import ProfilePage from "../views/ProfilePage.vue";

const routes = [
  {
    path: "/",
    redirect: "/intro",
  },
  {
    path: "/intro",
    component: IntroPage,
  },
  {
    path: "/signup",
    component: SignupPage,
  },
  {
    path: "/todo",
    component: TodoPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    component: ProfilePage,
    //meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  // 로그인 필요한 페이지인데 토큰 없음
  if (to.meta.requiresAuth && !token) {
    return next("/intro");
  }

  // 로그인 했는데 intro/signup 가려는 경우 막기
  if ((to.path === "/intro" || to.path === "/signup") && token) {
    return next("/todo");
  }

  next();
});

export default router;
