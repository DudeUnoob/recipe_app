import React from 'react';
import { Globe, Mail } from "lucide-react";
import { Button } from '../ui/button';

const JoinSection: React.FC = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Join Our Journey</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
              Be part of our mission to revolutionize recipe management and culinary exploration.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button className="inline-flex items-center justify-center">
              <Globe className="mr-2 h-4 w-4" />
              Explore Recipes
            </Button>
            <Button variant="outline" className="inline-flex items-center justify-center">
              <Mail className="mr-2 h-4 w-4" />
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinSection;