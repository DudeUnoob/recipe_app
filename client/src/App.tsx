import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';
import { AuthPages } from './components/auth-pages';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AboutPage from './pages/AboutPage';
import RecipesPage from './pages/RecipesPage';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path='/login' element={<AuthPages />}/>
            <Route path='/signup' element={<AuthPages />}/>
            <Route path='/about' element={<AboutPage />}/>
            <Route element={<ProtectedRoute />}>
              <Route path='/dashboard' element={<Dashboard />}/>
              <Route path='/recipes' element={<RecipesPage />} />
              {/* Add other protected routes here */}
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;