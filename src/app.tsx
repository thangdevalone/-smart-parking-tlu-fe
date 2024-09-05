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
import CardType from '@/views/manager-card/card-type';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <TooltipProvider disableHoverableContent>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route element={<AuthProtect />}>
              <Route path=":role" element={<RoleNavigate />}>
                <Route index element={<Navigate to="dashboard" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="card-type" element={<CardType />} />
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
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
