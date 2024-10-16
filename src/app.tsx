import { Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './components/providers/theme-provider';
import { TooltipProvider } from './components/ui/tooltip';
import { AuthLayout } from './components/layouts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Dashboard from '@/views/dashboard';
import { LoginForm } from '@/views/auth';
import NotFound from '@/views/not-found.tsx';
import { Toaster } from 'sonner';
import RoleNavigate from '@/components/protect-route/role-navigate.tsx';
import LandingPage from '@/views/landing-page';
import AuthProtect from '@/components/protect-route/auth-protect.tsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AlertDialogProvider } from '@/components/providers/alert-dialog-provider.tsx';
import UserPage from '@/views/manager-system/user';
import CardTypePage from '@/views/manager-card/card-type';
import UserForm from '@/views/manager-system/user/form/user-form-page.tsx';
import { UserTable } from '@/views/manager-system/user/table/user-table.tsx';
import RolePage from './views/manager-system/role';
import HistoryPage from './views/manager-history';
import SettingsPage from './views/settings';
import { ManagerProfile } from './views/settings/manager-profile';
import { ManagerPassword } from './views/settings/manager-password';
import { ManagerPersonalisation } from './views/settings/manager-personalisation';
import BillPage from './views/manager-bill';
import CardPage from './views/manager-card/card';
import { Payment } from '@/views/payment';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <TooltipProvider disableHoverableContent>
          <AlertDialogProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route element={<AuthProtect />}>
                <Route path=":role" element={<RoleNavigate />}>
                  <Route index element={<Navigate to="dashboard" />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="user" element={<UserPage />}>
                    <Route index element={<UserTable />} />
                    <Route path="form" element={<UserForm />} />
                  </Route>
                  <Route path="roles" element={<RolePage />} />
                  <Route path="card-type" element={<CardTypePage />} />
                  <Route path="cards" element={<CardPage />} />
                  <Route path="history" element={<HistoryPage />} />
                  <Route path="payment/bills" element={<BillPage />} />
                  <Route path="payment/pay" element={<Payment />} />
                  <Route path="settings" element={<SettingsPage />}>
                    <Route index element={<Navigate to={'profile'} />} />
                    <Route path="profile" element={<ManagerProfile />} />
                    <Route path="password" element={<ManagerPassword />} />
                    <Route path="personalisation" element={<ManagerPersonalisation />} />
                  </Route>
                </Route>
                <Route path="auth" element={<AuthLayout />}>
                  <Route index element={<Navigate to="login" />} />
                  <Route path="login" element={<LoginForm />} />
                </Route>
              </Route>
              <Route path="not-found" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster closeButton richColors toastOptions={{
              classNames: {
                error: 'bg-red-400',
                success: 'bg-green-400',
                warning: 'bg-yellow-400',
                info: 'bg-blue-400',
              },
            }} />
            <ReactQueryDevtools initialIsOpen={false} />
          </AlertDialogProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
