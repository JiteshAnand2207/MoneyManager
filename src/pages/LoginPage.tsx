import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLogo } from '../components/AppLogo';
import { useApp } from '../context/AppContext';

export function LoginPage() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/graph');
    } else {
      setError('Incorrect password. Try again.');
      setPassword('');
    }
  };

  return (
    <div className="login-page">
      <div className="login-bg" />
      <div className="login-card">
        <AppLogo size="lg" className="login-logo" />
        <h1>Welcome Back</h1>
        <p className="login-subtitle">Enter your password to access LuckyDragon</p>

        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Password
            <div className="password-field">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Enter password"
                autoFocus
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '🙈' : '👁'}
              </button>
            </div>
          </label>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="btn btn-primary btn-full">
            Unlock
          </button>
        </form>

        <p className="login-hint">Initial password: <code>123</code></p>
      </div>
    </div>
  );
}
