import React from 'react';

const Arrow: React.FC = () => {
  return (
    <svg className="w-8 h-8 text-gray-400 hidden md:block" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M5 12h14m-7-7l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default Arrow;
