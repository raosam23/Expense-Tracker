import Image from 'next/image';
import React from 'react';

const HeroFeatures = () => {
  return (
    <div className="flex flex-row justify-around items-center my-10 space-x-20">
      <div className="flex flex-col space-y-10 max-w-2xl">
        <h1 className="text-5xl font-bold">Effortlessly Categorize Your Income with Our Automated System</h1>
        <p className="text-xl font-light text-left max-w-5/6">
          Say goodbye to manual tracking! Our automated income categorization feature intelligently sorts your earnings,
          making it easier to manage your finances.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-lg">
          <li>Save time and reduce errors in tracking income.</li>
          <li>Get insights into your income sources effortlessly.</li>
          <li>Stay organized and in control of your finances.</li>
        </ul>
      </div>
      <Image
        src="/images/HeroFeaturesImage.png"
        alt="Random image of a guy with statistics"
        width={1200}
        height={800}
      />
    </div>
  );
};

export default HeroFeatures;
