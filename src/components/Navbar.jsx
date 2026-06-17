import React, { useState } from "react";
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

      {/* Lado Derecho: Redes Sociales */}
      <div className="navbar-social">
        {/* Usamos emojis por ahora, luego puedes cambiarlos por íconos SVG reales */}
        <a href="#instagram">📷</a>
        <a href="#tiktok">🎵</a>
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
