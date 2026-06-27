import React, { useState } from "react";
import { Link } from "react-router-dom";  // <- importamos el link 
import "./Navbar.css";

// PARTE (3 RAYITAS) adaptación para celular
function Navbar() {
  // estado para controlar el menú móvil está abierto o cerrado
  const [isOpen, setIsOpen] = useState(false);

  // función para cambiar el estado (abrir/cerrar)
  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
          <Link to="/" onClick={toggleMenu}>INICIO</Link>
        </li>
        <li className="nav-item">
          <a href="/#metodologia" onClick={toggleMenu}>NUESTRA METODOLOGÍA</a>
        </li>
        <li className="nav-item">
          <a href="/#planes" onClick={toggleMenu}>PLANES</a>
        </li>
        <li className="nav-item">
          <a href="/#sedes" onClick={toggleMenu}>SEDES▼</a>
        </li>
      </ul>

      {/* Lado Derecho: Login (Icono de Persona) */}
      <div className="navbar-login">

        <Link to="/login" title="Iniciar Sesión">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </Link>
      </div>

      {/* Botón de Hamburguesa (Solo se verá en celular) */}
      <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
}

export default Navbar;
