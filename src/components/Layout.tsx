import { NavLink, Outlet } from 'react-router-dom';
import { AppLogo } from './AppLogo';
import { useApp } from '../context/AppContext';

export function Layout() {
  const { logout } = useApp();

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="brand">
          <AppLogo size="sm" className="brand-icon" />
          <div>
            <h1>LuckyDragon</h1>
            <p>Personal Finance</p>
          </div>
        </div>

        <nav className="nav">
          <NavLink to="/graph" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            <span className="nav-icon">📈</span>
            Overview Graph
          </NavLink>
          <NavLink
            to="/transactions"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            <span className="nav-icon">💳</span>
            Income & Outcome
          </NavLink>
          <NavLink
            to="/planned"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            <span className="nav-icon">📅</span>
            Planned
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            <span className="nav-icon">🔒</span>
            Change Password
          </NavLink>
        </nav>

        <button type="button" className="btn btn-ghost logout-btn" onClick={logout}>
          Sign Out
        </button>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
