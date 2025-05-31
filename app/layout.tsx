import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/app/components/Navbar';
import AuthProvider from './components/AuthProvider';
import ThemeWrapper from './components/ThemeWrapper';

export const metadata: Metadata = {
  title: 'Expense-Tracker',
  description: 'Calculate your expense, find out what you are spending on...',
};

const getCurrentYear = (): number => {
  return new Date().getFullYear();
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <ThemeWrapper>
            <header className="p-14 mx-16">
              <Navbar />
            </header>
            <main className="p-4 max-w-5/6 mx-auto my-auto">{children}</main>
            <footer className="p-4 text-center text-xs">{`©${getCurrentYear()} Expense-Tracker`}</footer>
          </ThemeWrapper>
        </body>
      </html>
    </AuthProvider>
  );
}
