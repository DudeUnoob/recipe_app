import React from 'react';
import FeatureCard from '../components/FeatureCard';
import { BookOpen, Utensils, Users, Search } from "lucide-react";

const Features: React.FC = () => {
  return (
    <section className="py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <FeatureCard
          icon={<BookOpen className="w-6 h-6" />}
          title="Recipe Collection"
          description="Save and organize all your recipes in one place."
        />
        <FeatureCard
          icon={<Utensils className="w-6 h-6" />}
          title="Cooking Mode"
          description="Step-by-step instructions optimized for the kitchen."
        />
        <FeatureCard
          icon={<Users className="w-6 h-6" />}
          title="Share & Collaborate"
          description="Share recipes with friends and family effortlessly."
        />
        <FeatureCard
          icon={<Search className="w-6 h-6" />}
          title="Smart Search"
          description="Find any recipe instantly with powerful search."
        />
      </div>
    </section>
  );
}

export default Features;