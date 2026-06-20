import React, {useState, useEffect} from 'react';
import './Hero.css';


function Hero() {

// 1. array con los urls de las imágenes del carrusel
 const images = [
   'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop',
   'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
   'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1075&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
 ];

//  Estado para saber qué foto se está mostrando (inicia en la 0) 
 const [currentIndex, setCurrentIndex] = useState(0);


// efecto para cambiar la foto cada 5 segundos
 useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); 
      return () => clearInterval(interval); // limpiar el intervalo al desmontar
  }, [images.length]); 



  return (
    <section 
      className="hero"
      // Inyectamos la imagen de fondo dinámicamente según el currentIndex
      style={{ 
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.9) 10%, rgba(0, 0, 0, 0.3) 100%), url('${images[currentIndex]}')` 
      }}
    >
      <div className="hero-content">
        <h1>
          VIVE LA EXPERIENCIA <br />
          <span className="text-yellow">DE ENTRENAR</span> <br />
          EN EL GYM MÁS <br />
          <span className="text-yellow">EXCLUSIVO DE LIMA</span>
        </h1>
        <button className="btn-outline-yellow">
          CONOCE MÁS <span className="arrow-right">►</span>
        </button>
      </div>

      {/* 4. Indicadores visuales (los puntitos de abajo) */}
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <span 
            key={index} 
            className={`dot ${currentIndex === index ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)} // Permite cambiar de foto al hacer clic en el punto
          ></span>
        ))}
      </div>
    </section>
  );
}
export default Hero;