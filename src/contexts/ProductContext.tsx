import { createContext, useContext, type ReactNode } from 'react';
import { useProductsStorage } from '@/hooks/useProductsStorage';

export interface Product {
  key: string;
  name: string;
  category: string;
}

interface ProductContextType {
  products: Product[];
  addProduct: (name: string, category: string) => void;
  deleteProduct: (key: string) => void;
  editProduct: (key: string, name: string, category: string) => void;
  categories: string[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const DEFAULT_CATEGORIES = ['Электроника', 'Одежда', 'Продукты', 'Бытовая техника', 'Другое'];

interface ProductProviderProps {
  children: ReactNode;
}

export function ProductProvider({ children }: ProductProviderProps) {
  const { products, setProducts } = useProductsStorage();

  const addProduct = (name: string, category: string) => {
    const newProduct: Product = {
      key: Date.now().toString(),
      name,
      category,
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  const deleteProduct = (key: string) => {
    setProducts((prev) => prev.filter((p) => p.key !== key));
  };

  const editProduct = (key: string, name: string, category: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.key === key ? { ...p, name, category } : p))
    );
  };

  // Получение уникальных категорий из товаров + дефолтные
  const categories = Array.from(
    new Set([...DEFAULT_CATEGORIES, ...products.map((p) => p.category)])
  ).sort();

  return (
    <ProductContext.Provider value={{ products, addProduct, deleteProduct, editProduct, categories }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
