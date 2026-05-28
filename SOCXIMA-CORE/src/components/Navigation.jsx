import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import '../styles/Navigation.css';

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">◆</span>
          SOCXIMA
        </Link>
        
        <button className="menu-toggle" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>
              🏠 Inicio
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link" onClick={() => setIsOpen(false)}>
              📊 Panel
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/mercado" className="nav-link" onClick={() => setIsOpen(false)}>
              💱 Mercado
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/ia" className="nav-link" onClick={() => setIsOpen(false)}>
              🤖 IA
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin" className="nav-link" onClick={() => setIsOpen(false)}>
              🛡️ Admin
            </Link>
          </li>
          <li className="nav-item">
            <button className="btn-connect">Conectar Wallet</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;