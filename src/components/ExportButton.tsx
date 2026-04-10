import { Button, message } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import type { Product } from './ProductTable';

interface ExportButtonProps {
  products: Product[];
}

export default function ExportButton({ products }: ExportButtonProps) {
  const handleExport = () => {
    if (products.length === 0) {
      message.warning('Нет данных для экспорта');
      return;
    }

    try {
      const excelData = products.map((product, index) => ({
        '№': index + 1,
        'Название товара': product.name,
        'Цена (₽)': Math.round(product.price),
        'Категория': product.category.name,
      }));

      const worksheet = XLSX.utils.json_to_sheet(excelData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Товары');

      worksheet['!cols'] = [
        { wch: 5 },
        { wch: 30 },
        { wch: 12 },
        { wch: 20 },
      ];

      const fileName = `товары_${new Date().toISOString().slice(0, 10)}.xlsx`;
      XLSX.writeFile(workbook, fileName);
      message.success(`Файл "${fileName}" успешно сохранён`);
    } catch (error) {
      console.error('Ошибка экспорта:', error);
      message.error('Ошибка при экспорте данных');
    }
  };

  return (
    <Button
      type="default"
      icon={<DownloadOutlined />}
      onClick={handleExport}
      disabled={products.length === 0}
      style={{ marginBottom: 24 }}
    >
      Экспорт в Excel
    </Button>
  );
}
