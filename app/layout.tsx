import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import AuthProvider from "./components/AuthProvider";

export const metadata: Metadata = {
  title: "Expense-Tracker",
  description: "Calculate your expense, find out what you are spending on...",
};

const getCurrentYear = (): number => {
  return new Date().getFullYear();
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className="bg-customGreen text-green-900">
          <header className="p-14">
            <Navbar />
          </header>
          <main className="p-4 max-w-4xl mx-auto my-auto">{children}</main>
          <footer className="p-4 text-center text-xs text-green-900">{`©${getCurrentYear()} Expense-Tracker`}</footer>
        </body>
      </html>
    </AuthProvider>
  );
}
