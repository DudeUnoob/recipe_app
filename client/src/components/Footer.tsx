import React from 'react';

const Footer: React.FC = () => {
  return (
    // Text-gray 500 and bg-gray-50 for the landing page
    // Text-gray 500 and bg-gray 100 for the about page
    <footer className="mx-auto px-4 py-12 text-center text-gray-500 bg-gray-100">
      <p className="text-lg">&copy; {new Date().getFullYear()} RecipeNotes. All rights reserved.</p>
    </footer>
  );
};

export default Footer;