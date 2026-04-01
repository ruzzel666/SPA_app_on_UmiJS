import { Typography, Form, Input, Button, Card, message } from 'antd';
import { useNavigate, Link } from '@umijs/max';
import { gql, useMutation } from '@apollo/client';

const { Title } = Typography;

const REGISTER = gql`
  mutation Register($username: String!, $password: String!) {
    register(input: { username: $username, password: $password }) {
      token
      username
    }
  }
`;

export default function RegisterPage() {
  const navigate = useNavigate();
  const [registerMutation, { loading }] = useMutation(REGISTER, {
    onError: (error) => message.error(error.message || 'Ошибка регистрации'),
    onCompleted: (data) => {
      if (data?.register?.token) {
        localStorage.setItem('auth_token', data.register.token);
        localStorage.setItem('auth_user', JSON.stringify({ username: data.register.username, role: 'User' }));
        message.success('Регистрация выполнена успешно');
        navigate('/products', { replace: true });
      }
    },
  });

  const handleSubmit = async (values: { username: string; password: string }) => {
    await registerMutation({ variables: { username: values.username, password: values.password } });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f0f2f5' }}>
      <Card style={{ width: 400, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={2} style={{ marginBottom: 8 }}>Регистрация</Title>
          <p style={{ color: '#666' }}>GraphQL Shop API</p>
        </div>

        <Form name="register" onFinish={handleSubmit} layout="vertical" size="large" autoComplete="off">
          <Form.Item
            name="username"
            label="Имя пользователя"
            rules={[{ required: true, message: 'Введите имя пользователя' }, { min: 3, message: 'Минимум 3 символа' }]}
          >
            <Input placeholder="Придумайте логин" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Пароль"
            rules={[{ required: true, message: 'Введите пароль' }, { min: 6, message: 'Минимум 6 символов' }]}
          >
            <Input.Password placeholder="••••••" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Подтвердите пароль"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Подтвердите пароль' },
              ({ getFieldValue }) => ({
                validator: (_, value) => !value || getFieldValue('password') === value
                  ? Promise.resolve()
                  : Promise.reject(new Error('Пароли не совпадают')),
              }),
            ]}
          >
            <Input.Password placeholder="••••••" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button type="primary" htmlType="submit" loading={loading} block size="large">
              Зарегистрироваться
            </Button>
          </Form.Item>
        </Form>

        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <p style={{ color: '#999', marginBottom: 8 }}>Уже есть аккаунт?</p>
          <Link to="/login" style={{ color: '#1890ff' }}>Войти</Link>
        </div>
      </Card>
    </div>
  );
}
