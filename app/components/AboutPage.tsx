import React from 'react';

const AboutPage = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-6 text-center">💚 About Our App</h1>
      <p className="mb-4 text-center">
        <strong>Expense Tracker</strong> is a simple and intuitive full-stack web application that helps users manage
        their personal finances. It allows you to add income, track expenses, visualize trends and stay in control of
        your money.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-2 text-center">🤔 Why did we build this?</h2>
      <p className="mb-4 text-center">
        Managing money doesn&apos;t have to be hard. This app was build to help people become more financially aware by
        offering a clean and distraction-free interface to track and spending and income regularly.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-2 text-center">😇 Features</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>💰 Add and view transactions</li>
        <li>📊 Visual insights via charts</li>
        <li>🔍 Track income vs expenses</li>
        <li>🧾 View transaction history</li>
        <li>📈 Easy-to-read dashboard</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-2 text-center">👩‍💻 Tech Stack</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>
          <strong>Frontend:</strong> Next.js (App Router), React, Tailwind CSS
        </li>
        <li>
          <strong>Backend:</strong> Next.js API Routes
        </li>
        <li>
          <strong>Styling:</strong> Tailwind CSS
        </li>
        <li>
          <strong>Data:</strong> Prisma + PosgreSQL{' '}
        </li>
        <li>
          <strong>Charts:</strong> Chart.js
        </li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-2 text-center">😲 Who built this?</h2>
      <p className="mb-4 text-center">
        Built by <strong>Samarth</strong> with 💚 in 2025
      </p>
    </div>
  );
};
export default AboutPage;
