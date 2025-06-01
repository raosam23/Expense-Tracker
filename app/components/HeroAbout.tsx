import React from 'react';
import Image from 'next/image';

const HeroAbout = () => {
  return (
    <div className="flex flex-row justify-around items-center my-10 space-x-20">
      <Image src="/images/HeroAboutImage.png" alt="Random image of a guy with a big phone" width={1200} height={800} />
      <div className="flex flex-col space-y-10 max-w-2xl">
        <h1 className="text-5xl font-bold">Experience Real-Time Expense Tracking for Smarter Financial Decisions</h1>
        <p className="text-xl font-light text-left max-w-5/6">
          Our real-time expense tracking feature allows you to monitor your spending as it happens. Stay on top of your
          finances and make informed decisions with ease.
        </p>
      </div>
    </div>
  );
};

export default HeroAbout;
