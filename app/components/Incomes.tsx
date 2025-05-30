import React from 'react';
import TransactionsCard from '@/app/components/TransactionsCard';
import { TransactionType } from '@/app/types/TransactionType';
import { useTransactionStore } from '../store/transactionStore';

const Incomes = () => {
  const { transactions } = useTransactionStore();
  const incomes = transactions.filter((tran: TransactionType) => tran.type === 'INCOME');
  return (
    <div className="flex flex-col items-center max-w-fit mx-2.5">
      <h1 className="text-3xl text-center font-bold">Income</h1>
      {incomes.length > 0 ? (
        incomes.map((income, index: number) => (
          <TransactionsCard
            key={index}
            id={income.id}
            title={income.title}
            note={income.note}
            amount={Number(income.amount)}
            type={'INCOME'}
          />
        ))
      ) : (
        <p className="my-4 text-xl text-center font-bold">No transactions yet</p>
      )}
    </div>
  );
};

export default Incomes;
