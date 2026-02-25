import { Input, Select, Space } from 'antd';

const { Option } = Select;

interface ProductFormDataProps {
  name: string;
  category: string;
  categories: string[];
  onNameChange: (name: string) => void;
  onCategoryChange: (category: string) => void;
  showLabel?: boolean;
}

/**
 * Универсальный компонент формы товара (для добавления и редактирования)
 */
export default function ProductFormData({
  name,
  category,
  categories,
  onNameChange,
  onCategoryChange,
  showLabel = true,
}: ProductFormDataProps) {
  return (
    <Space direction="vertical" style={{ width: '100%', marginTop: showLabel ? '16px' : 0 }}>
      <div>
        {showLabel && (
          <label style={{ display: 'block', marginBottom: '8px' }}>Название:</label>
        )}
        <Input
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Введите название товара"
          autoFocus={!showLabel}
        />
      </div>
      <div>
        {showLabel && (
          <label style={{ display: 'block', marginBottom: '8px' }}>Категория:</label>
        )}
        <Select
          value={category}
          onChange={onCategoryChange}
          style={{ width: '100%' }}
          placeholder="Выберите категорию"
        >
          {categories.map((cat) => (
            <Option key={cat} value={cat}>
              {cat}
            </Option>
          ))}
        </Select>
      </div>
    </Space>
  );
}
