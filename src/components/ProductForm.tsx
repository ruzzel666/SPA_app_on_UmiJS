import { useState } from 'react';
import { Input, Button, Space, Select, message } from 'antd';

const { Option } = Select;

interface ProductFormProps {
  onAdd: (name: string, category: string) => void;
  categories: string[];
}

export default function ProductForm({ onAdd, categories }: ProductFormProps) {
  const [productName, setProductName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Другое');
  const [newCategory, setNewCategory] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  const handleSubmit = () => {
    if (!productName.trim()) {
      message.warning('Введите название товара');
      return;
    }

    const category = isAddingCategory 
      ? (newCategory.trim() || selectedCategory)
      : selectedCategory;

    if (!category) {
      message.warning('Выберите или введите категорию');
      return;
    }

    onAdd(productName.trim(), category);
    setProductName('');
    setNewCategory('');
    setIsAddingCategory(false);
  };

  return (
    <Space direction="vertical" style={{ width: '100%', maxWidth: 500 }}>
      <Space.Compact style={{ width: '100%' }}>
        <Input
          placeholder="Название товара"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          onPressEnter={handleSubmit}
        />
        <Button type="primary" onClick={handleSubmit}>
          Добавить
        </Button>
      </Space.Compact>

      <Space.Compact style={{ width: '100%' }}>
        {!isAddingCategory ? (
          <>
            <Select
              value={selectedCategory}
              onChange={setSelectedCategory}
              style={{ flex: 1 }}
              placeholder="Выберите категорию"
            >
              {categories.map((cat) => (
                <Option key={cat} value={cat}>{cat}</Option>
              ))}
            </Select>
            <Button onClick={() => setIsAddingCategory(true)}>
              + Категория
            </Button>
          </>
        ) : (
          <>
            <Input
              placeholder="Название новой категории"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              onPressEnter={handleSubmit}
            />
            <Button onClick={() => setIsAddingCategory(false)}>
              Отмена
            </Button>
          </>
        )}
      </Space.Compact>
    </Space>
  );
}
