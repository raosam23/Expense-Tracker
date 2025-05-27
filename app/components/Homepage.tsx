import React from 'react';
import HeroSection from './HeroSection';
import HeroSubSection from './HeroSubSection';
import HeroAbout from './HeroAbout';
import HeroFeatures from './HeroFeatures';
import HeroSignUp from './HeroSignUp';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <HeroSubSection />
      <HeroAbout />
      <HeroFeatures />
      <HeroSignUp />
    </>
  );
};
export default HomePage;
