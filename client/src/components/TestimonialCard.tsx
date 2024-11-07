import React from 'react';
import { Card } from './ui/card_main';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  rating: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, rating }) => {
  return (
    <Card className="border-gray-200 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer">
      <div className="p-6">
        <div className="flex mb-4">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" />
          ))}
        </div>
        <blockquote className="text-lg mb-4">"{quote}"</blockquote>
        <p className="text-gray-600 font-semibold">- {author}</p>
      </div>
    </Card>
  );
};

export default TestimonialCard;
