import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              About RecipeNotes
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Empowering home cooks to organize, create, and share culinary masterpieces.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;