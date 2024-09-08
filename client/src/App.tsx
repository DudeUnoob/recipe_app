import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Session } from '@supabase/supabase-js';
import { supabase } from './lib/supabase';
import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';
import { AuthPages } from './components/auth-pages';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './contexts/AuthContext';

const App: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <Router>
      <AuthProvider>
      <Navbar session={session} />
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path='/login' element={<AuthPages />}/>
          <Route path='/signup' element={<AuthPages />}/>
          {/* <Route path='/dashboard' element={<Dashboard session={session} />}/> */}
        </Routes>
      </div>
      </AuthProvider>
    </Router>
  );
};

export default App;