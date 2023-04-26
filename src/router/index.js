import { createRouter, createWebHistory } from "vue-router";

import Content from "@/views/template/Content.vue";
import MemoList from "@/views/MemoList.vue";
import ArchivedList from "@/views/ArchivedList.vue";
import Login from "@/views/Login.vue";
import ErrorDestination from "@/views/ErrorDestination.vue";
// import { isLoggedIn } from "@/modules/auth.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Content,
      meta: { requiresAuth: false },
      redirect: () => {
        return { name: "MemoList" };
      },
      children: [
        {
          path: "/memos",
          name: "MemoList",
          component: MemoList,
          meta: { requiresAuth: false },
        },
        {
          path: "/archives",
          name: "ArchivedList",
          component: ArchivedList,
          meta: { requiresAuth: false },
        },
      ],
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/error",
      name: "ErrorDestination",
      component: ErrorDestination,
    },
  ],
});

// ここの要否について
// エラーを発生させるタイミングの問題
// 1. APIアクセスが発生した時にエラーにするか
// 2. 画面アクセスした際にエラーにするか
// 前者は発生するタイミングが遅く、ユーザーに無駄作業が起こる可能性がある。
// 後者は、ユーザーがログインしているかどうかを毎回API Callする必要がある。トータルのレスポンスタイムが増える。
// 頻度で判断すれば良いが、今の画面では表示時にAPI Callしているので、前者の方が良いと思う。
// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     (async () => {
//       const result = await isLoggedIn();
//       if (!result) {
//         next({
//           path: "/login",
//           query: { redirect: to.fullPath },
//         });
//       } else {
//         next();
//       }
//     })().catch((error) => {
//       console.log(JSON.stringify(error));
//     });
//   } else {
//     next();
//   }
// });

export default router;
