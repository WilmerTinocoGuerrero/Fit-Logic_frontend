import './Features.css';

function Features() {
  return (
    <section className="features-section" id="metodologia">
      
      {/* Encabezado de la sección */}
      <div className="features-header">
        <div className="icon-timer">⏱️</div>
        <h2>TU TIEMPO ES VALIOSO</h2>
        <p>
          Somos un gimnasio boutique exclusivo donde cada sesión dura solo 50 minutos 
          y está optimizada para llevarte al máximo de forma eficiente.
        </p>
      </div>

      <div className="features-subheader">
        <h3>UNA EXPERIENCIA DE ENTRENAMIENTO 360 EN UN SOLO LUGAR</h3>
      </div>

      {/* Contenedor de las 3 tarjetas */}
      <div className="features-cards-container">
        
        {/* Tarjeta 1 */}
        <div className="feature-card">
          <div className="card-image app-img"></div>
          <h4>APP FITNESS</h4>
        </div>

        {/* Tarjeta 2 */}
        <div className="feature-card">
          <div className="card-image trainer-img"></div>
          <h4>FRECUENTE MOTIVACIÓN</h4>
        </div>

        {/* Tarjeta 3 */}
        <div className="feature-card">
          <div className="card-image equip-img"></div>
          <h4>EQUIPAMIENTO DE PRIMERA</h4>
        </div>

      </div>
    </section>
  );
}

export default Features;