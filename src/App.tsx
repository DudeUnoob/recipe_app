import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div className="App">
        
        <Routes>
          <Route path="/" element={<LandingPage />} />

        </Routes>
        
      </div>

    </Router>
  );
};

export default App;