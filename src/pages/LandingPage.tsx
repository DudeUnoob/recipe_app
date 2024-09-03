import React from 'react';
import Header from '../sections/Header';
import Hero from '../sections/Hero';
import Features from '../sections/Features';
import Testimonials from '../sections/Testimonials';
import CallToAction from '../sections/CallToAction';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <Header />
      <main className="container mx-auto px-4">
        <Hero />
        <Features />
        <Testimonials />
        <CallToAction />
      </main>
      <footer className="container mx-auto px-4 py-8 text-center text-gray-500">
        <p>&copy; 2023 RecipeNotes. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;