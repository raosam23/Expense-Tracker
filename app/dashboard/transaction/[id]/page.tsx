import OneTransaction from '@/app/components/OneTransaction';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import { redirect } from 'next/navigation';

export default function DashboardPage({ params }: { params: { id: string } }) {
  const server = getServerSession(authOptions);
  if (!server) redirect('/login');
  return (
    <div>
      <OneTransaction id={params.id} />
    </div>
  );
}
