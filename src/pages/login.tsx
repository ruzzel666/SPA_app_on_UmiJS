import { useState } from 'react';
import { Typography, Form, Input, Button, Card, message, Alert } from 'antd';
import { useNavigate, Link } from '@umijs/max';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client';

const { Title } = Typography;

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      token
      username
    }
  }
`;

export default function LoginPage() {
  const navigate = useNavigate();
  const [loginMutation, { loading }] = useMutation(LOGIN, {
    onError: (error) => {
      message.error(error.message || 'Ошибка входа');
    },
    onCompleted: (data) => {
      if (data?.login?.token) {
        localStorage.setItem('auth_token', data.login.token);
        localStorage.setItem('auth_user', JSON.stringify({
          username: data.login.username,
          role: 'User',
        }));

        window.dispatchEvent(new Event('storage'));

        message.success('Вход выполнен успешно');

        setTimeout(() => {
          navigate('/products', { replace: true });
        }, 500);
      }
    },
  });

  const handleSubmit = async (values: { username: string; password: string }) => {
    try {
      await loginMutation({
        variables: {
          username: values.username,
          password: values.password,
        },
      });
    } catch (e) {
      // Ошибка обрабатывается в onError
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: '#f0f2f5'
    }}>
      <Card style={{ width: 400, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={2} style={{ marginBottom: 8 }}>Вход в систему</Title>
          <p style={{ color: '#666' }}>GraphQL Shop API</p>
        </div>

        <Form
          name="login"
          onFinish={handleSubmit}
          layout="vertical"
          size="large"
          autoComplete="off"
        >
          <Form.Item
            name="username"
            label="Имя пользователя"
            rules={[
              { required: true, message: 'Введите имя пользователя' },
              { min: 3, message: 'Минимум 3 символа' }
            ]}
            initialValue="admin"
          >
            <Input placeholder="admin" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Пароль"
            rules={[
              { required: true, message: 'Введите пароль' },
              { min: 6, message: 'Минимум 6 символов' }
            ]}
            initialValue="admin123"
          >
            <Input.Password placeholder="••••••" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
            >
              Войти
            </Button>
          </Form.Item>
        </Form>

        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <p style={{ color: '#999', marginBottom: 8 }}>Нет аккаунта?</p>
          <Link to="/register" style={{ color: '#1890ff' }}>
            Зарегистрироваться
          </Link>
        </div>
      </Card>
    </div>
  );
}
