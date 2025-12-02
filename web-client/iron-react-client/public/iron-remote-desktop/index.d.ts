declare type Callback<T> = (_: T) => void;

declare interface CanvasResizedCallback {
    (): void;
}

export declare interface ClipboardData {
    addText(mimeType: string, text: string): void;
    addBinary(mimeType: string, binary: Uint8Array): void;
    items(): ClipboardItem_2[];
    isEmpty(): boolean;
}

declare interface ClipboardItem_2 {
    mimeType(): string;
    value(): string | Uint8Array;
}
export { ClipboardItem_2 as ClipboardItem }

declare class Config {
    readonly username: string;
    readonly password: string;
    readonly destination: string;
    readonly proxyAddress: string;
    readonly serverDomain: string;
    readonly authToken: string;
    readonly desktopSize?: DesktopSize;
    readonly extensions: Extension[];
    constructor(userData: {
        username: string;
        password: string;
    }, proxyData: {
        address: string;
        authToken: string;
    }, configOptions: {
        destination: string;
        serverDomain: string;
        extensions: Extension[];
        desktopSize?: DesktopSize;
    });
}

/**
 * Builder class for creating Config objects with a fluent interface.
 *
 * @example
 * ```typescript
 * const configBuilder = new ConfigBuilder(createExtensionFunction);
 * const config = configBuilder
 *   .withDestination(destination)
 *   .withProxyAddress(proxyAddress)
 *   .withAuthToken(authToken)
 *   ...
 *   .build();
 * ```
 */
declare class ConfigBuilder {
    private username;
    private password;
    private destination;
    private proxyAddress;
    private serverDomain;
    private authToken;
    private desktopSize?;
    private extensions;
    /**
     * Creates a new ConfigBuilder instance.
     */
    constructor();
    /**
     * Optional parameter
     *
     * @param username - The username to use for authentication
     * @returns The builder instance for method chaining
     */
    withUsername(username: string): ConfigBuilder;
    /**
     * Optional parameter
     *
     * @param password - The password for authentication
     * @returns The builder instance for method chaining
     */
    withPassword(password: string): ConfigBuilder;
    /**
     * Required parameter
     *
     * @param destination - The destination address to connect to
     * @returns The builder instance for method chaining
     */
    withDestination(destination: string): ConfigBuilder;
    /**
     * Required parameter
     *
     * @param proxyAddress - The address of the proxy server
     * @returns The builder instance for method chaining
     */
    withProxyAddress(proxyAddress: string): ConfigBuilder;
    /**
     * Optional parameter
     *
     * @param serverDomain - The server domain to connect to
     * @returns The builder instance for method chaining
     */
    withServerDomain(serverDomain: string): ConfigBuilder;
    /**
     * Required parameter
     *
     * @param authToken - JWT token to connect to the proxy
     * @returns The builder instance for method chaining
     */
    withAuthToken(authToken: string): ConfigBuilder;
    /**
     * Optional parameter
     *
     * @param ext - The extension
     * @returns The builder instance for method chaining
     */
    withExtension(ext: Extension): ConfigBuilder;
    /**
     * Optional
     *
     * @param desktopSize - The desktop size configuration object
     * @returns The builder instance for method chaining
     */
    withDesktopSize(desktopSize: DesktopSize): ConfigBuilder;
    /**
     * Builds a new Config instance.
     *
     * @throws {Error} If required parameters (destination, proxyAddress, authToken) are not set
     * @returns A new Config instance with the configured values
     */
    build(): Config;
}

declare interface DesktopSize {
    width: number;
    height: number;
}

export declare type DeviceEvent = unknown;

declare type Extension = unknown;

declare interface ForceClipboardUpdateCallback {
    (): void;
}

export declare interface InputTransaction {
    addEvent(event: DeviceEvent): void;
}

export declare interface IronError {
    backtrace: () => string;
    kind: () => IronErrorKind;
}

export declare enum IronErrorKind {
    General = 0,
    WrongPassword = 1,
    LogonFailure = 2,
    AccessDenied = 3,
    RDCleanPath = 4,
    ProxyConnect = 5,
    NegotiationFailure = 6
}

