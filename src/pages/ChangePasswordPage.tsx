import { useState } from 'react';
import { useApp } from '../context/AppContext';

export function ChangePasswordPage() {
  const { changePassword } = useApp();
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (next !== confirm) {
      setMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }
    const result = changePassword(current, next);
    if (result.ok) {
      setMessage({ type: 'success', text: 'Password updated successfully.' });
      setCurrent('');
      setNext('');
      setConfirm('');
    } else {
      setMessage({ type: 'error', text: result.error ?? 'Failed to update password.' });
    }
  };

  return (
    <div className="page settings-page">
      <header className="page-header">
        <div>
          <h2>Change Password</h2>
          <p>Update your login credentials to keep your data secure</p>
        </div>
      </header>

      <div className="settings-card">
        <div className="settings-icon">🔐</div>
        <form onSubmit={handleSubmit} className="settings-form">
          <label>
            Current Password
            <input
              type="password"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              required
            />
          </label>
          <label>
            New Password
            <input
              type="password"
              value={next}
              onChange={(e) => setNext(e.target.value)}
              required
              minLength={3}
            />
          </label>
          <label>
            Confirm New Password
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              minLength={3}
            />
          </label>

          {message && (
            <p className={message.type === 'success' ? 'form-success' : 'form-error'}>
              {message.text}
            </p>
          )}

          <button type="submit" className="btn btn-primary">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
