import SignUpForm from '@/app/components/SignUpForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import { redirect } from 'next/navigation';

export default async function SignUp() {
  const session = await getServerSession(authOptions);
  if (session) redirect('/profile');
  return (
    <div>
      <SignUpForm />
    </div>
  );
}
