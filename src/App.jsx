import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Planes from './components/Planes'; // <-- Importamos el componente
import Footer from './components/Footer';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="contenedor-principal">
        {/* El Navbar queda fuera de <Routes> porque queremos que el menú 
            superior se vea siempre, tanto en el inicio como en el login */}
      <Navbar />

      <Routes>
          {/* Ruta Principal (/): Agrupamos todos los componentes de tu Landing Page */}
       <Route
         path="/"
         element={
          <>
             <Hero />
             <Features />
             <Planes /> {/* <-- Lo colocamos antes del Footer */}
             <Footer />
            </>
         }
      />

          {/* Ruta del Login (/login): Aquí solo cargará el formulario de Bootstrap */}
          <Route path="/login" element={<Login />} />

          {/*Ruta del Registro (/registro) */}
          <Route path="/registro" element={<Registro />} />

          {/*Ruta del Dashboard (/dashboard) */}
          <Route path="/dashboard" element={<Dashboard />} />
       </Routes>
     </div>
   </Router>
  );
}

export default App;