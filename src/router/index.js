import { createRouter, createWebHistory } from "vue-router";

import Content from "@/views/template/Content.vue";
import MemoList from "@/views/MemoList.vue";
import ArchivedList from "@/views/ArchivedList.vue";
import Login from "@/views/Login.vue";
import auth from "@/modules/auth.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Content,
      meta: { requiresAuth: true },
      redirect: () => {
        return { name: "MemoList" };
      },
      children: [
        {
          path: "/memos",
          name: "MemoList",
          component: MemoList,
          meta: { requiresAuth: true },
        },
        {
          path: "/archives",
          name: "ArchivedList",
          component: ArchivedList,
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const NODE_ENV = process.env.NODE_ENV;
  if (
    NODE_ENV === "local" &&
    to.matched.some((record) => record.meta.requiresAuth)
  ) {
    (async () => {
      const result = await auth.isloggedIn();
      if (!result) {
        next({
          path: "/login",
          query: { redirect: to.fullPath },
        });
      } else {
        next();
      }
    })().catch((error) => {
      console.log(JSON.stringify(error));
    });
  } else {
    next();
  }
});

export default router;
