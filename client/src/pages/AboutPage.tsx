import React from 'react';
import HeroSection from '../components/AboutPage/HeroSection';
import MissionSection from '../components/AboutPage/MissionSection';
import TeamSection from '../components/AboutPage/TeamSection';
import JoinSection from '../components/AboutPage/JoinSection';
import Footer from '../components/Footer';


const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-20 pb-16">
        <HeroSection />
        <MissionSection />
        <TeamSection />
        <JoinSection />
      </main>
      <Footer />

    </div>
  );
};

export default AboutPage;