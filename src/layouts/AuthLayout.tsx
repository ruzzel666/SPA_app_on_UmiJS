import { Outlet } from '@umijs/max';
import AppProvider from '@/AppProvider';

// Layout для страниц авторизации (login, register) - только ApolloProvider
export default function AuthLayout() {
  return (
    <AppProvider>
      <Outlet />
    </AppProvider>
  );
}
