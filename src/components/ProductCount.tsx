import { Typography } from 'antd';

interface ProductCountProps {
  count: number;
}

const { Text } = Typography;

export default function ProductCount({ count }: ProductCountProps) {
  return (
    <Text>
      Всего товаров: <strong>{count}</strong>
    </Text>
  );
}
