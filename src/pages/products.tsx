import { useState, useEffect } from 'react';
import { Typography, message } from 'antd';
import { useProducts } from '@/contexts/ProductContext';
import { ProductForm, ProductTable, ProductCount, ProductEditModal } from '@/components';
import type { Product } from '@/components/ProductTable';

const { Title } = Typography;

export default function Products() {
  const { products, addProduct, deleteProduct, editProduct, categories } = useProducts();
  const [editingKey, setEditingKey] = useState<string | null>(null);

  // useEffect для демонстрации количества элементов в списке
  useEffect(() => {
    console.log(`Количество товаров в списке: ${products.length}`);
  }, [products.length]);

  const handleAdd = (name: string, category: string) => {
    addProduct(name, category);
    message.success('Товар добавлен');
  };

  const handleDelete = (key: string) => {
    deleteProduct(key);
    message.success('Товар удалён');
  };

  const handleEdit = (key: string) => {
    setEditingKey(key);
  };

  const handleSaveEdit = (name: string, category: string) => {
    if (editingKey) {
      editProduct(editingKey, name, category);
      message.success('Товар обновлён');
      setEditingKey(null);
    }
  };

  const handleCloseModal = () => {
    setEditingKey(null);
  };

  const editingProduct = products.find((p) => p.key === editingKey);

  return (
    <div style={{ padding: '24px 0' }}>
      <Title level={2}>Список товаров</Title>

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
        product={editingProduct ? { name: editingProduct.name, category: editingProduct.category } : null}
        categories={categories}
      />
    </div>
  );
}
