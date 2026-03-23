import { useState, useEffect } from 'react';
import { Button } from 'antd';
import { BaseModal, ProductFormData } from '@/components';

interface ProductEditModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (name: string, category: string, price: number) => void;
  product: { name: string; category: string; price?: number } | null;
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
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setCategory(product.category);
      setPrice(product.price || 0);
    }
  }, [product]);

  const handleSave = () => {
    if (!name.trim()) {
      return;
    }
    onSave(name.trim(), category, price);
  };

  const handleClose = () => {
    if (product) {
      setName(product.name);
      setCategory(product.category);
      setPrice(product.price || 0);
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
        price={price}
        categories={categories}
        onNameChange={setName}
        onCategoryChange={setCategory}
        onPriceChange={setPrice}
        showPrice={true}
      />
    </BaseModal>
  );
}
