import { defineConfig } from "@umijs/max";

export default defineConfig({
  title: 'SPA-app-on-UmiJS',
  routes: [
    { path: "/", component: "index", title: 'Главная страница'},
    { path: "/docs", component: "docs", title: 'О программе' },
    { path: "/feedback", component: "feedback", title: 'Обратная связь' },
    { path: "/products", component: "products", title: 'Список товаров' },
  ],
  npmClient: 'npm',
});
