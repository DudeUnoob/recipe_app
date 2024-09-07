import React from 'react';

interface StepCardProps {
  number: number;
  icon: React.ReactNode;
  title: string;
}

const StepCard: React.FC<StepCardProps> = ({ number, icon, title }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 rounded-full bg-gray-900 text-white flex items-center justify-center mb-4">
        {icon}
      </div>
      <div className="text-xl font-semibold">{title}</div>
      <div className="text-gray-600">Step {number}</div>
    </div>
  );
};

export default StepCard;
