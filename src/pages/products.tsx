import { useState, useEffect } from 'react';
import { Typography, message, Spin, Alert, Input } from 'antd';
import { useNavigate } from '@umijs/max';
import { useProducts } from '@/contexts/ProductContext';
import { ProductForm, ProductTable, ProductCount, ProductEditModal } from '@/components';
import { ProductProvider } from '@/contexts/ProductContext';
import type { Product } from '@/components/ProductTable';

const { Title } = Typography;

function ProductsContent() {
  const navigate = useNavigate();
  const {
    products,
    loading,
    error,
    addProduct,
    deleteProduct,
    editProduct,
    categories,
    searchTerm,
    setSearchTerm,
  } = useProducts();

  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Проверка авторизации при загрузке
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      message.warning('Требуется авторизация для просмотра товаров');
      navigate('/login');
    } else {
      setIsCheckingAuth(false);
    }
  }, [navigate]);

  // Обработка ошибок авторизации от сервера
  useEffect(() => {
    if (error?.graphQLErrors?.some((e: any) => e.extensions?.code === 'AUTH_NOT_AUTHENTICATED')) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      message.error('Сессия истекла. Войдите снова');
      navigate('/login');
    }
  }, [error, navigate]);

  const handleAdd = async (name: string, category: string, price: number) => {
    try {
      const finalPrice = price > 0 ? price : 1;
      await addProduct(name, category, finalPrice);
      message.success('Товар добавлен');
    } catch (e: any) {
      message.error(e.message || 'Ошибка при добавлении товара');
    }
  };

  const handleDelete = async (key: string) => {
    try {
      const product = products.find((p) => p.key === key);
      if (product) {
        await deleteProduct(product.id);
        message.success('Товар удалён');
      }
    } catch (e: any) {
      message.error(e.message || 'Ошибка при удалении товара');
    }
  };

  const handleEdit = (key: string) => {
    setEditingKey(key);
  };

  const handleSaveEdit = async (name: string, category: string, price: number) => {
    if (editingKey) {
      try {
        const product = products.find((p) => p.key === editingKey);
        if (product) {
          const finalPrice = price > 0 ? price : product.price;
          await editProduct(product.id, name, category, finalPrice);
          message.success('Товар обновлён');
          setEditingKey(null);
        }
      } catch (e: any) {
        message.error(e.message || 'Ошибка при обновлении товара');
      }
    }
  };

  const handleCloseModal = () => {
    setEditingKey(null);
  };

  const editingProduct = products.find((p) => p.key === editingKey);

  // Обработка поиска
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Показываем спиннер во время проверки авторизации
  if (isCheckingAuth) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <Spin size="large" tip="Проверка авторизации..." />
      </div>
    );
  }

  return (
    <div style={{ padding: '24px 0' }}>
      <Title level={2}>Список товаров</Title>

      {/* Поиск товаров */}
      <div style={{ marginBottom: 16 }}>
        <Input.Search
          placeholder="Поиск по названию товара"
          value={searchTerm}
          onChange={handleSearchChange}
          onSearch={setSearchTerm}
          style={{ maxWidth: 400 }}
          allowClear
        />
      </div>

      {/* Индикатор загрузки */}
      {loading && (
        <div style={{ marginBottom: 16, textAlign: 'center' }}>
          <Spin tip="Загрузка товаров..." />
        </div>
      )}

      {/* Обработка ошибок (кроме ошибок авторизации) */}
      {error && !error?.graphQLErrors?.some((e: any) => e.extensions?.code === 'AUTH_NOT_AUTHENTICATED') && (
        <Alert
          message="Ошибка"
          description={error.message}
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}

      <div style={{ marginBottom: 24 }}>
        <ProductForm onAdd={handleAdd} categories={categories} />
      </div>

      <div style={{ marginBottom: 16 }}>
        <ProductCount count={products.length} />
      </div>

      <ProductTable
        products={products}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      <ProductEditModal
        open={!!editingKey}
        onClose={handleCloseModal}
        onSave={handleSaveEdit}
        product={editingProduct ? {
          name: editingProduct.name,
          category: editingProduct.category.name,
          price: editingProduct.price
        } : null}
        categories={categories}
      />
    </div>
  );
}

// Основной компонент с ProductProvider
export default function Products() {
  return (
    <ProductProvider>
      <ProductsContent />
    </ProductProvider>
  );
}
