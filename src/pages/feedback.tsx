import { Card, Typography } from 'antd';
import { FeedbackForm } from '@/components';

const { Title } = Typography;

export default function FeedbackPage() {
  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <Card>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>
          Обратная связь
        </Title>
        <FeedbackForm />
      </Card>
    </div>
  );
}
