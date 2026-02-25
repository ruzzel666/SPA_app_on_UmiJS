import { Table, Button, Tag, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';

export interface Product {
  key: string;
  name: string;
  category: string;
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
      title: 'Категория',
      dataIndex: 'category',
      key: 'category',
      width: 150,
      render: (category: string) => (
        <Tag color={categoryColors[category] || 'default'}>
          {category}
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
    />
  );
}
