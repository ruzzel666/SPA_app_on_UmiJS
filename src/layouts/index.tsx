import { Link, Outlet, useLocation } from '@umijs/max';
import { Breadcrumb, Layout, Menu } from 'antd';
import { ProductProvider } from '@/contexts/ProductContext';
import { ROUTES } from '@/constants/routes';

const { Header, Content, Footer } = Layout;

const items = [
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

export default function() {
  const location = useLocation();

  return (
    <ProductProvider>
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
    </ProductProvider>
  );
}
