import React from 'react';
import { authService } from '../services/authService';

export const Navbar = ({ usuarioNombre, rol }) => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.brand}>
        <span style={styles.lightning}>⚡</span>
        <span style={styles.text}>FIT-LOGIC</span>
      </div>
      <div style={styles.userSection}>
        <span style={styles.userInfo}>
          {usuarioNombre} (<span style={styles.rolText}>{rol}</span>)
        </span>
        <button onClick={authService.logout} className="btn-smart" style={styles.logoutBtn}>
          Salir 🏃‍♂️
        </button>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'var(--bg-card)',
    padding: '15px 30px',
    borderBottom: '1px solid #23232a',
    marginBottom: '20px',
    borderRadius: '8px'
  },
  brand: { display: 'flex', alignItems: 'center', gap: '8px' },
  lightning: { fontSize: '20px' },
  text: { fontWeight: '800', letterSpacing: '0.5px', color: '#fff' },
  userSection: { display: 'flex', alignItems: 'center', gap: '20px' },
  userInfo: { fontSize: '14px', color: 'var(--text-muted)' },
  rolText: { color: 'var(--brand-yellow)', fontWeight: '600', textTransform: 'uppercase' },
  logoutBtn: { padding: '8px 16px', fontSize: '12px', background: '#222', color: '#f75a5a', border: '1px solid #333' }
};