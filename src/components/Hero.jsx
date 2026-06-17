import { useState, useEffect } from 'react';
import './Hero.css';

// Array con las 3 imágenes para el slider
const images = [
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1470&auto=format&fit=crop"
];

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Este efecto hace que la imagen cambie cada 5000 milisegundos (5 segundos)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval); // Limpiamos el intervalo por seguridad
  }, []);

  return (
    <section className="hero">
      
      {/* Contenedor de las imágenes del slider */}
      {images.map((img, index) => (
        <div 
          key={index}
          className={`hero-slide ${index === currentIndex ? 'active' : ''}`}
          style={{ backgroundImage: `url('${img}')` }}
        ></div>
      ))}
      
      {/* Capa oscura (gradiente) sobre el slider para que resalte el texto */}
      <div className="hero-overlay"></div>

      {/* Contenido principal */}
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