import React, { createContext, useContext, type ReactNode } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

// ============================================================================
// GraphQL запросы и мутации (схема HotChocolate GraphQLShop API)
// ============================================================================

const GET_PRODUCTS = gql`
  query GetProductsForIndex($term: String) {
    products(
      where: { name: { contains: $term } },
      take: 50,
      order: { price: DESC }
    ) {
      items {
        id
        name
        price
        category {
          id
          name
        }
      }
    }
  }
`;

const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: Int!) {
    product(id: $id) {
      id
      name
      price
      category {
        id
        name
      }
    }
  }
`;

const ADD_PRODUCT = gql`
  mutation AddProduct($input: AddProductInput!) {
    addProduct(input: $input) {
      id
      name
      price
    }
  }
`;

const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($input: UpdateProductInput!) {
    updateProduct(input: $input) {
      id
      name
      price
    }
  }
`;

const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: Int!) {
    deleteProduct(id: $id)
  }
`;

// ============================================================================
// Типы данных
// ============================================================================

export interface Category {
  id: number;
  name: string;
}

export interface Product {
  key: string; // Для совместимости с Ant Design Table
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

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Категории по умолчанию (для отображения, если в API нет категорий)
const DEFAULT_CATEGORIES = ['Электроника', 'Одежда', 'Продукты', 'Бытовая техника', 'Другое'];

// ============================================================================
// Provider компонент
// ============================================================================

export function ProductProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = React.useState('');

  // Проверяем наличие токена перед выполнением запроса
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

  // Выполняем запрос к API с поиском ТОЛЬКО если есть токен
  const { data, loading, error, refetch } = useQuery(GET_PRODUCTS, {
    variables: { term: searchTerm },
    notifyOnNetworkStatusChange: true,
    skip: !token, // Пропускаем запрос если нет токена
  });

  // Инициализируем мутации
  const [addProductMutation] = useMutation(ADD_PRODUCT, {
    onCompleted: () => refetch(),
  });

  const [updateProductMutation] = useMutation(UPDATE_PRODUCT, {
    onCompleted: () => refetch(),
  });

  const [deleteProductMutation] = useMutation(DELETE_PRODUCT, {
    onCompleted: () => refetch(),
  });

  // Преобразуем данные из API в формат для приложения
  const products: Product[] = React.useMemo(() => {
    const items = data?.products?.items || [];
    return items.map((item: any) => ({
      key: String(item.id),
      id: item.id,
      name: item.name,
      price: item.price,
      category: {
        id: item.category?.id || 0,
        name: item.category?.name || 'Другое',
      },
    }));
  }, [data]);

  // Функции для работы с продуктами
  const addProduct = async (name: string, categoryName: string, price: number = 0) => {
    await addProductMutation({
      variables: {
        input: {
          name,
          price,
          categoryName,
        },
      },
    });
  };

  const deleteProduct = async (id: number) => {
    await deleteProductMutation({
      variables: { id },
    });
  };

  const editProduct = async (id: number, name: string, categoryName: string, price: number) => {
    await updateProductMutation({
      variables: {
        input: {
          id,
          name,
          price,
          categoryName,
        },
      },
    });
  };

  // Вычисляем категории на основе полученных данных
  const categories = React.useMemo(() => {
    const productCategories = products.map((p) => p.category.name);
    return Array.from(new Set([...DEFAULT_CATEGORIES, ...productCategories])).sort();
  }, [products]);

  return (
    <ProductContext.Provider value={{
      products,
      loading,
      error,
      addProduct,
      deleteProduct,
      editProduct,
      categories,
      searchTerm,
      setSearchTerm,
      refetch,
    }}>
      {children}
    </ProductContext.Provider>
  );
}

// ============================================================================
// Хук для использования контекста
// ============================================================================

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}