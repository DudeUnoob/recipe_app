import React from 'react';
import { Button } from "../components/ui/button";

const CallToAction: React.FC = () => {
  return (
    <section className="py-20 text-center">
      <h2 className="text-4xl font-bold mb-6">Start cooking smarter today</h2>
      <p className="text-xl mb-8 max-w-2xl mx-auto">
        Join thousands of home cooks and food enthusiasts who are revolutionizing their recipe management.
      </p>
      <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white">
        Sign Up Now
      </Button>
    </section>
  );
}

export default CallToAction;