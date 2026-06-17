import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          VIVE LA EXPERIENCIA <br />
          <span className="text-yellow">DE ENTRENAR</span> <br />
          EN EL GYM MÁS <br />
          EXCLUSIVO DE LIMA
        </h1>
        <button className="btn-outline-yellow">
          CONOCE MÁS <span className="arrow-right">►</span>
        </button>
      </div>
    </section>
  );
}

export default Hero;