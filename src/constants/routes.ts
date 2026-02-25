/**
 * Константы маршрутов приложения
 */
export const ROUTES = {
  HOME: '/',
  DOCS: '/docs',
  PRODUCTS: '/products',
  FEEDBACK: '/feedback',
} as const;

export type RouteKey = (typeof ROUTES)[keyof typeof ROUTES];
