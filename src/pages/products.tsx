import { useState, useEffect } from 'react';
import { Typography, message, Spin, Alert, Input } from 'antd';
import { useNavigate } from '@umijs/max';
import { useProducts } from '@/contexts/ProductContext';
import { ProductForm, ProductTable, ProductCount, ProductEditModal, ProductChart } from '@/components';
import { ProductProvider } from '@/contexts/ProductContext';
import type { Product } from '@/components/ProductTable';

const { Title } = Typography;

const checkAuth = () => typeof window !== 'undefined' && !!localStorage.getItem('auth_token');

function ProductsContent() {
  const navigate = useNavigate();
  const { products, loading, error, addProduct, deleteProduct, editProduct, categories, searchTerm, setSearchTerm } = useProducts();
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    if (!checkAuth()) {
      message.warning('Требуется авторизация для просмотра товаров');
      navigate('/login');
    } else {
      setIsCheckingAuth(false);
    }
  }, [navigate]);

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
      await addProduct(name, category, price > 0 ? price : 1);
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

  const handleSaveEdit = async (name: string, category: string, price: number) => {
    if (!editingKey) return;
    try {
      const product = products.find((p) => p.key === editingKey);
      if (product) {
        await editProduct(product.id, name, category, price > 0 ? price : product.price);
        message.success('Товар обновлён');
        setEditingKey(null);
      }
    } catch (e: any) {
      message.error(e.message || 'Ошибка при обновлении товара');
    }
  };

  const editingProduct = products.find((p) => p.key === editingKey);

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

      <Input.Search
        placeholder="Поиск по названию товара"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onSearch={setSearchTerm}
        style={{ maxWidth: 400, marginBottom: 24 }}
        allowClear
      />

      {loading && <Spin tip="Загрузка товаров..." style={{ display: 'block', marginBottom: 16 }} />}

      {error && !error?.graphQLErrors?.some((e: any) => e.extensions?.code === 'AUTH_NOT_AUTHENTICATED') && (
        <Alert message="Ошибка" description={error.message} type="error" showIcon style={{ marginBottom: 16 }} />
      )}

      <div style={{ marginBottom: 24 }}>
        <ProductForm onAdd={handleAdd} categories={categories} />
      </div>

      <div style={{ marginBottom: 24 }}>
        <ProductCount count={products.length} />
      </div>

      <div style={{ marginBottom: 24 }}>
        <ProductTable products={products} onDelete={handleDelete} onEdit={setEditingKey} />
      </div>

      <ProductChart products={products} />

      <ProductEditModal
        open={!!editingKey}
        onClose={() => setEditingKey(null)}
        onSave={handleSaveEdit}
        product={editingProduct ? { name: editingProduct.name, category: editingProduct.category.name, price: editingProduct.price } : null}
        categories={categories}
      />
    </div>
  );
}

export default function Products() {
  return (
    <ProductProvider>
      <ProductsContent />
    </ProductProvider>
  );
}
