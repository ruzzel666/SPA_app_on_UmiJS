import { useState } from 'react';
import { Form, Input, Button, Modal, Card, Typography, message } from 'antd';
import type { FormProps } from 'antd';

const { Title, Text } = Typography;

type FieldType = {
  name?: string;
  email?: string;
  message?: string;
};

const FeedbackPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    setFormData({
      name: values.name || '',
      email: values.email || '',
      message: values.message || ''
    });
    setIsModalVisible(true);
    message.success('Форма успешно отправлена!');
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Пожалуйста, заполните все обязательные поля!');
  };

  const handleOk = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <Card>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>
          Обратная связь
        </Title>

        <Form
          form={form}
          name="feedback"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          style={{ maxWidth: 600, margin: '0 auto' }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
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
      </Card>

      <Modal
        title="Введенные данные"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Закрыть"
        cancelText="Отмена"
      >
        <div style={{ padding: '20px' }}>
          <p><Text strong>Имя:</Text> {formData.name}</p>
          <p><Text strong>Email:</Text> {formData.email}</p>
          <p><Text strong>Сообщение:</Text> {formData.message}</p>
        </div>
      </Modal>
    </div>
  );
};

export default FeedbackPage;