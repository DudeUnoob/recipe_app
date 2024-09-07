import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="container mx-auto px-4 py-8 text-center text-gray-500">
      <p>&copy; {new Date().getFullYear()} RecipeNotes. All rights reserved.</p>
    </footer>
  );
};

export default Footer;