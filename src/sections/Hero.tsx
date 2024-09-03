import React from 'react';
import { Button } from "../components/ui/button";

const Hero: React.FC = () => {
  return (
    <section className="py-20 text-center">
      <h2 className="text-5xl font-bold mb-6">Your recipes, organized.</h2>
      <p className="text-xl mb-8 max-w-2xl mx-auto">
        Collect, organize, and cook your favorite recipes with ease. RecipeNotes brings the simplicity of note-taking to your culinary adventures.
      </p>
      <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white">
        Get Started
      </Button>
    </section>
  );
}

export default Hero;