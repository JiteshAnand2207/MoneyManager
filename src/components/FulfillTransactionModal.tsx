import { useState } from 'react';
import type { Transaction } from '../types';
import {
  getFulfillLabel,
  getTransactionKind,
  kindToTypeStatus,
  getFulfillmentKind,
} from '../utils/transactionUtils';

interface FulfillTransactionModalProps {
  transaction: Transaction;
  onClose: () => void;
  onSubmit: (data: {
    plannedId: string;
    date: string;
    amount: number;
    counterparty: string;
    details: string;
    type: 'deposit' | 'withdrawal';
  }) => void;
}

export function FulfillTransactionModal({
  transaction,
  onClose,
  onSubmit,
}: FulfillTransactionModalProps) {
  const today = new Date().toISOString().slice(0, 10);
  const kind = getTransactionKind(transaction);
  const fulfillmentKind = getFulfillmentKind(kind);
  const [date, setDate] = useState(today);
  const [amount, setAmount] = useState(String(transaction.amount));
  const [details, setDetails] = useState(transaction.details);
  const [error, setError] = useState('');

  if (!fulfillmentKind) return null;

  const { type } = kindToTypeStatus(fulfillmentKind);

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

    onSubmit({
      plannedId: transaction.id,
      date,
      amount: parsed,
      counterparty: transaction.counterparty,
      details: details.trim(),
      type,
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-wide" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{getFulfillLabel(kind)}</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <p className="fulfill-summary">
            Recording actual transaction for <strong>{transaction.counterparty}</strong>
          </p>

          <div className="form-row">
            <label>
              {kind === 'to_receive' ? 'Received Date' : 'Paid Date'}
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </label>
            <label>
              Amount
              <input
                type="number"
                min="0.01"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </label>
          </div>

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
              {getFulfillLabel(kind)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
