import type { AppData, Transaction } from '../types';
import { getTransactionKind, isActualTransaction, sumPendingByKind } from './transactionUtils';
import type { TransactionKind } from './transactionUtils';

export interface FundSummary {
  totalIncome: number;
  totalOutcome: number;
  netProfit: number;
  totalToReceived: number;
  totalToPaid: number;
  remaining: number;
  availableFunds: number;
  netPosition: number;
  debtCoveragePercent: number;
}

function roundMoney(value: number): number {
  return Math.round(value * 100) / 100;
}

export function sumIncome(transactions: Transaction[]): number {
  return roundMoney(
    transactions
      .filter((t) => t.type === 'deposit' && isActualTransaction(t))
      .reduce((sum, t) => sum + t.amount, 0),
  );
}

export function sumOutcome(transactions: Transaction[]): number {
  return roundMoney(
    transactions
      .filter((t) => t.type === 'withdrawal' && isActualTransaction(t))
      .reduce((sum, t) => sum + t.amount, 0),
  );
}

function sumByTransactionKind(transactions: Transaction[], kind: TransactionKind): number {
  return roundMoney(
    transactions.filter((t) => getTransactionKind(t) === kind).reduce((sum, t) => sum + t.amount, 0),
  );
}

export function calculateFundSummary(data: AppData): FundSummary {
  const totalIncome = sumIncome(data.transactions);
  const totalOutcome = sumOutcome(data.transactions);
  const netProfit = roundMoney(totalIncome - totalOutcome);

  const pendingToReceive = sumPendingByKind(data.transactions, 'to_receive');
  const pendingToPay = sumPendingByKind(data.transactions, 'to_pay');
  const received = sumByTransactionKind(data.transactions, 'received');
  const paid = sumByTransactionKind(data.transactions, 'paid');

  // Pending planned only — processed records already have a linked actual entry.
  const totalToReceived = roundMoney(pendingToReceive + received);
  const totalToPaid = roundMoney(pendingToPay + paid);
  const remaining = roundMoney(pendingToReceive - pendingToPay);

  const availableFunds = netProfit;
  const netPosition = roundMoney(availableFunds + remaining);
  const debtCoveragePercent =
    pendingToPay > 0
      ? roundMoney(Math.min((availableFunds / pendingToPay) * 100, 999))
      : availableFunds > 0
        ? 100
        : 0;

  return {
    totalIncome,
    totalOutcome,
    netProfit,
    totalToReceived,
    totalToPaid,
    remaining,
    availableFunds,
    netPosition,
    debtCoveragePercent,
  };
}
