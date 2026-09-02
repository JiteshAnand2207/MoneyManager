import { useApp } from '../context/AppContext';
import { TransactionBoard } from '../components/TransactionBoard';

export function TransactionsPage() {
  const { data, addTransaction, deleteTransaction } = useApp();

  return (
    <TransactionBoard
      title="Income & Outcome"
      subtitle="Track received income and paid outcomes with counterparty details"
      incomeKind="received"
      outcomeKind="paid"
      incomeTitle="Received"
      outcomeTitle="Paid"
      incomeHint="Income already received"
      outcomeHint="Payments already made"
      defaultKind="received"
      allowedKinds={['received', 'paid']}
      footerConfig={{
        left: { label: 'Total Received', kind: 'received', variant: 'income' },
        right: { label: 'Total Paid', kind: 'paid', variant: 'expenditure' },
        net: { label: 'Net Profit', leftKind: 'received', rightKind: 'paid' },
      }}
      transactions={data.transactions}
      onAdd={addTransaction}
      onDelete={deleteTransaction}
    />
  );
}
