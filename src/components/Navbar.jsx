import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";  // <- importamos el link   <--- implementamos (useNavigate) para "Mostrar el nombre del Cliente"
import "./Navbar.css";

// PARTE (3 RAYITAS) adaptación para celular
function Navbar() {
  // estado para controlar el menú móvil está abierto o cerrado
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // 1. leemos si hay un usuario guardado en la memoria del navegador
  const nombreUsuario = localStorage.getItem('usuario_nombre');

  // función para cambiar el estado (abrir/cerrar)
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // 2. función para destruir el token y cerrar la sesión
  const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario_nombre');
    localStorage.removeItem('usuario_rol');

  // forzamos una recarga limpia llevándolo al inicio
  navigate('/');
  window.location.reload();
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

      {/* Lado Derecho: Dinámico (Icono Login O Nombre del Usuario) */}
      <div className="navbar-login" style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        
        {nombreUsuario ? (
          /* SI ESTÁ LOGUEADO: Mostramos su nombre y botón de salir */
          <>
            <span style={{ color: "#c6ff00", fontWeight: "bold", fontSize: "1rem" }}>
              Hola, {nombreUsuario.split(' ')[0]} {/* Solo muestra el primer nombre */}
            </span>
            <button 
              onClick={cerrarSesion} 
              style={{ background: "transparent", border: "1px solid white", color: "white", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}
            >
              Salir
            </button>
        
             <Link to="/dashboard">
              <button style={{ background: "white", color: "black", border: "none", padding: "5px 10px", borderRadius: "5px", fontWeight: "bold", cursor: "pointer" }}>
                MI PANEL
              </button>
            </Link>
          </>
        ) : (
          /* SI NO ESTÁ LOGUEADO: Mostramos el icono de siempre */
          <Link to="/login" title="Iniciar Sesión">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </Link>
        )}

      </div>

      {/* Botón de Hamburguesa (Solo celular) */}
      <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
}

export default Navbar;
