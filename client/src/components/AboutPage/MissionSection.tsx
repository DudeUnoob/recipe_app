import React from 'react';
import { ChefHat, Book, Users } from "lucide-react";
import { Card, CardContent } from '../ui/card';

interface MissionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const MissionCard: React.FC<MissionCardProps> = ({ icon, title, description }) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex items-center space-x-4">
        {icon}
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>
      <p className="mt-4 text-gray-500">{description}</p>
    </CardContent>
  </Card>
);

const MissionSection: React.FC = () => {
  const missionData = [
    {
      icon: <ChefHat className="w-10 h-10 text-gray-900" />,
      title: "Our Mission",
      description: "To simplify recipe management and inspire culinary creativity in kitchens around the world."
    },
    {
      icon: <Book className="w-10 h-10 text-gray-900" />,
      title: "Our Story",
      description: "Founded by food enthusiasts, RecipeNotes grew from a passion for cooking and a need for better recipe organization."
    },
    {
      icon: <Users className="w-10 h-10 text-gray-900" />,
      title: "Our Community",
      description: "Join thousands of home cooks sharing recipes, tips, and culinary inspiration."
    }
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {missionData.map((item, index) => (
            <MissionCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionSection;