import { Link, Outlet, useLocation } from '@umijs/max';
import { Breadcrumb, Layout, Menu, } from 'antd';

const { Header, Content, Footer } = Layout;

const items = [
  {
    key: '/',
    label: <Link to="/">Home</Link>
  },
  {
    key: '/docs',
    label: <Link to="/docs">О программе</Link>
  },
  {
    key: '/feedback',
    label: <Link to="/feedback">Обратная связь</Link>
  },
]

export default function() {
  const location = useLocation();

  return (
    <Layout style={{ minHeight: '100vh', margin: 0, padding: 0 }}>
      <Header style={{ display: 'flex', alignItems: 'center', padding: 0, width: '100%', margin: 0, background: 'white', height: 64 }}>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: 0, margin: 0, width: '100%' }}>
        <Breadcrumb
          style={{ margin: 0, padding: 0 }}
        />
        <div style={{ padding: '0 48px' }}>
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        SPA-приложение на UmiJS ©{new Date().getFullYear()} | Разработчик: Зайцев Георгий | УрФУ, ИНМТ, направление 09.04.02
      </Footer>
    </Layout>
  );
}
