interface CounterpartyFilterProps {
  counterparties: string[];
  value: string;
  onChange: (value: string) => void;
}

export function CounterpartyFilter({ counterparties, value, onChange }: CounterpartyFilterProps) {
  return (
    <div className="counterparty-filter">
      <span className="filter-label">Counterparty</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">All counterparties</option>
        {counterparties.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}
