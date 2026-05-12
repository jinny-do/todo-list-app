import { createRouter, createWebHashHistory } from "vue-router";

import IntroPage from "../views/IntroPage.vue";
import ProfilePage from "../views/ProfilePage.vue";
import SignupPage from "../views/SignupPage.vue";
import TodoPage from "../views/TodoPage.vue";

const routes = [
  {
    path: "/",
    redirect: "/intro",
  },

  // 로그인 화면
  {
    path: "/intro",
    component: IntroPage,

    meta: {
      layout: "empty",
    },
  },

  // 회원가입 화면
  {
    path: "/signup",
    component: SignupPage,

    meta: {
      layout: "empty",
    },
  },

  // 메인 앱 화면
  {
    path: "/todo",
    component: TodoPage,

    meta: {
      requiresAuth: true,
      layout: "default",
    },
  },

  // 프로필 화면
  {
    path: "/profile",
    component: ProfilePage,

    meta: {
      layout: "default",
    },
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

  // 로그인 했는데 intro/signup 접근 시 막기
  if ((to.path === "/intro" || to.path === "/signup") && token) {
    return next("/todo");
  }

  next();
});

export default router;

// router.beforeEach(async (to, from, next) => {
//   const token = localStorage.getItem("token");

//   // 로그인 필요한 페이지
//   if (to.meta.requiresAuth) {
//     if (!token) {
//       return next("/intro");
//     }

//     try {
//       await axios.get("http://localhost:3000/api/user/me", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       next();
//     } catch (err) {
//       localStorage.removeItem("token");
//       next("/intro");
//     }

//     return;
//   }

//   // 로그인 상태면 intro/signup 접근 막기
//   if ((to.path === "/intro" || to.path === "/signup") && token) {
//     try {
//       await axios.get("http://localhost:3000/api/user/me", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       return next("/todo");
//     } catch (err) {
//       localStorage.removeItem("token");
//     }
//   }

//   next();
// });
