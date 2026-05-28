import React, { useState } from 'react';
import { Shield, Users, Settings } from 'lucide-react';
import '../styles/pages/Admin.css';

function Admin() {
  const [adminUsers, setAdminUsers] = useState([
    { id: 1, name: 'Evelio Llovera', role: 'Super Admin', status: 'Activo' },
    { id: 2, name: 'Usuario Admin', role: 'Moderador', status: 'Activo' },
  ]);

  return (
    <div className="admin">
      <h1>🛡️ Panel de Administración</h1>
      
      <div className="admin-stats">
        <div className="stat-card">
          <Shield className="stat-icon" />
          <div>
            <h3>Usuarios Activos</h3>
            <p className="stat-value">1,247</p>
          </div>
        </div>
        <div className="stat-card">
          <Users className="stat-icon" />
          <div>
            <h3>Transacciones</h3>
            <p className="stat-value">5,892</p>
          </div>
        </div>
        <div className="stat-card">
          <Settings className="stat-icon" />
          <div>
            <h3>Volumen 24h</h3>
            <p className="stat-value">$2.5M</p>
          </div>
        </div>
      </div>

      <div className="admin-section">
        <h2>Administradores</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {adminUsers.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td><span className="status-badge">{user.status}</span></td>
                <td>
                  <button className="action-btn">Editar</button>
                  <button className="action-btn danger">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="admin-section">
        <h2>Configuración del Sistema</h2>
        <div className="settings-form">
          <label>
            <span>Modo Mantenimiento</span>
            <input type="checkbox" />
          </label>
          <label>
            <span>Requerir 2FA</span>
            <input type="checkbox" defaultChecked />
          </label>
          <button className="btn btn-primary">💾 Guardar Cambios</button>
        </div>
      </div>
    </div>
  );
}

export default Admin;