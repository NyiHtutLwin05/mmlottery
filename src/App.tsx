import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Home } from './pages/Home';
import { MyTickets } from './pages/MyTickets';
import { Account } from './pages/Account';
import { Results } from './pages/Results';
import { Navigation } from './components/Navigation';
import { Stats } from './components/Stats';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Navigation />
        <Stats />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/my-tickets" element={<MyTickets />} />
            <Route path="/account" element={<Account />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </div>
        <Toaster position="bottom-right" />
      </div>
    </Router>
  );
}

export default App;