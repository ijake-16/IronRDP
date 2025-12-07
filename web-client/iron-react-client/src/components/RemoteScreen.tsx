import React, { useEffect, useRef, useState } from 'react';
import { useSession } from '../contexts/SessionContext';
import type { IronRemoteDesktopElement } from '../types';
import './RemoteScreen.css';

// Import the RDP Backend module (WASM)
// This uses the alias defined in vite.config.ts pointing to ../iron-remote-desktop-rdp/dist/
import { Backend } from 'iron-remote-desktop-rdp';

interface RemoteScreenProps {
  visible: boolean;
}

const RemoteScreen: React.FC<RemoteScreenProps> = ({ visible }) => {
  const { userInteraction, setUserInteraction } = useSession();
  const [cursorOverrideActive, setCursorOverrideActive] = useState(false);
  const [showDebugPanel, setShowDebugPanel] = useState(false);
  const [unicodeMode, setUnicodeMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const desktopRef = useRef<IronRemoteDesktopElement>(null);

  useEffect(() => {
    const el = desktopRef.current;
    if (!el) {
      console.warn('[RemoteScreen] iron-remote-desktop element not found');
      return;
    }

    console.log('[RemoteScreen] Setting up ready event listener on iron-remote-desktop element');

    const handleReady = (e: Event) => {
      const event = e as CustomEvent;
      console.log('[RemoteScreen] Received "ready" event from iron-remote-desktop');
      console.log('[RemoteScreen] UserInteraction service initialized successfully');
      setUserInteraction(event.detail.irgUserInteraction);
    };

    el.addEventListener('ready', handleReady as EventListener);

    return () => {
      el.removeEventListener('ready', handleReady as EventListener);
    };
  }, [setUserInteraction]);

  // Listen for fullscreen changes (user may exit with Esc key)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Handle window resize - notify the RDP session of new dimensions
  useEffect(() => {
    if (!userInteraction) return;

    const handleWindowResize = () => {
      const { innerWidth, innerHeight } = window;
      userInteraction.resize(innerWidth, innerHeight);
    };

    // Initial resize call
    handleWindowResize();

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [userInteraction]);

  const toggleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  const toggleCursorKind = () => {
    if (!userInteraction) return;

    if (cursorOverrideActive) {
      userInteraction.setCursorStyleOverride(null);
    } else {
      userInteraction.setCursorStyleOverride('url("crosshair.png") 7 7, default');
    }

    setCursorOverrideActive(!cursorOverrideActive);
  };

  const handleUnicodeModeChange = (checked: boolean) => {
    if (!userInteraction) return;
    setUnicodeMode(checked);
    userInteraction.setKeyboardUnicodeMode(checked);
  };

  

  // Note: We always render the iron-remote-desktop element (hidden when not visible)
  // so that it can initialize and fire the 'ready' event to set up userInteraction.
  // This follows the same pattern as the Svelte client.
  return (
    <div className={`remote-screen-container ${!visible ? 'hidden' : ''}`}>
      <div className="toolbar">
        <button onClick={toggleFullScreen} className={isFullscreen ? 'active' : ''}>
          {isFullscreen ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginRight: '5px', verticalAlign: 'middle' }}
              >
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
              </svg>
              Exit Fullscreen
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginRight: '5px', verticalAlign: 'middle' }}
              >
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
              Fullscreen
            </>
          )}
        </button>
        <button onClick={() => setShowDebugPanel(!showDebugPanel)}>
          Toggle Debug Panel
        </button>
        <button onClick={() => userInteraction?.setScale(1)}>
          Fit
        </button>
        <button onClick={() => userInteraction?.setScale(2)}>
          Full
        </button>
        <button onClick={() => userInteraction?.setScale(3)}>
          Real
        </button>
        <button onClick={() => userInteraction?.ctrlAltDel()}>
          Ctrl+Alt+Del
        </button>
        <button onClick={() => userInteraction?.metaKey()}>
          Meta
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 512 512"
            style={{ marginLeft: '5px', verticalAlign: 'middle' }}
          >
            <title>Windows Key</title>
            <path d="M480,265H232V444l248,36V265Z" fill="currentColor" />
            <path d="M216,265H32V415l184,26.7V265Z" fill="currentColor" />
            <path d="M480,32,232,67.4V249H480V32Z" fill="currentColor" />
            <path d="M216,69.7,32,96V249H216V69.7Z" fill="currentColor" />
          </svg>
        </button>
        <button onClick={toggleCursorKind}>
          Toggle Cursor Kind
        </button>
        <button onClick={() => userInteraction?.shutdown()}>
          Terminate Session
        </button>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={unicodeMode}
            onChange={(e) => handleUnicodeModeChange(e.target.checked)}
          />
          Unicode keyboard mode
        </label>
      </div>

      {showDebugPanel && (
        <div className="debug-panel">
          <h3>Debug Panel</h3>
          <input
            type="text"
            placeholder="Test if focus moves correctly"
            className="debug-input"
          />
          <p>Test if text selection works correctly</p>
        </div>
      )}

      <iron-remote-desktop
        ref={desktopRef as any}
        verbose="true"
        scale="fit"
        flexcenter="true"
        module={Backend}
      />
    </div>
  );
};

export default RemoteScreen;

