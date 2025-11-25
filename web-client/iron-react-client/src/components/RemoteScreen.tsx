import React, { useEffect, useRef, useState } from 'react';
import { useSession } from '../contexts/SessionContext';
import type { IronRemoteDesktopElement } from '../types';
import './RemoteScreen.css';

// TODO: Uncomment after building WASM
// import { Backend } from '/iron-remote-desktop/iron-remote-desktop-rdp.js';

// Temporary placeholder until WASM is built
declare const Backend: any;

interface RemoteScreenProps {
  visible: boolean;
}

const RemoteScreen: React.FC<RemoteScreenProps> = ({ visible }) => {
  const { userInteraction, setUserInteraction } = useSession();
  const [cursorOverrideActive, setCursorOverrideActive] = useState(false);
  const [showDebugPanel, setShowDebugPanel] = useState(false);
  const [unicodeMode, setUnicodeMode] = useState(false);
  const desktopRef = useRef<IronRemoteDesktopElement>(null);

  useEffect(() => {
    const el = desktopRef.current;
    if (!el) return;

    const handleReady = (e: Event) => {
      const event = e as CustomEvent;
      setUserInteraction(event.detail.irgUserInteraction);
    };

    el.addEventListener('ready', handleReady as EventListener);

    return () => {
      el.removeEventListener('ready', handleReady as EventListener);
    };
  }, [setUserInteraction]);

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

  if (!visible) {
    return null;
  }

  

  return (
    <div className="remote-screen-container">
      <div className="toolbar">
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

