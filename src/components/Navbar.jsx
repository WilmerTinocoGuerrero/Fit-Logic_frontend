import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      {/* Lado Izquierdo: Logo */}
      <div className="navbar-logo">
        <h2>FIT<span>LOGIC</span></h2>
      </div>

      {/* Centro: Links de navegación */}
      <ul className="navbar-links">
        <li><a href="#inicio" className="active">INICIO</a></li>
        <li><a href="#metodologia">NUESTRA METODOLOGÍA</a></li>
        <li><a href="#planes">PLANES</a></li>
        <li><a href="#sedes">SEDES <span className="arrow">▼</span></a></li>
      </ul>

      {/* Lado Derecho: Login (Icono de Persona) */}
      <div className="navbar-login">
        <a href="#login" title="Iniciar Sesión">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </a>
      </div>
    </nav>
  );
}

export default Navbar;