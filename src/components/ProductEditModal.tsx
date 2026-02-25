import { useState, useEffect } from 'react';
import { Button } from 'antd';
import { BaseModal, ProductFormData } from '@/components';

interface ProductEditModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (name: string, category: string) => void;
  product: { name: string; category: string } | null;
  categories: string[];
}

export default function ProductEditModal({
  open,
  onClose,
  onSave,
  product,
  categories,
}: ProductEditModalProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name);
      setCategory(product.category);
    }
  }, [product]);

  const handleSave = () => {
    if (!name.trim()) {
      return;
    }
    onSave(name.trim(), category);
  };

  const handleClose = () => {
    if (product) {
      setName(product.name);
      setCategory(product.category);
    }
    onClose();
  };

  return (
    <BaseModal
      title="Редактирование товара"
      open={open}
      onClose={handleClose}
      onOk={handleSave}
      okText="Сохранить"
      cancelText="Отмена"
      width={500}
    >
      <ProductFormData
        name={name}
        category={category}
        categories={categories}
        onNameChange={setName}
        onCategoryChange={setCategory}
      />
    </BaseModal>
  );
}
