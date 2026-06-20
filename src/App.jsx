import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Planes from './components/Planes'; // <-- Importamos el componente
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="contenedor-principal">
      <Navbar />
      <Hero />
      <Features />
      <Planes /> {/* <-- Lo colocamos antes del Footer */}
      <Footer />
    </div>
  );
}

export default App;