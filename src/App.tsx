import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AppProvider, useApp } from './context/AppContext';
import { ChangePasswordPage } from './pages/ChangePasswordPage';
import { GraphPage } from './pages/GraphPage';
import { LoginPage } from './pages/LoginPage';
import { PlannedPage } from './pages/PlannedPage';
import { TransactionsPage } from './pages/TransactionsPage';

function ProtectedRoutes() {
  const { isAuthenticated } = useApp();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/graph" replace />} />
        <Route path="graph" element={<GraphPage />} />
        <Route path="transactions" element={<TransactionsPage />} />
        <Route path="planned" element={<PlannedPage />} />
        <Route path="settings" element={<ChangePasswordPage />} />
      </Route>
    </Routes>
  );
}

function AppRoutes() {
  const { isAuthenticated } = useApp();
  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/graph" replace /> : <LoginPage />}
      />
      <Route path="/*" element={<ProtectedRoutes />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}
