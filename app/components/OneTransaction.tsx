'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, usePathname } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { TransactionType } from '@/app/types/TransactionType';
import { useSession } from 'next-auth/react';
import { LoadingSpinner } from './LoadingSpinner';
import { useThemeStore } from '../store/themeStore';

export default function OneTransaction(props: { id: string }) {
  const [transactionData, setTransactionData] = useState<TransactionType | undefined>();
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const username = session?.user?.email;
  const handleOnDelete = async () => {
    try {
      if (username) {
        const res = await axios.delete('/api/transaction', {
          params: { id: props.id },
        });
        if (res.status === 200) {
          alert('Transaction has been deleted');
          router.push('/dashboard');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (username) {
          const res = await axios.get('/api/transaction', {
            params: { id: props.id },
          });
          if (res.status === 200) {
            const transaction = res.data.transaction;
            setTransactionData(transaction);
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

  const router: AppRouterInstance = useRouter();
  const pathName: string = usePathname();
  const isDark = useThemeStore((state) => state.isDarkMode);
  return (
    <div className="flex justify-center items-center">
      {loading ? (
        <LoadingSpinner />
      ) : transactionData ? (
        <div
          className={`${
            isDark ? 'bg-green-950' : 'bg-green-200'
          } shadow-xl rounded-lg p-10 w-full max-w-md min-h-fit text-center transition duration-1000`}
        >
          <h1 className={`${isDark ? 'text-gray-200' : ' text-gray-900'} text-3xl font-extrabold mb-2 transition duration-1000`}>
            {`${transactionData.type}:  ${transactionData.title}`}
          </h1>
          <h2 className={`${isDark ? 'text-gray-200' : ' text-gray-900'} text-lg mb-6 transition duration-1000`}>
            {transactionData.note}
          </h2>
          <h3 className={`${isDark ? 'text-gray-200' : ' text-gray-900'} text-sm mb-6 transition duration-1000`}>
            {transactionData.createAt}
          </h3>
          {transactionData.type === 'EXPENSE' ? (
            <div className="text-2xl font-bold text-red-600">₹{transactionData.amount}</div>
          ) : (
            <div className="text-2xl font-bold text-green-600">₹{transactionData.amount}</div>
          )}
          <div className="flex justify-center space-x-4 m-4">
            <div className="bg-red-500 text-white w-fit p-2 rounded hover:bg-red-600">
              <button onClick={handleOnDelete}>Delete</button>
            </div>
            <div className="bg-green-800 text-white w-fit p-2 rounded hover:bg-green-900">
              <button onClick={() => router.push(`${pathName}/edit`)}>Edit</button>
            </div>
            <div className="bg-green-500 text-white w-fit p-2 rounded hover:bg-green-600">
              <button onClick={() => router.back()}>Back</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-red-600 text-lg">Transaction not found</div>
      )}
    </div>
  );
}
