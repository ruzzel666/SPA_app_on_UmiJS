import { Outlet } from '@umijs/max';
import AppProvider from '@/AppProvider';

// Layout для страницы входа (без основного layout с меню)
export default function LoginLayout() {
  return (
    <AppProvider>
      <Outlet />
    </AppProvider>
  );
}
