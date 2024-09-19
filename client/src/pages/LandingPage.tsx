//import React from 'react';
import  { Button }  from '../components/ui/button';
import FeatureCard  from '../components/FeatureCard';
import  TestimonialCard from '../components/TestimonialCard';
import StepCard  from '../components/StepCard';
import  Arrow  from '../components/Arrow';
import { BookOpen, Utensils, Users, Search, Star, ChefHat, Leaf } from 'lucide-react';
import Footer from '../components/Footer';
//import { useAuth } from "../contexts/AuthContext"
//  const { user, loading, signOut } = useAuth()
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { BookOpen, Utensils, Users, Search, Star, Clock, ChefHat, Leaf } from "lucide-react"
export default function LandingPage() {
  // const { user, loading, signOut } = useAuth()
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <main className="pt-20"> {/* Added top padding to account for fixed navbar */}
        <section className="w-full py-20 text-center relative bg-gray-900 text-white">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,0 L100,0 L100,100 Z" fill="currentColor" />
            </svg>
          </div>
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-5xl font-bold mb-6">Your recipes, organized.</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Collect, organize, and cook your favorite recipes with ease. RecipeNotes brings the simplicity of note-taking to your culinary adventures.
            </p>
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
              Get Started
            </Button>
            <div className="mt-12 flex justify-center space-x-8">
              <div className="flex items-center">
                <Star className="w-6 h-6 text-yellow-500 mr-2" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center">
                <Users className="w-6 h-6 text-blue-500 mr-2" />
                <span>10k+ Users</span>
              </div>
              <div className="flex items-center">
                <Utensils className="w-6 h-6 text-green-500 mr-2" />
                <span>50k+ Recipes</span>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Features that simplify your cooking journey</h2>
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
          </div>
        </section>

        <section className="w-full py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">How RecipeNotes works</h2>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-12">
              <StepCard number={1} icon={<BookOpen className="w-8 h-8" />} title="Collect Recipes" />
              <Arrow />
              <StepCard number={2} icon={<Leaf className="w-8 h-8" />} title="Organize & Tag" />
              <Arrow />
              <StepCard number={3} icon={<ChefHat className="w-8 h-8" />} title="Cook & Enjoy" />
            </div>
          </div>
        </section>

        <section className="w-full py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">What our users say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TestimonialCard
                quote="Where was RecipeNotes all the time I've been away?"
                author="Brent Faiyaz"
                rating={5}
              />
              <TestimonialCard
                quote="Let Em' Know it's my kitchen now"
                author="Bryson Tiller"
                rating={5}
              />
              <TestimonialCard
                quote="I always get superpowers from using RecipeNotes"
                author="Daniel Caesar"
                rating={4}
              />
            </div>
          </div>
        </section>

        <section className="w-full py-20 text-center relative overflow-hidden bg-gray-900 text-white">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,0 C40,30 60,70 100,100 L0,100 Z" fill="currentColor" />
            </svg>
          </div>
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-6">Start cooking smarter today</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of home cooks and food enthusiasts who are revolutionizing their recipe management.
            </p>
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
              Sign Up Now
            </Button>
          </div>
        </section>
      </main>

      {/* <footer className="w-full px-4 py-8 text-center text-gray-500 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <p>&copy; 2023 RecipeNotes. All rights reserved.</p>
        </div>
      </footer> */}
      <Footer />
    </div>
  )
}