import { Route, Routes } from 'react-router-dom';
import { AdminPanelLayout } from './components/layouts/admin-panel-layout';
import { ThemeProvider } from './components/providers/theme-provider';
import { TooltipProvider } from './components/ui/tooltip';
import { Dashboard } from './components/views/dashboard';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <TooltipProvider disableHoverableContent>
        <Routes>
          <Route path="" element={<AdminPanelLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
