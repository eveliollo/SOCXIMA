import React from 'react';
import { Zap, Lock, Rocket } from 'lucide-react';
import '../styles/pages/Home.css';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="glow">SOCXIMA</span>
            <br />
            Plataforma P2P Descentralizada
          </h1>
          <p className="hero-subtitle">Blockchain Solana | Transacciones Seguras | Sin Intermediarios</p>
          <div className="hero-buttons">
            <button className="btn btn-primary">🚀 Comenzar Ahora</button>
            <button className="btn btn-secondary">📚 Aprender Más</button>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Características Principales</h2>
        <div className="features-grid">
          <div className="feature-card">
            <Zap className="feature-icon" />
            <h3>Velocidad Cuántica</h3>
            <p>Transacciones instantáneas en Solana</p>
          </div>
          <div className="feature-card">
            <Lock className="feature-icon" />
            <h3>100% Seguro</h3>
            <p>Encriptación de nivel militar</p>
          </div>
          <div className="feature-card">
            <Rocket className="feature-icon" />
            <h3>Descentralizado</h3>
            <p>Sin servidores centralizados</p>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>¿Listo para el futuro?</h2>
        <button className="btn btn-large">🔗 Conectar Wallet Ahora</button>
      </section>
    </div>
  );
}

export default Home;