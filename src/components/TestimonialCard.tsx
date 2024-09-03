import React from 'react';
import { Card, CardContent } from "../components/ui/card";

interface TestimonialCardProps {
  quote: string;
  author: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author }) => {
  return (
    <Card className="border-gray-200 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer">
      <CardContent className="p-6">
        <blockquote className="text-lg mb-4">"{quote}"</blockquote>
        <p className="text-gray-600 font-semibold">- {author}</p>
      </CardContent>
    </Card>
  );
}

export default TestimonialCard;