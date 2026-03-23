import { Table, Button, Tag, Space, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const { Text } = Typography;

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

interface ProductTableProps {
  products: Product[];
  onDelete: (key: string) => void;
  onEdit: (key: string) => void;
}

const categoryColors: Record<string, string> = {
  'Электроника': 'blue',
  'Одежда': 'purple',
  'Продукты': 'green',
  'Бытовая техника': 'orange',
  'Другое': 'default',
};

export default function ProductTable({ products, onDelete, onEdit }: ProductTableProps) {
  const columns: ColumnsType<Product> = [
    {
      title: '№',
      dataIndex: 'key',
      key: 'index',
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Название товара',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
      width: 100,
      render: (price: number) => (
        <Text strong>{Math.round(price)} ₽</Text>
      ),
    },
    {
      title: 'Категория',
      dataIndex: 'category',
      key: 'category',
      width: 150,
      render: (category: Category) => (
        <Tag color={categoryColors[category.name] || 'default'}>
          {category.name}
        </Tag>
      ),
    },
    {
      title: 'Действия',
      key: 'action',
      width: 180,
      render: (_, record) => (
        <Space size="small">
          <Button type="primary" size="small" onClick={() => onEdit(record.key)}>
            Изменить
          </Button>
          <Button danger size="small" onClick={() => onDelete(record.key)}>
            Удалить
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={products}
      pagination={{ pageSize: 10 }}
      locale={{ emptyText: 'Список товаров пуст' }}
      rowKey="key"
    />
  );
}