export declare interface NewSessionInfo {
    sessionId: number;
    websocketPort: number;
    initialDesktopSize: DesktopSize;
    run: () => Promise<SessionTerminationInfo>;
}

declare interface RemoteClipboardChangedCallback {
    (data: ClipboardData): void;
}

declare interface RemoteReceiveForwardListCallback {
    (): void;
}

export declare interface ResizeEvent {
    sessionId: number;
    desktopSize: DesktopSize;
}

declare enum ScreenScale {
    Fit = 1,
    Full = 2,
    Real = 3
}

export declare interface Session {
    run(): Promise<SessionTerminationInfo>;
    desktopSize(): DesktopSize;
    applyInputs(transaction: InputTransaction): void;
    releaseAllInputs(): void;
    synchronizeLockKeys(scrollLock: boolean, numLock: boolean, capsLock: boolean, kanaLock: boolean): void;
    invokeExtension(value: unknown): unknown;
    shutdown(): void;
    onClipboardPaste(data: ClipboardData): Promise<void>;
    resize(width: number, height: number, scaleFactor?: number | null, physicalWidth?: number | null, physicalHeight?: number | null): void;
    supportsUnicodeKeyboardShortcuts(): boolean;
}

export declare interface SessionBuilder {
    /**
     * Required
     */
    username(username: string): SessionBuilder;
    /**
     * Required
     */
    destination(destination: string): SessionBuilder;
    /**
     * Optional
     */
    serverDomain(serverDomain: string): SessionBuilder;
    /**
     * Required
     */
    password(password: string): SessionBuilder;
    /**
     * Required
     */
    proxyAddress(address: string): SessionBuilder;
    /**
     * Required
     */
    authToken(token: string): SessionBuilder;
    /**
     * Optional
     */
    desktopSize(desktopSize: DesktopSize): SessionBuilder;
    /**
     * Optional
     */
    renderCanvas(canvas: HTMLCanvasElement): SessionBuilder;
    /**
     * Required.
     *
     * # Cursor kinds:
     * - `default` (default system cursor); other arguments are `UNDEFINED`
     * - `none` (hide cursor); other arguments are `UNDEFINED`
     * - `url` (custom cursor data URL); `cursor_data` contains the data URL with Base64-encoded
     *   cursor bitmap; `hotspot_x` and `hotspot_y` are set to the cursor hotspot coordinates.
     */
    setCursorStyleCallback(callback: SetCursorStyleCallback): SessionBuilder;
    /**
     * Required.
     */
    setCursorStyleCallbackContext(context: unknown): SessionBuilder;
    /**
     * Optional
     */
    remoteClipboardChangedCallback(callback: RemoteClipboardChangedCallback): SessionBuilder;
    /**
     * Optional
     */
    remoteReceivedFormatListCallback(callback: RemoteReceiveForwardListCallback): SessionBuilder;
    /**
     * Optional
     */
    forceClipboardUpdateCallback(callback: ForceClipboardUpdateCallback): SessionBuilder;
    /**
     * Optional
     */
    canvasResizedCallback(callback: CanvasResizedCallback): SessionBuilder;
    extension(value: unknown): SessionBuilder;
    connect(): Promise<Session>;
}

export declare interface SessionTerminationInfo {
    reason(): string;
}

declare interface SetCursorStyleCallback {
    (cursorKind: string, cursorData: string | undefined, hotspotX: number | undefined, hotspotY: number | undefined): void;
}

export declare interface UserInteraction {
    setVisibility(state: boolean): void;
    setScale(scale: ScreenScale): void;
    configBuilder(): ConfigBuilder;
    connect(config: Config): Promise<NewSessionInfo>;
    setKeyboardUnicodeMode(useUnicode: boolean): void;
    ctrlAltDel(): void;
    metaKey(): void;
    shutdown(): void;
    setCursorStyleOverride(style: string | null): void;
    onWarningCallback(callback: Callback<string>): void;
    onClipboardRemoteUpdateCallback(callback: Callback<void>): void;
    resize(width: number, height: number, scale?: number): void;
    setEnableClipboard(enable: boolean): void;
    setEnableAutoClipboard(enable: boolean): void;
    saveRemoteClipboardData(): Promise<void>;
    sendClipboardData(): Promise<void>;
    invokeExtension(ext: Extension): void;
}

export { }
