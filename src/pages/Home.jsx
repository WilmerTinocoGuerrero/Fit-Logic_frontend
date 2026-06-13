import React from 'react';
import { PublicNavbar } from '../components/PublicNavbar';
import './Home.css';

export const Home = () => {
  const irAlLogin = () => {
    window.history.pushState({}, '', '/login');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="home-wrapper">
      {/* 🆕 Inyección de la barra superior comercial */}
      <PublicNavbar />

      {/* SECCIÓN HERO */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Entrena a otro nivel en <span>Fit-Logic</span></h1>
          <p className="hero-text">
            Infraestructura premium, rutinas automatizadas y un sistema inteligente diseñado para romper tus límites. Tu evolución física empieza aquí.
          </p>
          <button onClick={irAlLogin} className="btn-smart">
            Ingresar al Centro de Control ⚡
          </button>
        </div>
        <div className="hero-image-container">
          <img src="/src/assets/hero.png" alt="Fit-Logic Gym" className="hero-img" />
        </div>
      </section>

      {/* SECCIÓN DE PLANES */}
      <section className="plans-section">
        <h2>CONOCE NUESTROS PLANES</h2>
        <p style={{ color: 'var(--text-muted)' }}>Matricúlate en la sede Cerro Blanco e inicia tu entrenamiento.</p>
        
        <div className="plans-grid">
          <div className="smart-card plan-card">
            <h3>PLAN BÁSICO</h3>
            <p className="plan-price">S/. 79 / mes</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Acceso libre a sala de musculación sin asistencia de rutina.</p>
          </div>
          
          <div className="smart-card plan-card featured">
            <h3>PLAN INTERMEDIO</h3>
            <p className="plan-price">S/. 119 / mes</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Acceso total + Plan de rutinas estándar precargadas en tu app web.</p>
          </div>
          
          <div className="smart-card plan-card">
            <h3>PLAN VIP</h3>
            <p className="plan-price">S/. 199 / mes</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Seguimiento antropométrico avanzado, rutinas personalizadas y asesoría.</p>
          </div>
        </div>
      </section>

      {/* 🆕 SECCIÓN NOSOTROS */}
      <section id="nosotros-section" className="smart-card" style={{ maxWidth: '1120px', margin: '60px auto', padding: '40px' }}>
        <h2 style={{ color: 'var(--brand-yellow)', marginBottom: '15px', fontWeight: '800' }}>NOSOTROS</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '16px' }}>
          En <strong>Fit-Logic</strong> rompemos el molde tradicional de los gimnasios. Nos enfocamos en ofrecer una experiencia integrada de alta gama donde la tecnología y el entrenamiento de fuerza convergen. Desde nuestra sede en Cerro Blanco, dotamos a cada uno de nuestros atletas con herramientas digitales para el seguimiento estricto de sus planes físicos y su facturación, garantizando una evolución real paso a paso.
        </p>
      </section>

      {/* 🆕 SECCIÓN CONTÁCTANOS */}
      <section id="contacto-section" style={{ backgroundColor: '#111115', padding: '60px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '10px', fontWeight: '800' }}>¿TIENES ALGUNA DUDA?</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Escríbenos y nuestro equipo te responderá a la brevedad.</p>
          
          <form onSubmit={(e) => { e.preventDefault(); alert('¡Mensaje enviado con éxito! Nos comunicaremos contigo.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input type="text" placeholder="Tu Nombre Completo" required />
            <input type="email" placeholder="Tu Correo Electrónico" required />
            <textarea rows="4" placeholder="¿En qué podemos ayudarte?" required style={{ resize: 'none' }}></textarea>
            <button type="submit" className="btn-smart" style={{ width: '100%' }}>Enviar Mensaje ✉️</button>
          </form>
        </div>
      </section>
    </div>
  );
};