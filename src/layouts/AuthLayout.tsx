import { Outlet } from '@umijs/max';
import AppProvider from '@/AppProvider';

export default function AuthLayout() {
  return (
    <AppProvider>
      <Outlet />
    </AppProvider>
  );
}
