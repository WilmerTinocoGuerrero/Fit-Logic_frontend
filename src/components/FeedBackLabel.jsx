
import React, { useEffect } from 'react';

export const FeedbackLabel = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    if (!message) return;
    
    // Autoocultar después de 4 segundos
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  const styles = {
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '20px',
    textAlign: 'center',
    fontSize: '14px',
    fontWeight: '600',
    border: '1px solid',
    animation: 'fadeIn 0.3s ease-in-out',
    backgroundColor: type === 'success' ? 'rgba(0, 179, 126, 0.1)' : 'rgba(247, 90, 90, 0.1)',
    color: type === 'success' ? '#00b37e' : '#f75a5a',
    borderColor: type === 'success' ? '#00b37e' : '#f75a5a'
  };

  return <div style={styles}>{message}</div>;
};