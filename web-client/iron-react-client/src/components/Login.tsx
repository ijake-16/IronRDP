import React, { useState, useEffect } from 'react';
import { useSession } from '../contexts/SessionContext';
import { useToast } from '../contexts/ToastContext';
import type { IronError } from '../types';
import './Login.css';

// TODO: Uncomment after building WASM
// import { preConnectionBlob, displayControl, kdcProxyUrl, init } from '/iron-remote-desktop/iron-remote-desktop-rdp.js';

// Temporary placeholders until WASM is built
declare const preConnectionBlob: (pcb: string) => any;
declare const displayControl: (enabled: boolean) => any;
declare const kdcProxyUrl: (url: string) => any;
declare const init: (level: string) => Promise<void>;

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const { userInteraction, updateSession } = useSession();
  const { showToast } = useToast();

  const [username, setUsername] = useState('Administrator');
  const [password, setPassword] = useState('DevoLabs123!');
  const [gatewayAddress, setGatewayAddress] = useState('ws://localhost:7171/jet/rdp');
  const [hostname, setHostname] = useState('10.10.0.3:3389');
  const [domain, setDomain] = useState('');
  const [authtoken, setAuthtoken] = useState('');
  const [kdcProxyUrlValue, setKdcProxyUrlValue] = useState('');
  const [desktopSize, setDesktopSize] = useState({ width: 1280, height: 720 });
  const [pcb, setPcb] = useState('');
  const [popUp, setPopUp] = useState(false);
  const [enableClipboard, setEnableClipboard] = useState(true);

  const isIronError = (error: unknown): error is IronError => {
    return (
      typeof error === 'object' &&
      error !== null &&
      typeof (error as IronError).backtrace === 'function' &&
      typeof (error as IronError).kind === 'function'
    );
  };

  const startSession = async () => {
    if (!userInteraction) {
      showToast({
        type: 'error',
        message: 'User interaction service not initialized',
      });
      return;
    }

    let tokenToUse = authtoken;

    if (tokenToUse === '') {
      const tokenServerUrl = import.meta.env.VITE_IRON_TOKEN_SERVER_URL as string | undefined;
      if (tokenServerUrl === undefined || tokenServerUrl.trim() === '') {
        showToast({
          type: 'error',
          message: 'Token server is not set and no token provided',
        });
        return;
      }
      try {
        const response = await fetch(`${tokenServerUrl}/forward`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            dst_hst: hostname,
            jet_ap: 'rdp',
            jet_ttl: 3600,
            jet_rec: false,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          tokenToUse = data.token;
        } else if (data.error !== undefined) {
          throw new Error(data.error);
        } else {
          throw new Error('Unknown error occurred');
        }
      } catch (error) {
        console.error('Error fetching token:', error);
        showToast({
          type: 'error',
          message: 'Error fetching token',
        });
        return;
      }
    }

    showToast({
      type: 'info',
      message: 'Connection in progress...',
    });

    if (popUp) {
      const data = JSON.stringify({
        username,
        password,
        hostname,
        gatewayAddress,
        domain,
        authtoken: tokenToUse,
        desktopSize,
        pcb,
        kdc_proxy_url: kdcProxyUrlValue,
        enable_clipboard: enableClipboard,
      });
      const base64Data = btoa(data);
      window.open(
        `/popup-session?data=${base64Data}`,
        '_blank',
        `width=${desktopSize.width},height=${desktopSize.height},resizable=yes,scrollbars=yes,status=yes`,
      );
      return;
    }

    userInteraction.setEnableClipboard(enableClipboard);

    const configBuilder = userInteraction
      .configBuilder()
      .withUsername(username)
      .withPassword(password)
      .withDestination(hostname)
      .withProxyAddress(gatewayAddress)
      .withServerDomain(domain)
      .withAuthToken(tokenToUse)
      .withDesktopSize(desktopSize)
      .withExtension(displayControl(true));

    if (pcb !== '') {
      configBuilder.withExtension(preConnectionBlob(pcb));
    }

    if (kdcProxyUrlValue !== '') {
      configBuilder.withExtension(kdcProxyUrl(kdcProxyUrlValue));
    }

    const config = configBuilder.build();

    try {
      const sessionInfo = await userInteraction.connect(config);

      showToast({
        type: 'success',
        message: 'Connected successfully',
      });

      updateSession(session => ({
        ...session,
        sessionId: sessionInfo.sessionId,
        desktopSize: sessionInfo.initialDesktopSize,
        active: true,
      }));

      onLoginSuccess();

      userInteraction.setVisibility(true);

      const sessionTerminationInfo = await sessionInfo.run();

      showToast({
        type: 'info',
        message: `Session terminated gracefully: ${sessionTerminationInfo.reason()}`,
      });
    } catch (err) {
      updateSession(session => ({ ...session, active: false }));

      if (isIronError(err)) {
        showToast({
          type: 'error',
          message: err.backtrace(),
        });
      } else {
        showToast({
          type: 'error',
          message: `${err}`,
        });
      }
    }
  };

  useEffect(() => {
    const initWasm = async () => {
      try {
        // await init('INFO');
      } catch (error) {
        console.error('Failed to initialize WASM:', error);
      }
    };
    initWasm();
  }, []);

  return (
    <main className="login-container">
      <div className="login-content">
        <div className="login-form-wrapper">
          <article className="login-card">
            <h2>RDP Connection</h2>
            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="hostname">Hostname</label>
                <input
                  id="hostname"
                  type="text"
                  value={hostname}
                  onChange={(e) => setHostname(e.target.value)}
                />
              </div>
              <div className="form-field">
                <label htmlFor="domain">Domain</label>
                <input
                  id="domain"
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                />
              </div>
              <div className="form-field">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-field">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-field">
                <label htmlFor="gatewayAddress">Gateway Address</label>
                <input
                  id="gatewayAddress"
                  type="text"
                  value={gatewayAddress}
                  onChange={(e) => setGatewayAddress(e.target.value)}
                />
              </div>
              <div className="form-field">
                <label htmlFor="authtoken">Auth Token (Optional)</label>
                <input
                  id="authtoken"
                  type="text"
                  value={authtoken}
                  onChange={(e) => setAuthtoken(e.target.value)}
                />
              </div>
              <div className="form-field">
                <label htmlFor="pcb">Pre Connection Blob</label>
                <input
                  id="pcb"
                  type="text"
                  value={pcb}
                  onChange={(e) => setPcb(e.target.value)}
                />
              </div>
              <div className="form-field">
                <label htmlFor="desktopWidth">Desktop Width</label>
                <input
                  id="desktopWidth"
                  type="number"
                  value={desktopSize.width}
                  onChange={(e) => setDesktopSize({ ...desktopSize, width: parseInt(e.target.value) })}
                />
              </div>
              <div className="form-field">
                <label htmlFor="desktopHeight">Desktop Height</label>
                <input
                  id="desktopHeight"
                  type="number"
                  value={desktopSize.height}
                  onChange={(e) => setDesktopSize({ ...desktopSize, height: parseInt(e.target.value) })}
                />
              </div>
              <div className="form-field">
                <label htmlFor="kdcProxyUrl">KDC Proxy URL</label>
                <input
                  id="kdcProxyUrl"
                  type="text"
                  value={kdcProxyUrlValue}
                  onChange={(e) => setKdcProxyUrlValue(e.target.value)}
                />
              </div>
              <div className="form-field checkbox-field">
                <label>
                  <input
                    type="checkbox"
                    checked={popUp}
                    onChange={(e) => setPopUp(e.target.checked)}
                  />
                  Use Pop Up
                </label>
              </div>
              <div className="form-field checkbox-field">
                <label>
                  <input
                    type="checkbox"
                    checked={enableClipboard}
                    onChange={(e) => setEnableClipboard(e.target.checked)}
                  />
                  Enable Clipboard
                </label>
              </div>
            </div>
            <div className="form-actions">
              <button onClick={startSession} className="btn-primary">
                Connect
              </button>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
};

export default Login;

