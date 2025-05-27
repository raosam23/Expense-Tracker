import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
const HeroSection = () => {
  return (
    <div className="flex flex-row justify-between items-center my-10 space-x-20">
      <div className="flex flex-col space-y-10">
        <h1 className="text-5xl font-bold">Master your Finances with Expense-Tracker</h1>
        <p className="text-xl font-light text-left max-w-5/6">
          Take control of your financial health by effortlessly tracking your expenses and income. Visualize your
          savings with our intuitive pie charts and make informed decisions.
        </p>
        <div className="space-x-5">
          <Link href="/add">
            <button className="bg-green-800 text-green-100 px-6 py-2 rounded hover:bg-green-950 cursor-pointer">
              Getting Started
            </button>
          </Link>
          <Link href="/about">
            <button
              className="border border-green-900 text-green-900 px-6 py-2 rounded hover:bg-green-900
            hover:text-green-100 cursor-pointer"
            >
              Learn More
            </button>
          </Link>
        </div>
      </div>
      <Image src="/images/HeroSectionImage.png" alt="Random image of a girl" width={1200} height={800} />
    </div>
  );
};

export default HeroSection;
