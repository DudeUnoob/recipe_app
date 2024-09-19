import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Github, Twitter, Linkedin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <ChefHat className="h-6 w-6" />
            <span className="text-lg font-bold">RecipeNotes</span>
          </div>
          <p className="text-sm text-gray-500">© 2023 RecipeNotes. All rights reserved.</p>
          <div className="flex gap-4">
            <Link className="text-gray-500 hover:text-gray-900" to="#">
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link className="text-gray-500 hover:text-gray-900" to="#">
              <Twitter className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link className="text-gray-500 hover:text-gray-900" to="#">
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;