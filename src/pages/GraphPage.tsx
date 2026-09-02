import { useMemo, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { format, parseISO } from 'date-fns';
import { DateRangeFilter, getDefaultDateRange } from '../components/DateRangeFilter';
import { FundOverview } from '../components/FundOverview';
import { filterByDateRange, isActualTransaction } from '../utils/transactionUtils';
import { useApp } from '../context/AppContext';

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function GraphPage() {
  const { data } = useApp();
  const defaults = getDefaultDateRange();
  const [startDate, setStartDate] = useState(defaults.startDate);
  const [endDate, setEndDate] = useState(defaults.endDate);

  const chartData = useMemo(() => {
    const filtered = filterByDateRange(data.transactions, startDate, endDate).filter(isActualTransaction);
    const byDate = new Map<string, { income: number; expenditure: number; profit: number }>();

    filtered.forEach((t) => {
      const entry = byDate.get(t.date) ?? { income: 0, expenditure: 0, profit: 0 };
      if (t.type === 'deposit') {
        entry.income += t.amount;
      } else {
        entry.expenditure += t.amount;
      }
      entry.profit = entry.income - entry.expenditure;
      byDate.set(t.date, entry);
    });

    return Array.from(byDate.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, values]) => ({
        date,
        label: format(parseISO(date), 'MMM d'),
        income: values.income,
        expenditure: values.expenditure,
        profit: values.profit,
      }));
  }, [data.transactions, startDate, endDate]);

  const totals = useMemo(() => {
    const filtered = filterByDateRange(data.transactions, startDate, endDate).filter(isActualTransaction);
    const income = filtered.filter((t) => t.type === 'deposit').reduce((s, t) => s + t.amount, 0);
    const expenditure = filtered
      .filter((t) => t.type === 'withdrawal')
      .reduce((s, t) => s + t.amount, 0);
    return { income, expenditure, profit: income - expenditure };
  }, [data.transactions, startDate, endDate]);

  return (
    <div className="page graph-page">
      <FundOverview data={data} />

      <header className="page-header graph-page-header">
        <div>
          <h2>Financial Overview</h2>
          <p>Income, expenditure, and profit trends over time</p>
        </div>
        <DateRangeFilter
          startDate={startDate}
          endDate={endDate}
          onStartChange={setStartDate}
          onEndChange={setEndDate}
        />
      </header>

      <h3 className="section-title">Trends</h3>

      <div className="stat-cards">
        <div className="stat-card income">
          <span className="stat-label">Total Income</span>
          <span className="stat-value">{formatCurrency(totals.income)}</span>
        </div>
        <div className="stat-card expenditure">
          <span className="stat-label">Total Expenditure</span>
          <span className="stat-value">{formatCurrency(totals.expenditure)}</span>
        </div>
        <div className="stat-card profit">
          <span className="stat-label">Total Profit</span>
          <span className="stat-value">{formatCurrency(totals.profit)}</span>
        </div>
      </div>

      <div className="chart-panel">
        {chartData.length === 0 ? (
          <div className="empty-chart">
            <p>No data in this date range.</p>
            <p className="muted">Add transactions on the Income & Outcome or Planned page.</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={420}>
            <AreaChart data={chartData} margin={{ top: 10, right: 24, left: 8, bottom: 0 }}>
              <defs>
                <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f87171" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
              <XAxis
                dataKey="label"
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(148,163,184,0.2)' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  background: '#1e293b',
                  border: '1px solid rgba(148,163,184,0.2)',
                  borderRadius: 12,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                }}
                labelStyle={{ color: '#e2e8f0', fontWeight: 600 }}
                formatter={(value, name) => [
                  formatCurrency(Number(value ?? 0)),
                  String(name),
                ]}
              />
              <Legend
                wrapperStyle={{ paddingTop: 16 }}
                formatter={(value) => (
                  <span style={{ color: '#cbd5e1', textTransform: 'capitalize' }}>{value}</span>
                )}
              />
              <Area
                type="monotone"
                dataKey="income"
                name="Income"
                stroke="#34d399"
                strokeWidth={2.5}
                fill="url(#incomeGrad)"
                dot={{ r: 4, fill: '#34d399', strokeWidth: 0 }}
                activeDot={{ r: 6 }}
              />
              <Area
                type="monotone"
                dataKey="expenditure"
                name="Expenditure"
                stroke="#f87171"
                strokeWidth={2.5}
                fill="url(#expendGrad)"
                dot={{ r: 4, fill: '#f87171', strokeWidth: 0 }}
                activeDot={{ r: 6 }}
              />
              <Area
                type="monotone"
                dataKey="profit"
                name="Profit"
                stroke="#60a5fa"
                strokeWidth={2.5}
                fill="url(#profitGrad)"
                dot={{ r: 4, fill: '#60a5fa', strokeWidth: 0 }}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
