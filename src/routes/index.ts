import {
  createRouter,
  createWebHistory,
  RouterView,
  type RouteRecordRaw,
} from "vue-router";
import LoginPage from "@/views/auth/LoginPage.vue";
import PrimaryLayout from "@/layouts/PrimaryLayout.vue";
import DashboardPage from "@/views/dashboard/Dashboard.vue";
import { useAuthStore } from "@/stores";
import ListUser from "@/views/users/ListUser.vue";
import CreateUser from "@/views/users/CreateUser.vue";
import Activate from "@/views/auth/Activate.vue";
import BlankLayout from "@/layouts/BlankLayout.vue";
import ListRole from "@/views/role-permission/ListRole.vue";
import DetailUser from "@/views/users/DetailUser.vue";

export const routes: RouteRecordRaw[] = [
  {
    path: "/auth/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: '/auth/activate-account',
    name: 'activate-account',
    component: Activate,
    meta: {layout: BlankLayout, requiresAuth: false }
},
  {
    path: "/change-password",
    name: "change-password",
    component: LoginPage,
    meta: {
      layout: PrimaryLayout,
      breadcrumb: [{ name: "Change Password" }],
      requiresAuth: true,
    },
    children: [],
  },
  {
    path: "/",
    component: PrimaryLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: DashboardPage,
        meta: { requiresAuth: true },
      },
      {
        path: "settings",
        name: "settings",
        component: RouterView,
        meta: { requiresAuth: true },
        children: [
          {
            path: "backoffice-user",
            name: "backoffice-user",
            component: RouterView,
            meta: { requiresAuth: true },
            children: [
              {
                path: "",
                name: "list-backoffice-user",
                component: ListUser,
                meta: { requiresAuth: true },
              },
              {
                path: "create",
                name: "create-backoffice-user",
                component: CreateUser,
                meta: { requiresAuth: true },
              },
              {
                path: ":id/view",
                name: "view-backoffice-user",
                component: DetailUser,
                meta: { requiresAuth: true },
              },
              {
                path: ":id/edit",
                name: "edit-backoffice-user",
                component: DetailUser,
                meta: { requiresAuth: true },
              },
            ],
          },
          {
            path: "role-permission",
            name: "role-permission",
            component: RouterView,
            meta: { requiresAuth: true },
            children: [
              {
                path: "",
                name: "list-role-permission",
                component: ListRole,
                meta: { requiresAuth: true },
              },
              {
                path: "create",
                name: "create-role-permission",
                component: CreateUser,
                meta: { requiresAuth: true },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/dashboard",
  },
];

const publicPages = [
  "/auth/login",
  "/auth/reset-password",
  "/reset/finish",
  "/auth/activate-account",
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const authRequired = to.meta.requiresAuth;

  if (authRequired && !authStore.authData) {
    return next({
      path: "/auth/login",
      query: { redirect: to.fullPath },
    });
  }

  if (publicPages.includes(to.path) && authStore.authData) return next("/");

  if (!to.matched.some((record) => record.components)) {
    next("/404-not-found");
  }

  if (authRequired && !authStore.authData) return next("/auth/login");

  next();
});

export default router;
