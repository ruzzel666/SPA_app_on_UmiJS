import { Column } from '@ant-design/charts';
import { Card, Typography } from 'antd';
import type { Product } from './ProductTable';

const { Title } = Typography;

interface ChartData {
  category: string;
  count: number;
  total: number;
}

export default function ProductChart({ products }: { products: Product[] }) {
  const chartData: ChartData[] = Object.values(
    products.reduce((acc, product) => {
      const categoryName = product.category.name || 'Другое';
      if (!acc[categoryName]) {
        acc[categoryName] = { category: categoryName, count: 0, total: 0 };
      }
      acc[categoryName].count += 1;
      acc[categoryName].total += product.price;
      return acc;
    }, {} as Record<string, ChartData>)
  ).sort((a, b) => b.count - a.count);

  const config = {
    data: chartData,
    xField: 'category',
    yField: 'count',
    label: {
      position: 'top' as const,
      style: { fill: '#FFFFFF', fontSize: 12 },
    },
    colorField: 'category',
    legend: false,
    tooltip: {
      title: 'category',
      items: [
        { field: 'count', name: 'Количество товаров' },
        { field: 'total', name: 'Общая стоимость', formatter: (v: number) => `${v} ₽` },
      ],
    },
    animation: { enter: { type: 'scaleIn', duration: 500 } },
  };

  return (
    <Card style={{ marginTop: 24, maxWidth: 900 }}>
      <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
        Распределение товаров по категориям
      </Title>
      {chartData.length > 0 ? (
        <Column {...config} />
      ) : (
        <div style={{ padding: '60px 0', textAlign: 'center', color: '#999' }}>
          <p>Нет данных для отображения графика</p>
          <p>Добавьте товары для визуализации</p>
        </div>
      )}
    </Card>
  );
}
