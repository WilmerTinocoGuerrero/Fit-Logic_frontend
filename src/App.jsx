import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Login from './components/Login';
import Features from './components/Features';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="contenedor-principal">
      <Navbar />
      <Hero />
      <Login />
      <Features />
      <Footer />
    </div>
  );
}

export default App;