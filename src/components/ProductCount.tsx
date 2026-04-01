import { Typography } from 'antd';

const { Text } = Typography;

interface ProductCountProps {
  count: number;
}

export default function ProductCount({ count }: ProductCountProps) {
  return (
    <Text>
      Всего товаров: <strong>{count}</strong>
    </Text>
  );
}
