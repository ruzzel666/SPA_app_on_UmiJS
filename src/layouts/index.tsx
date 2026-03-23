import { Link, Outlet, useLocation } from '@umijs/max';
import { Breadcrumb, Layout, Menu, Button, Dropdown, Avatar, Space } from 'antd';
import { ROUTES } from '@/constants/routes';
import AppProvider from '@/AppProvider';
import { ProductProvider } from '@/contexts/ProductContext';
import type { MenuProps } from 'antd';
import { useState, useEffect } from 'react';

const { Header, Content, Footer } = Layout;

const menuItems = [
  {
    key: ROUTES.HOME,
    label: <Link to={ROUTES.HOME}>Home</Link>
  },
  {
    key: ROUTES.DOCS,
    label: <Link to={ROUTES.DOCS}>О программе</Link>
  },
  {
    key: ROUTES.PRODUCTS,
    label: <Link to={ROUTES.PRODUCTS}>Список товаров</Link>
  },
  {
    key: ROUTES.FEEDBACK,
    label: <Link to={ROUTES.FEEDBACK}>Обратная связь</Link>
  },
]

// Проверка авторизации
function checkAuth() {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('auth_token');
}

// Получение пользователя
function getCurrentUser() {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem('auth_user');
  return userStr ? JSON.parse(userStr) : null;
}

function UserMenu({ onLogout }: { onLogout: () => void }) {
  const [user, setUser] = useState(() => getCurrentUser());

  const dropdownItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: (
        <Space>
          <Avatar size="small" style={{ backgroundColor: '#1890ff' }}>
            {user?.username?.[0]?.toUpperCase() || 'U'}
          </Avatar>
          <span>{user?.username || 'Пользователь'}</span>
        </Space>
      ),
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: 'Выйти',
      onClick: onLogout,
      danger: true,
    },
  ];

  return (
    <Dropdown menu={{ items: dropdownItems }} placement="bottomRight" arrow>
      <Button type="text" style={{ padding: '8px 12px' }}>
        <Space>
          <Avatar size="small" style={{ backgroundColor: '#1890ff' }}>
            {user?.username?.[0]?.toUpperCase() || 'U'}
          </Avatar>
          <span style={{ color: '#333' }}>{user?.username || 'Гость'}</span>
        </Space>
      </Button>
    </Dropdown>
  );
}

export default function AppLayout() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(checkAuth);

  // Обновляем состояние при изменении авторизации
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(checkAuth());
    };

    window.addEventListener('storage', handleStorageChange);
    // Проверяем при монтировании
    setIsAuthenticated(checkAuth());

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    // Очищаем localStorage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    // Обновляем состояние
    setIsAuthenticated(false);
    // Перенаправляем на страницу входа
    window.location.href = '/login';
  };

  return (
    <AppProvider>
      <Layout style={{ minHeight: '100vh', margin: 0, padding: 0 }}>
        <Header style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0',
          width: '100%',
          margin: 0,
          background: '#001529',
          height: 64,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
        }}>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={menuItems}
            style={{ flex: 1, minWidth: 0, background: 'transparent', border: 'none' }}
          />
          <div style={{ padding: '0 24px' }}>
            {isAuthenticated ? (
              <UserMenu onLogout={handleLogout} />
            ) : (
              <Button type="primary" onClick={() => window.location.href = '/login'}>
                Войти
              </Button>
            )}
          </div>
        </Header>
        <Content style={{ padding: 0, margin: 0, width: '100%' }}>
          <Breadcrumb style={{ margin: 0, padding: '16px 48px 0' }} />
          <div style={{ padding: '24px 48px' }}>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          SPA-приложение на UmiJS ©{new Date().getFullYear()} | Разработчик: Зайцев Георгий | УрФУ, ИНМТ, направление 09.04.02
        </Footer>
      </Layout>
    </AppProvider>
  );
}
