import React from 'react';

interface propTypes {
  emoji: string;
  heading: string;
}

const CardHeroSubSection = ({ emoji, heading, children }: React.PropsWithChildren<propTypes>) => {
  return (
    <div className="flex flex-col my-5 max-w-8/12">
      <div className="text-5xl mb-2.5 text-center">{emoji}</div>
      <h3 className="text-2xl font-bold mb-2 text-center">{heading}</h3>
      <p className="text-lg font-light text-center">{children}</p>
    </div>
  );
};

export default CardHeroSubSection;
