import React from 'react';
import { authService } from '../services/authService';

export const Sidebar = ({ avatar, nombre, rango, infoItems = [] }) => {
  return (
    <aside style={styles.sidebar}>
      <div style={styles.avatar}>{avatar}</div>
      <h2 style={styles.name}>{nombre}</h2>
      <span style={styles.badge}>{rango}</span>
      
      <div style={styles.metaContainer}>
        {infoItems.map((item, index) => (
          <div key={index} style={styles.metaItem}>
            {item.label}: <strong>{item.value}</strong>
          </div>
        ))}
      </div>
      
      <button onClick={authService.logout} className="btn-smart" style={styles.logoutBtn}>
        Cerrar Sesión
      </button>
    </aside>
  );
};

const styles = {
  sidebar: { 
    width: '280px', 
    background: 'var(--bg-card)', 
    borderRadius: '12px', 
    padding: '25px 20px', 
    textAlign: 'center', 
    height: 'fit-content', 
    border: '1px solid #23232a' 
  },
  avatar: { 
    width: '80px', 
    height: '80px', 
    borderRadius: '50%', 
    background: '#1c1c22', 
    margin: '0 auto 15px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    fontSize: '36px', 
    border: '2px solid var(--brand-yellow)' 
  },
  name: { 
    fontSize: '18px', 
    fontWeight: '700', 
    margin: '5px 0', 
    color: '#fff' 
  },
  badge: { 
    fontSize: '11px', 
    color: 'var(--brand-yellow)', 
    background: 'rgba(245, 188, 20, 0.1)', 
    padding: '4px 12px', 
    borderRadius: '20px', 
    display: 'inline-block', 
    marginBottom: '20px', 
    fontWeight: '600', 
    textTransform: 'uppercase', 
    border: '1px solid rgba(245, 188, 20, 0.2)' 
  },
  metaContainer: { 
    marginTop: '10px' 
  },
  metaItem: { 
    textAlign: 'left', 
    fontSize: '13px', 
    borderTop: '1px solid #23232a', 
    padding: '10px 0', 
    color: 'var(--text-muted)' 
  },
  logoutBtn: { 
    marginTop: '25px', 
    width: '100%', 
    backgroundColor: '#16161a', 
    color: '#f75a5a', 
    border: '1px solid #2d2d37' 
  }
};