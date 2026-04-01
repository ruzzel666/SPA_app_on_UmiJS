import React, { createContext, useContext, useMemo, useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_PRODUCTS = gql`
  query GetProductsForIndex($term: String) {
    products(where: { name: { contains: $term } }, take: 50, order: { price: DESC }) {
      items {
        id
        name
        price
        category { id name }
      }
    }
  }
`;

const ADD_PRODUCT = gql`
  mutation AddProduct($input: AddProductInput!) {
    addProduct(input: $input) { id name price }
  }
`;

const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($input: UpdateProductInput!) {
    updateProduct(input: $input) { id name price }
  }
`;

const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: Int!) {
    deleteProduct(id: $id)
  }
`;

export interface Category {
  id: number;
  name: string;
}

export interface Product {
  key: string;
  id: number;
  name: string;
  price: number;
  category: Category;
}

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: any;
  addProduct: (name: string, categoryName: string, price: number) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  editProduct: (id: number, name: string, categoryName: string, price: number) => Promise<void>;
  categories: string[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  refetch: () => void;
}

const DEFAULT_CATEGORIES = ['Электроника', 'Одежда', 'Продукты', 'Бытовая техника', 'Другое'];

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [searchTerm, setSearchTerm] = useState('');
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

  const { data, loading, error, refetch } = useQuery(GET_PRODUCTS, {
    variables: { term: searchTerm },
    notifyOnNetworkStatusChange: true,
    skip: !token,
  });

  const [addProductMutation] = useMutation(ADD_PRODUCT, { onCompleted: () => refetch() });
  const [updateProductMutation] = useMutation(UPDATE_PRODUCT, { onCompleted: () => refetch() });
  const [deleteProductMutation] = useMutation(DELETE_PRODUCT, { onCompleted: () => refetch() });

  const products = useMemo<Product[]>(() => {
    const items = data?.products?.items || [];
    return items.map((item: any) => ({
      key: String(item.id),
      id: item.id,
      name: item.name,
      price: item.price,
      category: { id: item.category?.id || 0, name: item.category?.name || 'Другое' },
    }));
  }, [data]);

  const addProduct = async (name: string, categoryName: string, price: number = 0) => {
    await addProductMutation({ variables: { input: { name, price, categoryName } } });
  };

  const deleteProduct = async (id: number) => {
    await deleteProductMutation({ variables: { id } });
  };

  const editProduct = async (id: number, name: string, categoryName: string, price: number) => {
    await updateProductMutation({ variables: { input: { id, name, price, categoryName } } });
  };

  const categories = useMemo(() => {
    const productCategories = products.map((p) => p.category.name);
    return Array.from(new Set([...DEFAULT_CATEGORIES, ...productCategories])).sort();
  }, [products]);

  return (
    <ProductContext.Provider
      value={{ products, loading, error, addProduct, deleteProduct, editProduct, categories, searchTerm, setSearchTerm, refetch }}
    >
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
