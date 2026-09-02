import { useMemo, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { CounterpartyFilter } from './CounterpartyFilter';
import { DateRangeFilter, getDefaultDateRange } from './DateRangeFilter';
import { TransactionModal } from './TransactionModal';
import { FulfillTransactionModal } from './FulfillTransactionModal';
import { TransactionDetailModal } from './TransactionDetailModal';
import type { Transaction } from '../types';
import {
  canDeleteTransaction,
  filterByCounterparty,
  filterByDateRange,
  getDeleteBlockedMessage,
  getKindLabel,
  getTransactionKind,
  getUniqueCounterparties,
  isPendingPlannedTransaction,
  isPlannedKind,
  isProcessedTransaction,
  sumByKind,
  sumPendingByKind,
  type TransactionKind,
} from '../utils/transactionUtils';

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

export interface FooterConfig {
  left: { label: string; kind: TransactionKind; variant: 'income' | 'expenditure' | 'profit' | 'loss' | 'to_receive' | 'to_pay' };
  right: { label: string; kind: TransactionKind; variant: 'income' | 'expenditure' | 'profit' | 'loss' | 'to_receive' | 'to_pay' };
  net: { label: string; leftKind: TransactionKind; rightKind: TransactionKind };
}

interface TransactionBoardProps {
  title: string;
  subtitle: string;
  incomeKind: TransactionKind;
  outcomeKind: TransactionKind;
  incomeTitle: string;
  outcomeTitle: string;
  incomeHint: string;
  outcomeHint: string;
  defaultKind: TransactionKind;
  allowedKinds: TransactionKind[];
  footerConfig: FooterConfig;
  transactions: Transaction[];
  usePendingTotals?: boolean;
  onAdd: (data: {
    date: string;
    amount: number;
    type: 'deposit' | 'withdrawal';
    status: 'actual' | 'planned';
    counterparty: string;
    details: string;
  }) => void;
  onDelete: (id: string) => { ok: boolean; error?: string };
  enableFulfill?: boolean;
  onFulfill?: (input: {
    plannedId: string;
    date: string;
    amount: number;
    counterparty: string;
    details: string;
    type: 'deposit' | 'withdrawal';
  }) => void;
  onReactivate?: (plannedId: string) => void;
}

export function TransactionBoard({
  title,
  subtitle,
  incomeKind,
  outcomeKind,
  incomeTitle,
  outcomeTitle,
  incomeHint,
  outcomeHint,
  defaultKind,
  allowedKinds,
  footerConfig,
  transactions,
  usePendingTotals = false,
  onAdd,
  onDelete,
  enableFulfill = false,
  onFulfill,
  onReactivate,
}: TransactionBoardProps) {
  const defaults = getDefaultDateRange();
  const [startDate, setStartDate] = useState(defaults.startDate);
  const [endDate, setEndDate] = useState(defaults.endDate);
  const [counterparty, setCounterparty] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [fulfillTarget, setFulfillTarget] = useState<Transaction | null>(null);
  const [detailTarget, setDetailTarget] = useState<Transaction | null>(null);

  const counterparties = useMemo(
    () => getUniqueCounterparties(transactions),
    [transactions],
  );

  const filtered = useMemo(() => {
    const byDate = filterByDateRange(transactions, startDate, endDate);
    return filterByCounterparty(byDate, counterparty);
  }, [transactions, startDate, endDate, counterparty]);

  const incomeItems = useMemo(
    () => filtered.filter((t) => getTransactionKind(t) === incomeKind),
    [filtered, incomeKind],
  );

  const outcomeItems = useMemo(
    () => filtered.filter((t) => getTransactionKind(t) === outcomeKind),
    [filtered, outcomeKind],
  );

  const sumForFooter = (kind: TransactionKind) =>
    usePendingTotals ? sumPendingByKind(filtered, kind) : sumByKind(filtered, kind);

  const overviewItems = useMemo(() => {
    const left = sumForFooter(footerConfig.left.kind);
    const right = sumForFooter(footerConfig.right.kind);
    const net = sumForFooter(footerConfig.net.leftKind) - sumForFooter(footerConfig.net.rightKind);
    return [
      { label: footerConfig.left.label, value: left, variant: footerConfig.left.variant },
      { label: footerConfig.right.label, value: right, variant: footerConfig.right.variant },
      {
        label: footerConfig.net.label,
        value: net,
        variant: net >= 0 ? ('profit' as const) : ('loss' as const),
      },
    ];
  }, [filtered, footerConfig, usePendingTotals]);

  const handleDelete = (transaction: Transaction) => {
    if (!canDeleteTransaction(transaction)) {
      window.alert(getDeleteBlockedMessage(transaction));
      return;
    }

    const message = `Delete this ${getKindLabel(getTransactionKind(transaction)).toLowerCase()} transaction?\n\n${transaction.counterparty} — ${formatCurrency(transaction.amount)}`;
    if (window.confirm(message)) {
      onDelete(transaction.id);
    }
  };

  const renderList = (items: Transaction[], kind: TransactionKind) => (
    <div className="transaction-list">
      {items.length === 0 ? (
        <p className="empty-list">No {getKindLabel(kind).toLowerCase()} records.</p>
      ) : (
        items.map((t) => {
          const processed = isProcessedTransaction(t);
          const deletable = canDeleteTransaction(t);

          return (
            <article
              key={t.id}
              className={`transaction-item ${kind} ${processed ? 'processed' : ''}`}
            >
              <div className="transaction-card-icons">
                <button
                  type="button"
                  className="card-icon-btn"
                  onClick={() => setDetailTarget(t)}
                  aria-label="View details"
                  title="Details"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 16a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm0-9a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5Zm0 13.5a9 9 0 0 1-9-9 9.75 9.75 0 0 1 .18-1.87A9 9 0 1 1 12 20.5Z" />
                  </svg>
                </button>
                {deletable && (
                  <button
                    type="button"
                    className="card-icon-btn danger"
                    onClick={() => handleDelete(t)}
                    aria-label="Delete transaction"
                    title="Delete"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M9 3h6l1 2h4v2H4V5h4l1-2Zm1 6h2v9h-2V9Zm4 0h2v9h-2V9ZM7 9h2v9H7V9Z" />
                    </svg>
                  </button>
                )}
              </div>
              <div className="transaction-main">
                <div>
                  <div className="transaction-meta-row">
                    <span className="transaction-date">{format(parseISO(t.date), 'MMM d, yyyy')}</span>
                    {processed && <span className="processed-badge">Processed</span>}
                  </div>
                  <p className="transaction-counterparty">{t.counterparty}</p>
                  {processed && t.processedAt && (
                    <p className="transaction-processed-date">
                      {kind === 'to_receive' ? 'Received' : 'Paid'} on{' '}
                      {format(parseISO(t.processedAt), 'MMM d, yyyy')}
                    </p>
                  )}
                </div>
                <span className="transaction-amount">{formatCurrency(t.amount)}</span>
              </div>
            </article>
          );
        })
      )}
    </div>
  );

  return (
    <div className="page transactions-page">
      <header className="page-header">
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <div className="header-actions">
          <DateRangeFilter
            startDate={startDate}
            endDate={endDate}
            onStartChange={setStartDate}
            onEndChange={setEndDate}
          />
          <CounterpartyFilter
            counterparties={counterparties}
            value={counterparty}
            onChange={setCounterparty}
          />
          <button type="button" className="btn btn-primary" onClick={() => setShowModal(true)}>
            + Add Transaction
          </button>
        </div>
      </header>

      <div className="totals-bar page-overview">
        {overviewItems.map((item, index) => (
          <div key={item.label} className="totals-bar-group">
            {index > 0 && <div className="total-divider" />}
            <div className="total-item">
              <span className="total-label">{item.label}</span>
              <span className={`total-value ${item.variant}`}>{formatCurrency(item.value)}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="split-panels">
        <section className="panel panel-income">
          <div className="panel-header">
            <span className="panel-icon">↑</span>
            <div className="panel-title-group">
              <h3>{incomeTitle}</h3>
              <p className="panel-hint">{incomeHint}</p>
            </div>
            <span className="panel-count">{incomeItems.length} records</span>
          </div>
          {renderList(incomeItems, incomeKind)}
        </section>

        <section className="panel panel-withdrawal">
          <div className="panel-header">
            <span className="panel-icon">↓</span>
            <div className="panel-title-group">
              <h3>{outcomeTitle}</h3>
              <p className="panel-hint">{outcomeHint}</p>
            </div>
            <span className="panel-count">{outcomeItems.length} records</span>
          </div>
          {renderList(outcomeItems, outcomeKind)}
        </section>
      </div>

      {showModal && (
        <TransactionModal
          defaultKind={defaultKind}
          allowedKinds={allowedKinds}
          onClose={() => setShowModal(false)}
          onSubmit={onAdd}
        />
      )}

      {detailTarget && (
        <TransactionDetailModal
          transaction={detailTarget}
          onClose={() => setDetailTarget(null)}
          onDelete={() => {
            handleDelete(detailTarget);
            setDetailTarget(null);
          }}
          onFulfill={
            enableFulfill &&
            isPendingPlannedTransaction(detailTarget) &&
            isPlannedKind(getTransactionKind(detailTarget)) &&
            onFulfill
              ? () => {
                  setDetailTarget(null);
                  setFulfillTarget(detailTarget);
                }
              : undefined
          }
          onReactivate={
            enableFulfill &&
            isProcessedTransaction(detailTarget) &&
            onReactivate
              ? () => {
                  if (
                    window.confirm(
                      'Reactivate this planned record? The linked auto-registered transaction on Income & Outcome will be removed.',
                    )
                  ) {
                    onReactivate(detailTarget.id);
                    setDetailTarget(null);
                  }
                }
              : undefined
          }
        />
      )}

      {fulfillTarget && onFulfill && (
        <FulfillTransactionModal
          transaction={fulfillTarget}
          onClose={() => setFulfillTarget(null)}
          onSubmit={onFulfill}
        />
      )}
    </div>
  );
}
