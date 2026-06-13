import React, { useState, useEffect } from 'react';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/AdminDashboard';
import { StaffDashboard } from './pages/StaffDashboard';
import { ClientDashboard } from './pages/ClientDashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import './App.css';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    // Escuchamos los cambios de historial o navegación manual
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Sistema de renderizado condicional con guardianes de roles integrados
  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <Home />;
        
      case '/login':
        return <Login />;
        
      case '/admin':
        return (
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        );
        
      case '/empleado':
        return (
          <ProtectedRoute allowedRoles={['empleado', 'admin']}>
            <StaffDashboard />
          </ProtectedRoute>
        );
        
      case '/cliente':
        return (
          <ProtectedRoute allowedRoles={['cliente', 'admin']}>
            <ClientDashboard />
          </ProtectedRoute>
        );
        
      default:
        return (
          <div style={{ textAlign: 'center', marginTop: '100px', padding: '20px' }}>
            <h1 style={{ fontSize: '36px', color: 'var(--brand-red)' }}>404 - PANEL NO ENCONTRADO</h1>
            <p style={{ color: 'var(--text-muted)', margin: '15px 0 30px' }}>
              La sección a la que intentas ingresar no existe en el ecosistema de Fit-Logic.
            </p>
            <button onClick={() => window.location.href = '/'} className="btn-smart">
              Volver al Inicio ⚡
            </button>
          </div>
        );
    }
  };

  return (
    <>
      {renderPage()}
    </>
  );
}

export default App;