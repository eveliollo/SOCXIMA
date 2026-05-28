import React, { useState } from 'react';
import { TrendingUp, Wallet, Send } from 'lucide-react';
import '../styles/pages/Dashboard.css';

function Dashboard() {
  const [balance, setBalance] = useState(1250.50);
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'Recibido', amount: '+500 SOL', date: '2025-05-28' },
    { id: 2, type: 'Enviado', amount: '-150 SOL', date: '2025-05-27' },
    { id: 3, type: 'Recibido', amount: '+250 SOL', date: '2025-05-26' },
  ]);

  return (
    <div className="dashboard">
      <h1>📊 Panel de Control</h1>
      
      <div className="dashboard-grid">
        <div className="card card-balance">
          <div className="card-header">
            <Wallet className="card-icon" />
            <h3>Saldo Total</h3>
          </div>
          <div className="card-amount">${balance.toFixed(2)}</div>
          <p className="card-subtitle">SOL en tu billetera</p>
        </div>

        <div className="card card-stats">
          <div className="card-header">
            <TrendingUp className="card-icon" />
            <h3>Cambio 24h</h3>
          </div>
          <div className="card-amount">+12.5%</div>
          <p className="card-subtitle">Ganancias estimadas</p>
        </div>

        <div className="card card-action">
          <button className="btn-action">📤 Enviar</button>
          <button className="btn-action">📥 Recibir</button>
          <button className="btn-action">💱 Intercambiar</button>
        </div>
      </div>

      <div className="transactions-section">
        <h2>Transacciones Recientes</h2>
        <div className="transactions-list">
          {transactions.map(tx => (
            <div key={tx.id} className="transaction-item">
              <div className="tx-info">
                <span className="tx-type">{tx.type}</span>
                <span className="tx-date">{tx.date}</span>
              </div>
              <span className={`tx-amount ${tx.type === 'Recibido' ? 'positive' : 'negative'}`}>
                {tx.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;