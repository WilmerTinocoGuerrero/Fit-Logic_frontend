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
        <li><a href="#metodologia">METODOLOGÍA</a></li>
        <li><a href="#planes">PLANES</a></li>
        <li><a href="#sedes">SEDES <span className="arrow">▼</span></a></li>
      </ul>

      {/* Lado Derecho: Redes Sociales */}
      <div className="navbar-social">
        {/* Usamos emojis por ahora, luego puedes cambiarlos por íconos SVG reales */}
        <a href="#instagram">📷</a>
        <a href="#tiktok">🎵</a>
      </div>
    </nav>
  );
}

export default Navbar;