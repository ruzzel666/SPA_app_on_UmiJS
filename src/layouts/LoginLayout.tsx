import { Outlet } from '@umijs/max';
import AppProvider from '@/AppProvider';

export default function LoginLayout() {
  return (
    <AppProvider>
      <Outlet />
    </AppProvider>
  );
}
