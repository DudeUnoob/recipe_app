import React from 'react';
import TestimonialCard from '../components/TestimonialCard';

const Testimonials: React.FC = () => {
  return (
    <section className="py-20">
      <h2 className="text-4xl font-bold mb-12 text-center">What our users say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <TestimonialCard
          quote="RecipeNotes has completely transformed how I organize my recipes. It's so intuitive and easy to use!"
          author="Bruh 1"
        />
        <TestimonialCard
          quote="I love how I can easily share recipes with my family. It's made our family cookbook digital!"
          author="Memelord"
        />
        <TestimonialCard
          quote="The search feature is a game-changer. I can find any recipe in seconds!"
          author="Bryson Tiller"
        />
      </div>
    </section>
  );
}

export default Testimonials;