import { useApp } from '../context/AppContext';
import { TransactionBoard } from '../components/TransactionBoard';

export function PlannedPage() {
  const {
    data,
    addTransaction,
    deleteTransaction,
    fulfillPlannedTransaction,
    reactivatePlannedTransaction,
  } = useApp();

  return (
    <TransactionBoard
      title="Planned Transactions"
      subtitle="Track expected income to receive and payments to pay"
      incomeKind="to_receive"
      outcomeKind="to_pay"
      incomeTitle="To Receive"
      outcomeTitle="To Pay"
      incomeHint="Expected income not yet received"
      outcomeHint="Expected payments not yet made"
      defaultKind="to_receive"
      allowedKinds={['to_receive', 'to_pay']}
      usePendingTotals
      footerConfig={{
        left: { label: 'Pending To Receive', kind: 'to_receive', variant: 'to_receive' },
        right: { label: 'Pending To Pay', kind: 'to_pay', variant: 'to_pay' },
        net: { label: 'Net Expected', leftKind: 'to_receive', rightKind: 'to_pay' },
      }}
      transactions={data.transactions}
      onAdd={addTransaction}
      onDelete={deleteTransaction}
      enableFulfill
      onFulfill={fulfillPlannedTransaction}
      onReactivate={reactivatePlannedTransaction}
    />
  );
}
