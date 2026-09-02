import { format, subMonths } from 'date-fns';

interface DateRangeFilterProps {
  startDate: string;
  endDate: string;
  onStartChange: (value: string) => void;
  onEndChange: (value: string) => void;
}

export function getDefaultDateRange() {
  const end = new Date();
  const start = subMonths(end, 6);
  return {
    startDate: format(start, 'yyyy-MM-dd'),
    endDate: format(end, 'yyyy-MM-dd'),
  };
}

export function DateRangeFilter({
  startDate,
  endDate,
  onStartChange,
  onEndChange,
}: DateRangeFilterProps) {
  return (
    <div className="date-range-filter">
      <span className="filter-label">Date Range</span>
      <div className="date-inputs">
        <label>
          From
          <input
            type="date"
            value={startDate}
            max={endDate}
            onChange={(e) => onStartChange(e.target.value)}
          />
        </label>
        <span className="date-separator">→</span>
        <label>
          To
          <input
            type="date"
            value={endDate}
            min={startDate}
            onChange={(e) => onEndChange(e.target.value)}
          />
        </label>
      </div>
    </div>
  );
}
