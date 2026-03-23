import { defineConfig } from "@umijs/max";

export default defineConfig({
  title: 'SPA-app-on-UmiJS',
  routes: [
    {
      path: "/",
      component: "index",
      title: 'Главная страница',
    },
    {
      path: "/login",
      component: "login",
      title: 'Вход',
      wrappers: ['@/layouts/AuthLayout'],
    },
    {
      path: "/register",
      component: "register",
      title: 'Регистрация',
      wrappers: ['@/layouts/AuthLayout'],
    },
    {
      path: "/products",
      component: "products",
      title: 'Список товаров',
    },
    {
      path: "/docs",
      component: "docs",
      title: 'О программе',
    },
    {
      path: "/feedback",
      component: "feedback",
      title: 'Обратная связь',
    },
  ],
  npmClient: 'npm',
});
