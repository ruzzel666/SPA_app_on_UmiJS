import { Input, Select, Space } from 'antd';

const { Option } = Select;

interface ProductFormDataProps {
  name: string;
  category: string;
  price?: number;
  categories: string[];
  onNameChange: (name: string) => void;
  onCategoryChange: (category: string) => void;
  onPriceChange?: (price: number) => void;
  showLabel?: boolean;
  showPrice?: boolean;
}

export default function ProductFormData({
  name,
  category,
  price = 0,
  categories,
  onNameChange,
  onCategoryChange,
  onPriceChange,
  showLabel = true,
  showPrice = false,
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

      {showPrice && onPriceChange && (
        <div>
          {showLabel && (
            <label style={{ display: 'block', marginBottom: '8px' }}>Цена (₽):</label>
          )}
          <Input
            type="number"
            value={price}
            onChange={(e) => onPriceChange(Number(e.target.value))}
            placeholder="Введите цену товара"
            min={0}
            step={0.01}
          />
        </div>
      )}

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
