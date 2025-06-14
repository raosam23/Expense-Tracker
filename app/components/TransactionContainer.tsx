'use client';
import React, { useEffect, useState } from 'react';
import Expenses from './Expenses';
import Incomes from './Incomes';
import ExpensesIncomePie from './ExpensesIncomePie';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useTransactionStore } from '../store/transactionStore';
import { LoadingSpinner } from './LoadingSpinner';

const TransactionContainer = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { data: server } = useSession();
  const { setTransactions } = useTransactionStore();
  const username = server?.user?.email;
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (username) {
          const res = await axios.get('/api/transaction', {
            params: { username },
          });
          if (res.status === 200) {
            setTransactions(res.data.transactions);
          }
        }
      } catch (e) {
        console.error(`Failed to fetch data: ${e}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <div className="flex flex-row justify-center min-w-auto">
            <Expenses />
            <Incomes />
          </div>
          <div className="w-full flex justify-center my-4 p-5">
            <ExpensesIncomePie />
          </div>
        </div>
      )}
    </>
  );
};

export default TransactionContainer;
