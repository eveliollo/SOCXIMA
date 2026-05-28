import React from 'react';
import '../styles/pages/NotFound.css';

function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1>404</h1>
        <p>Página no encontrada</p>
        <a href="/" className="btn btn-primary">Volver al inicio</a>
      </div>
    </div>
  );
}

export default NotFound;
