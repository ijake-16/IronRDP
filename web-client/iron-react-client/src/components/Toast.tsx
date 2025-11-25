import React, { useEffect } from 'react';
import { useToast } from '../contexts/ToastContext';
import './Toast.css';

const Toast: React.FC = () => {
  const { toast, hideToast } = useToast();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        hideToast();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [toast, hideToast]);

  if (!toast) {
    return null;
  }

  return (
    <div className={`toast toast-${toast.type}`}>
      <div className="toast-content">
        <span className="toast-icon">
          {toast.type === 'error' && '❌'}
          {toast.type === 'success' && '✅'}
          {toast.type === 'info' && 'ℹ️'}
        </span>
        <span className="toast-message">{toast.message}</span>
        <button className="toast-close" onClick={hideToast}>
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;

