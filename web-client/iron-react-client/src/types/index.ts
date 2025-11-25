export interface ToastMessage {
  message: string;
  type: 'info' | 'error' | 'success';
}

export interface IronError {
  backtrace: () => string;
  kind: () => string;
}

export interface UserInteraction {
  configBuilder: () => ConfigBuilder;
  connect: (config: any) => Promise<SessionInfo>;
  setVisibility: (visible: boolean) => void;
  setEnableClipboard: (enabled: boolean) => void;
  setScale: (scale: number) => void;
  ctrlAltDel: () => void;
  metaKey: () => void;
  shutdown: () => void;
  setKeyboardUnicodeMode: (enabled: boolean) => void;
  setCursorStyleOverride: (style: string | null) => void;
}

export interface ConfigBuilder {
  withUsername: (username: string) => ConfigBuilder;
  withPassword: (password: string) => ConfigBuilder;
  withDestination: (destination: string) => ConfigBuilder;
  withProxyAddress: (address: string) => ConfigBuilder;
  withServerDomain: (domain: string) => ConfigBuilder;
  withAuthToken: (token: string) => ConfigBuilder;
  withDesktopSize: (size: { width: number; height: number }) => ConfigBuilder;
  withExtension: (extension: any) => ConfigBuilder;
  build: () => any;
}

export interface SessionInfo {
  sessionId: number;
  initialDesktopSize: { width: number; height: number };
  run: () => Promise<SessionTerminationInfo>;
}

export interface SessionTerminationInfo {
  reason: () => string;
}

export interface IronRemoteDesktopElement extends HTMLElement {
  addEventListener(type: 'ready', listener: (event: CustomEvent<{ irgUserInteraction: UserInteraction }>) => void): void;
}

