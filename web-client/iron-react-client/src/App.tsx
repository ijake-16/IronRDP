import { useState } from 'react';
import { SessionProvider } from './contexts/SessionContext';
import { ToastProvider } from './contexts/ToastContext';
import Login from './components/Login';
import RemoteScreen from './components/RemoteScreen';
import Toast from './components/Toast';
import './App.css';

function App() {
  const [showLogin, setShowLogin] = useState(true);

  const handleLoginSuccess = () => {
    setShowLogin(false);
  };

  return (
    <SessionProvider>
      <ToastProvider>
        <div className="app-container">
          {showLogin && <Login onLoginSuccess={handleLoginSuccess} />}
          <RemoteScreen visible={!showLogin} />
          <Toast />
        </div>
      </ToastProvider>
    </SessionProvider>
  );
}

export default App;
