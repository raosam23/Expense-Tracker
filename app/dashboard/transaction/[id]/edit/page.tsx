import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import { redirect } from 'next/navigation';
import EditTransactionPage from '@/app/components/EditTransaction';

const Edit = async ({ params }: { params: { id: string } }) => {
  const server = await getServerSession(authOptions);
  console.log('sec' + params.id);
  if (!server || !server.user || !server.user.email) {
    redirect('/login');
  }
  return (
    <div>
      <EditTransactionPage id={params.id} />
    </div>
  );
};

export default Edit;
