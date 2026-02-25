import { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import type { FormProps } from 'antd';
import BaseModal from './BaseModal';

const { Title, Text } = Typography;

type FieldType = {
  name?: string;
  email?: string;
  message?: string;
};

interface FeedbackFormProps {
  onSubmit?: (data: FieldType) => void;
}

/**
 * Форма обратной связи с модальным оклом предпросмотра
 */
export default function FeedbackForm({ onSubmit }: FeedbackFormProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState<FieldType>({});
  const [form] = Form.useForm();

  const handleFinish: FormProps<FieldType>['onFinish'] = (values) => {
    setFormData(values);
    setIsModalVisible(true);
    message.success('Форма успешно отправлена!');
    onSubmit?.(values);
  };

  const handleFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Пожалуйста, заполните все обязательные поля!');
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <>
      <Form
        form={form}
        name="feedback"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        style={{ maxWidth: 600, margin: '0 auto' }}
        initialValues={{ remember: true }}
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Имя"
          name="name"
          rules={[{ required: true, message: 'Пожалуйста, введите ваше имя!' }]}
        >
          <Input placeholder="Введите ваше имя" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Пожалуйста, введите ваш email!' },
            { type: 'email', message: 'Пожалуйста, введите корректный email!' }
          ]}
        >
          <Input placeholder="Введите ваш email" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Сообщение"
          name="message"
          rules={[{ required: true, message: 'Пожалуйста, введите ваше сообщение!' }]}
        >
          <Input.TextArea rows={4} placeholder="Введите ваше сообщение" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Button type="primary" htmlType="submit" size="large">
            Отправить
          </Button>
        </Form.Item>
      </Form>

      <BaseModal
        title="Введенные данные"
        open={isModalVisible}
        onClose={handleCloseModal}
        okText="Закрыть"
        cancelText="Отмена"
      >
        <div style={{ padding: '20px' }}>
          <p><Text strong>Имя:</Text> {formData.name}</p>
          <p><Text strong>Email:</Text> {formData.email}</p>
          <p><Text strong>Сообщение:</Text> {formData.message}</p>
        </div>
      </BaseModal>
    </>
  );
}
