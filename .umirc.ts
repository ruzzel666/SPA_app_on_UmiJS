import { defineConfig } from "@umijs/max";

export default defineConfig({
  hash: true,
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
  // Проксирование запросов в режиме разработки (npm run dev), чтобы избежать CORS
  proxy: {
    '/graphql': {
      target: 'https://localhost:7273',
      changeOrigin: true,
      secure: false, // отключает проверку SSL-сертификата для self-signed
      pathRewrite: { '^/graphql': '/graphql/' }, // если сервер ожидает /graphql/
    },
  },
  // Исправление конфликта esbuild helpers
  esbuildMinifyIIFE: true,
});
