import React, { useState } from "react";
import "./Navbar.css";

// PARTE (3 RAYITAS) adaptación para celular
function Navbar() {
  // estado para controlar el menú móvil está abierto o cerrado
  const [isOpen, setIsOpen] = useState(false);

  // Estados para los modales de autenticación
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // Estados para el usuario logeado (Simulando base de datos por ahora)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userData, setUserData] = useState({ username: '', rol: '' });

  // función para cambiar el estado (abrir/cerrar)
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Función para simular el inicio de sesión
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Aquí a futuro harás la consulta SELECT a tu base de datos.
    setUserData({ username: 'admin01', rol: 'Admin' }); 
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData({ username: '', rol: '' });
    setShowDropdown(false);
  };

  return (
    <nav className="navbar">
      {/* Lado Izquierdo: Logo */}
      <div className="navbar-logo">
        <h2>FIT<span>LOGIC</span></h2>
      </div>

      {/* Centro: Links de navegación */}
      <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
        <li className="nav-item">
          <a href="#inicio" onClick={toggleMenu}>INICIO</a>
        </li>
        <li className="nav-item">
          <a href="#metodologia" onClick={toggleMenu}>NUESTRA METODOLOGÍA</a>
        </li>
        <li className="nav-item">
          <a href="#planes" onClick={toggleMenu}>PLANES</a>
        </li>
        <li className="nav-item">
          <a href="#sedes" onClick={toggleMenu}>SEDES▼</a>
        </li>
      </ul>

      {/* Lado Derecho: Autenticación (Login o Perfil) */}
      <div className="navbar-auth">
        {isLoggedIn ? (
          <div className="user-profile-container">
            <div 
              className="user-profile" 
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div className="user-info">
                <span className="user-greeting">Hola, <strong>{userData.username}</strong></span>
                <span className="user-role">{userData.rol}</span>
              </div>
              <div className="user-avatar">
                {/* Toma la primera letra del username para el avatar */}
                {userData.username.charAt(0).toUpperCase()}
              </div>
              <span className={`dropdown-arrow ${showDropdown ? 'up' : 'down'}`}>▼</span>
            </div>

            {/* Menú Desplegable (Cerrar sesión) */}
            {showDropdown && (
              <div className="dropdown-menu">
                <button onClick={handleLogout} className="logout-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}>
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Icono SVG original de tu compañero para el Login */
          <div className="navbar-login" onClick={() => setShowLoginModal(true)} style={{cursor: 'pointer'}} title="Iniciar Sesión">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
        )}
      </div>

      {/* Botón de Hamburguesa (Solo se verá en celular) */}
      <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      {/* MODAL DE LOGIN */}
      {showLoginModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setShowLoginModal(false)}>✕</button>
            <h3>INICIAR SESIÓN</h3>
            <p>Ingresa tus credenciales para acceder a la plataforma.</p>
            
            <form onSubmit={handleLoginSubmit} className="auth-form">
              <input type="text" placeholder="Username o Correo electrónico" required />
              <input type="password" placeholder="Contraseña" required />
              <button type="submit" className="btn-yellow">INGRESAR</button>
            </form>

            <p className="auth-switch">
              ¿Aún no estás registrado?{' '}
              <span onClick={() => { setShowLoginModal(false); setShowRegisterModal(true); }}>
                Regístrate
              </span>
            </p>
          </div>
        </div>
      )}

      {/* MODAL DE REGISTRO */}
      {showRegisterModal && (
        <div className="modal-overlay">
          <div className="modal-content register-modal">
            <button className="close-modal" onClick={() => setShowRegisterModal(false)}>✕</button>
            <h3>REGÍSTRATE</h3>
            <p>Únete a FIT-LOGIC y empieza tu transformación.</p>
            
            <form className="auth-form">
              <div className="form-row">
                <input type="text" placeholder="Nombres" required />
                <input type="text" placeholder="Apellidos" required />
              </div>
              <input type="text" placeholder="Username" required />
              <input type="email" placeholder="Correo electrónico" required />
              <input type="password" placeholder="Contraseña" required />
              <button type="button" className="btn-yellow">REGISTRARSE</button>
            </form>

            <p className="auth-switch">
              ¿Ya tienes cuenta?{' '}
              <span onClick={() => { setShowRegisterModal(false); setShowLoginModal(true); }}>
                Inicia sesión
              </span>
            </p>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;