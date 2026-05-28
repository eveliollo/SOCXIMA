import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import AI from './pages/AI';
import Marketplace from './pages/Marketplace';
import './styles/App.css';

function App() {
  return (
    <Router basename="/SOCXIMA/SOCXIMA-CORE/">
      <div className="app-container">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/ia" element={<AI />} />
          <Route path="/mercado" element={<Marketplace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;