import React from 'react';

interface  Footer {
  page: string;
}

const Footer: React.FC<Footer> = ({ page }) => {
  return (
    // Text-gray 500 and bg-gray-50 for the landing page
    // Text-gray 500 and bg-gray 100 for the about page
    <footer className={page == "About" ? "mx-auto px-4 py-12 text-center text-gray-500 bg-gray-100"  : "mx-auto px-4 py-12 text-center text-gray-500 bg-gray-50"}>
      <p className="text-lg">&copy; {new Date().getFullYear()} RecipeNotes. All rights reserved.</p>
    </footer>
  );
};

export default Footer;