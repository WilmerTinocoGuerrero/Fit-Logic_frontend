import React from 'react';
import './PublicNavbar.css';

export const PublicNavbar = () => {
  const navegar = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <nav className="public-navbar">
      <div className="nav-brand" onClick={() => navegar('/')}>
        <span className="nav-brand-logo">⚡</span>
        <h1 className="nav-brand-text">FIT-<span>LOGIC</span></h1>
      </div>

      <div className="nav-links">
        <button onClick={() => {
          document.getElementById('nosotros-section')?.scrollIntoView({ behavior: 'smooth' });
        }} className="nav-link-item">Nosotros</button>

        <button onClick={() => {
          document.getElementById('contacto-section')?.scrollIntoView({ behavior: 'smooth' });
        }} className="nav-link-item">Contáctanos</button>

        <button onClick={() => navegar('/login')} className="btn-smart btn-nav-login">
          Iniciar Sesión
        </button>
      </div>
    </nav>
  );
};