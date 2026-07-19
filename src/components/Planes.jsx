import './Planes.css';

function Planes() {
  return (
    <section className="planes-section" id="planes">
      
      <div className="planes-header">
        <h2>NUESTROS PLANES</h2>
        <p>Elige el plan que mejor se adapte a tus objetivos. Sin letras pequeñas.</p>
      </div>

      <div className="planes-container">
        
        {/* Tarjeta Plan Básico - S/ 60 */}
        <div className="plan-card">
          <div className="plan-title">
            <h3>PLAN BÁSICO</h3>
          </div>
          <div className="plan-desc">
            Entrena en tu sede principal con acceso a todas las máquinas.
          </div>
          <div className="plan-price">
            <span className="currency">S/</span> 80<span className="month">/mes</span>
          </div>
          <ul className="plan-features">
            <li>✔️ Acceso a zona de musculación y cardio</li>
            <li>✔️ Vestidores y duchas</li>
            <li className="disabled">❌ Invitado mensual</li>
            <li className="disabled">❌ Acceso limitado</li>
          </ul>
          <button className="btn-plan-outline">ELEGIR PLAN</button>
        </div>

        {/* Tarjeta Plan VIP - S/ 90 (Destacada) */}
        <div className="plan-card plan-destacado">
          <div className="badge-ventajoso">EL MÁS VENTAJOSO</div>
          <div className="plan-title">
            <h3>PLAN PREMIUM</h3>
          </div>
          <div className="plan-desc">
            Entrena en cualquier sede y obtén beneficios exclusivos.
          </div>
          <div className="plan-price">
            <span className="currency">S/</span> 120<span className="month">/mes</span>
          </div>
          <ul className="plan-features">
            <li>✔️ Acceso a TODAS las zonas y máquinas especializadas</li>
            <li>✔️ Vestidores y duchas</li>
            <li>✔️ Ejercicios para zonas especificas</li>
            <li>✔️ Seguimiento de cargas y corrección técnica cercana</li>
            <li>✔️ Trae a 1 amigo invitado al mes</li>
            <li>✔️ TODAS las ventajas del programa Fit-Logic</li>
          </ul>
          <button className="btn-plan-solid">ELEGIR PLAN</button>
        </div>

      </div>
    </section>
  );
}

export default Planes;