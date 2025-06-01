import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import { redirect } from 'next/navigation';
import ExpensesOrIncomeInput from '@/app/components/ExpensesOrIncomeInput';

export default async function Add() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');
  return (
    <div>
      <ExpensesOrIncomeInput />
    </div>
  );
}
