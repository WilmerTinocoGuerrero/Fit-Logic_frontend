import './Footer.css';

function Footer() {
  return (
    <footer className="footer-section" id="sedes">
      
      {/* Sección: Sigue Navegando (Sedes) */}
      <div className="sedes-container">
        <h3 className="sedes-title">SIGUE NAVEGANDO</h3>
        
        <div className="sede-card-horizontal">
          <div className="sede-info">
            <h4>LINCE</h4>
            <p>Jr. Coronel Domingo Casanova 157</p>
            <a href="#mas" className="link-detalles">Más detalles</a>
            <button className="btn-yellow-solid">INCRIBIRME AHORA</button>
          </div>
          <div className="sede-imagen-bg"></div>
        </div>
        
        <div className="btn-center">
          <button className="btn-yellow-solid">VER TODAS LAS SEDES</button>
        </div>
      </div>

      {/* Sección: Enlaces Finales */}
      <div className="footer-bottom">
        <div className="footer-logo">
          <h2>FIT<span>LOGIC</span></h2>
        </div>
        
        <div className="footer-links">
          <div className="footer-column">
            <h4>POLÍTICAS Y CONSULTAS</h4>
            <ul>
              <li><a href="#">Política de Privacidad</a></li>
              <li><a href="#">Política de Cookies</a></li>
              <li><a href="#">Términos y Condiciones</a></li>
              <li><a href="#">Preguntas Frecuentes</a></li>
              <li><a href="#">Libro de Reclamaciones</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h4>SÍGUENOS EN</h4>
            <div className="social-icons">
               <a href="#">📷</a> <a href="#">🎵</a>
            </div>
          </div>
          
          <div className="footer-column newsletter">
            <h4>INSCRÍBETE PARA RECIBIR NUESTRAS ÚLTIMAS ACTUALIZACIONES</h4>
            <input type="email" placeholder="Email" className="email-input" />
            <button className="btn-yellow-solid btn-full">INSCRÍBETE</button>
          </div>
        </div>
      </div>
      
    </footer>
  );
}

export default Footer;