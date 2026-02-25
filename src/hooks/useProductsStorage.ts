import { useState, useEffect } from 'react';
import type { Product } from '../contexts/ProductContext';

const STORAGE_KEY = 'products_list';

/**
 * Хук для работы с localStorage товаров
 */
export function useProductsStorage() {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Ошибка чтения из localStorage:', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      if (products.length === 0) {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
      }
    } catch (e) {
      console.error('Ошибка записи в localStorage:', e);
    }
  }, [products]);

  return { products, setProducts };
}
