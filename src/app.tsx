import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminPanelLayout } from './components/layouts/admin-panel-layout';
import { ThemeProvider } from './components/providers/theme-provider';
import { TooltipProvider } from './components/ui/tooltip';
import { Dashboard } from './components/views/dashboard';
import { AuthLayout } from './components/layouts';
import { LoginForm } from './components/views/auth';
function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <TooltipProvider disableHoverableContent>
        <Routes>
          <Route path="admin" element={<AdminPanelLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
          <Route path="auth" element={<AuthLayout />}>
            <Route index element={<Navigate to="/auth/login" />} />
            <Route path="login" element={<LoginForm />} />
          </Route>
        </Routes>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
