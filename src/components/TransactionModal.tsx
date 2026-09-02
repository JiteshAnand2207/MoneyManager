import { useState } from 'react';
import type { TransactionKind } from '../utils/transactionUtils';
import { kindToTypeStatus, TRANSACTION_KINDS } from '../utils/transactionUtils';

interface TransactionModalProps {
  defaultKind?: TransactionKind;
  allowedKinds?: TransactionKind[];
  onClose: () => void;
  onSubmit: (data: {
    date: string;
    amount: number;
    type: 'deposit' | 'withdrawal';
    status: 'actual' | 'planned';
    counterparty: string;
    details: string;
  }) => void;
}

export function TransactionModal({
  defaultKind = 'received',
  allowedKinds = TRANSACTION_KINDS.map((k) => k.kind),
  onClose,
  onSubmit,
}: TransactionModalProps) {
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(today);
  const [amount, setAmount] = useState('');
  const [kind, setKind] = useState<TransactionKind>(defaultKind);
  const [counterparty, setCounterparty] = useState('');
  const [details, setDetails] = useState('');
  const [error, setError] = useState('');

  const kindOptions = TRANSACTION_KINDS.filter((option) => allowedKinds.includes(option.kind));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(amount);
    if (!date) {
      setError('Please select a date.');
      return;
    }
    if (!parsed || parsed <= 0) {
      setError('Please enter a valid amount greater than 0.');
      return;
    }
    if (!counterparty.trim()) {
      setError('Please enter a counterparty.');
      return;
    }

    const { type, status } = kindToTypeStatus(kind);
    onSubmit({
      date,
      amount: parsed,
      type,
      status: status as 'actual' | 'planned',
      counterparty: counterparty.trim(),
      details: details.trim(),
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-wide" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Transaction</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <fieldset className="kind-selector">
            <legend>Transaction Type</legend>
            <div className="kind-options">
              {kindOptions.map((option) => (
                <label
                  key={option.kind}
                  className={`kind-option ${kind === option.kind ? `active ${option.kind}` : ''}`}
                >
                  <input
                    type="radio"
                    name="kind"
                    value={option.kind}
                    checked={kind === option.kind}
                    onChange={() => setKind(option.kind)}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="form-row">
            <label>
              Date
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </label>
            <label>
              Amount
              <input
                type="number"
                min="0.01"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </label>
          </div>

          <label>
            Counterparty
            <input
              type="text"
              placeholder="e.g. Client name, vendor, employer…"
              value={counterparty}
              onChange={(e) => setCounterparty(e.target.value)}
              required
            />
          </label>

          <label>
            Details
            <textarea
              rows={3}
              placeholder="Description or notes…"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </label>

          {error && <p className="form-error">{error}</p>}

          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
