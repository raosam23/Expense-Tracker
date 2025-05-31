import React from 'react';
import CardHeroSubSection from './CardHeroSubSection';
import Link from 'next/link';

const HeroSubSection = () => {
  return (
    <div className="flex flex-col space-y-10 my-10">
      <div className="max-w-2xl space-y-6">
        <h1 className="text-5xl font-bold">Effortlessly Manage Your Finances with Ease</h1>
        <p className="text-xl font-light text-left max-w-5/6">
          Using Expense Tracker is simple and intuitive. Just input your income and expenses to see your savings
          visually represented.
        </p>
      </div>
      <div className="flex flex-row space-x-16 justify-between max-w-4/5 mx-auto">
        <CardHeroSubSection emoji="📊" heading="Dashboard Overview">
          See your incomes, expenses at a glance.
        </CardHeroSubSection>
        <CardHeroSubSection emoji="📆" heading="View your History">
          Access and filter your transactions anytime.
        </CardHeroSubSection>
        <CardHeroSubSection emoji="🤑" heading="Add Transactions Quickly">
          Add incomes and expenses quickly with category and amount.
        </CardHeroSubSection>
        <CardHeroSubSection emoji="📈" heading="Visual Insights">
          Track your trend with insightful charts.
        </CardHeroSubSection>
      </div>
      <div className="space-x-5">
        <Link href="/add">
          <button
            className="border border-green-900 text-green-900 px-6 py-2 rounded hover:bg-green-800
            hover:text-green-100 cursor-pointer transition duration-200"
          >
            Getting Started
          </button>
        </Link>
        <Link href="/about">
          <button className="text-green-800 px-6 py-2 cursor-pointer hover:text-green-900 transition duration-200">{`Learn More >`}</button>
        </Link>
      </div>
    </div>
  );
};

export default HeroSubSection;
