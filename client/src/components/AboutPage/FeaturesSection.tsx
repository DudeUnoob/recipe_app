import React from 'react';
import { Book, ChefHat, Users, Search } from "lucide-react";
import { Card, CardContent } from '../ui/card';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <Card>
    <CardContent className="flex flex-col items-center space-y-2 p-6">
      {icon}
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-sm text-gray-500 text-center">{description}</p>
    </CardContent>
  </Card>
);

const FeaturesSection: React.FC = () => {
  const features = [
    { icon: <Book className="h-12 w-12 text-gray-900" />, title: "Recipe Collection", description: "Easily save and organize all your favorite recipes in one place." },
    { icon: <ChefHat className="h-12 w-12 text-gray-900" />, title: "Cooking Mode", description: "Step-by-step instructions optimized for the kitchen experience." },
    { icon: <Users className="h-12 w-12 text-gray-900" />, title: "Share & Collaborate", description: "Share recipes with friends and family, collaborate on meal plans." },
    { icon: <Search className="h-12 w-12 text-gray-900" />, title: "Smart Search", description: "Find any recipe instantly with our powerful search feature." },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
          Why Choose RecipeNotes?
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;