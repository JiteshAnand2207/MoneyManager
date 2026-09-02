import { useMemo } from 'react';
import type { AppData } from '../types';
import { calculateFundSummary } from '../utils/debtCalculations';

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

interface FundOverviewProps {
  data: AppData;
}

export function FundOverview({ data }: FundOverviewProps) {
  const fundSummary = useMemo(() => calculateFundSummary(data), [data]);

  return (
    <>
      <div className="stat-cards debt-stat-cards">
        <div className="stat-card to-receive-total">
          <span className="stat-label">Total To Received</span>
          <span className="stat-value">{formatCurrency(fundSummary.totalToReceived)}</span>
        </div>
        <div className="stat-card to-pay-total">
          <span className="stat-label">Total To Paid</span>
          <span className="stat-value">{formatCurrency(fundSummary.totalToPaid)}</span>
        </div>
        <div className="stat-card debt-remaining">
          <span className="stat-label">Remaining</span>
          <span className={`stat-value ${fundSummary.remaining >= 0 ? 'positive' : 'negative'}`}>
            {formatCurrency(fundSummary.remaining)}
          </span>
        </div>
        <div className="stat-card debt-funds">
          <span className="stat-label">Available Funds</span>
          <span className="stat-value">{formatCurrency(fundSummary.availableFunds)}</span>
        </div>
        <div className="stat-card debt-net">
          <span className="stat-label">Net Position</span>
          <span className={`stat-value ${fundSummary.netPosition >= 0 ? 'positive' : 'negative'}`}>
            {formatCurrency(fundSummary.netPosition)}
          </span>
        </div>
      </div>

      <div className="fund-calculation-panel">
        <h3>Fund Calculation</h3>
        <div className="calculation-steps">
          <div className="calc-step">
            <span className="calc-label">Total Income</span>
            <span className="calc-value income">{formatCurrency(fundSummary.totalIncome)}</span>
          </div>
          <span className="calc-operator">−</span>
          <div className="calc-step">
            <span className="calc-label">Total Outcome</span>
            <span className="calc-value expenditure">{formatCurrency(fundSummary.totalOutcome)}</span>
          </div>
          <span className="calc-operator">=</span>
          <div className="calc-step highlight">
            <span className="calc-label">Available Funds</span>
            <span className="calc-value">{formatCurrency(fundSummary.availableFunds)}</span>
          </div>
          <span className="calc-operator">+</span>
          <div className="calc-step">
            <span className="calc-label">Remaining</span>
            <span className={`calc-value ${fundSummary.remaining >= 0 ? 'income' : 'expenditure'}`}>
              {formatCurrency(fundSummary.remaining)}
            </span>
          </div>
          <span className="calc-operator">=</span>
          <div className="calc-step highlight">
            <span className="calc-label">Net Position</span>
            <span className={`calc-value ${fundSummary.netPosition >= 0 ? 'income' : 'expenditure'}`}>
              {formatCurrency(fundSummary.netPosition)}
            </span>
          </div>
        </div>
        <p className="coverage-note">
          Remaining = pending To Receive − pending To Pay. Net Position = Available Funds + Remaining.
        </p>
      </div>
    </>
  );
}
