import React, { useState } from 'react';
import { loginSimulado } from '../services/mockAuth'; // 🚀 Importamos el servicio simulado
import { FeedbackLabel } from '../components/FeedbackLabel';
import './Login.css';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', type: 'success' });

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      setFeedback({ message: '⚠️ Por favor, ingresa tu usuario y contraseña.', type: 'error' });
      return;
    }

    setLoading(true);

    try {
      // Llamamos a nuestro archivo de credenciales aparte usando promesas asíncronas
      const perfilUsuario = await loginSimulado(username.trim(), password);

      setFeedback({ message: '🎉 ¡Acceso autorizado! Redireccionando...', type: 'success' });

      // Guardamos la sesión de forma automática en el LocalStorage
      localStorage.setItem('usuario_fitlogic', JSON.stringify(perfilUsuario));

      // Redirección limpia basada en el rol del archivo externo
      setTimeout(() => {
        const rolUsuario = perfilUsuario.rol.toLowerCase();
        if (rolUsuario === 'admin') {
          window.location.href = '/admin';
        } else if (rolUsuario === 'empleado') {
          window.location.href = '/empleado';
        } else {
          window.location.href = '/cliente';
        }
      }, 1200);

    } catch (error) {
      // Captura el mensaje de error exacto definido en el mockAuth.js
      setFeedback({ message: error.message, type: 'error' });
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="smart-card login-card">
        <div className="brand-container">
          <span className="brand-logo">⚡</span>
          <h1 className="brand-name">FIT-<span>LOGIC</span></h1>
          <p className="brand-sub">Centro de Comando Global</p>
        </div>

        <FeedbackLabel 
          message={feedback.message} 
          type={feedback.type} 
          onClose={() => setFeedback({ message: '', type: 'success' })} 
        />

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label htmlFor="usuario">Usuario / DNI</label>
            <input 
              type="text" 
              id="usuario" 
              placeholder="Ej. 76123456"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              autoComplete="username"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input 
              type="password" 
              id="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="btn-smart btn-login-submit" disabled={loading}>
            {loading ? 'Verificando credenciales...' : 'Iniciar Sesión 🚀'}
          </button>
        </form>
      </div>
    </div>
  );
};