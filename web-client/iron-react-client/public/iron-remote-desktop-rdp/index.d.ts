export declare const Backend: {
    DesktopSize: typeof DesktopSize;
    InputTransaction: typeof InputTransaction;
    SessionBuilder: typeof SessionBuilder;
    ClipboardData: typeof ClipboardData;
    DeviceEvent: typeof DeviceEvent;
};

declare class ClipboardData {
    free(): void;
    [Symbol.dispose](): void;
    constructor();
    addText(mime_type: string, text: string): void;
    addBinary(mime_type: string, binary: Uint8Array): void;
    items(): ClipboardItem_2[];
    isEmpty(): boolean;
}

declare class ClipboardItem_2 {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    mimeType(): string;
    value(): any;
}

declare class DesktopSize {
    free(): void;
    [Symbol.dispose](): void;
    constructor(width: number, height: number);
    width: number;
    height: number;
}

declare class DeviceEvent {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static mouseButtonPressed(button: number): DeviceEvent;
    static mouseButtonReleased(button: number): DeviceEvent;
    static mouseMove(x: number, y: number): DeviceEvent;
    static wheelRotations(vertical: boolean, rotation_amount: number, rotation_unit: RotationUnit): DeviceEvent;
    static keyPressed(scancode: number): DeviceEvent;
    static keyReleased(scancode: number): DeviceEvent;
    static unicodePressed(unicode: string): DeviceEvent;
    static unicodeReleased(unicode: string): DeviceEvent;
}

export declare function displayControl(enable: boolean): Extension;

export declare function enableCredssp(enable: boolean): Extension;

declare class Extension {
    free(): void;
    [Symbol.dispose](): void;
    constructor(ident: string, value: any);
}

export declare function init(log_level: string): Promise<void>;

declare class InputTransaction {
    free(): void;
    [Symbol.dispose](): void;
    constructor();
    addEvent(event: DeviceEvent): void;
}

export declare function kdcProxyUrl(url: string): Extension;

export declare function outboundMessageSizeLimit(limit: number): Extension;

export declare function preConnectionBlob(pcb: string): Extension;

export declare class RdpFile {
    free(): void;
    [Symbol.dispose](): void;
    constructor();
    parse(config: string): void;
    write(): string;
    insertStr(key: string, value: string): void;
    insertInt(key: string, value: number): void;
    getStr(key: string): string | undefined;
    getInt(key: string): number | undefined;
}

declare enum RotationUnit {
    Pixel = 0,
    Line = 1,
    Page = 2,
}

declare class Session {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    run(): Promise<SessionTerminationInfo>;
    desktopSize(): DesktopSize;
    applyInputs(transaction: InputTransaction): void;
    releaseAllInputs(): void;
    synchronizeLockKeys(scroll_lock: boolean, num_lock: boolean, caps_lock: boolean, kana_lock: boolean): void;
    shutdown(): void;
    onClipboardPaste(content: ClipboardData): Promise<void>;
    resize(width: number, height: number, scale_factor?: number | null, physical_width?: number | null, physical_height?: number | null): void;
    supportsUnicodeKeyboardShortcuts(): boolean;
    invokeExtension(ext: Extension): any;
}

declare class SessionBuilder {
    free(): void;
    [Symbol.dispose](): void;
    constructor();
    username(username: string): SessionBuilder;
    destination(destination: string): SessionBuilder;
    serverDomain(server_domain: string): SessionBuilder;
    password(password: string): SessionBuilder;
    proxyAddress(address: string): SessionBuilder;
    authToken(token: string): SessionBuilder;
    desktopSize(desktop_size: DesktopSize): SessionBuilder;
    renderCanvas(canvas: HTMLCanvasElement): SessionBuilder;
    setCursorStyleCallback(callback: Function): SessionBuilder;
    setCursorStyleCallbackContext(context: any): SessionBuilder;
    remoteClipboardChangedCallback(callback: Function): SessionBuilder;
    forceClipboardUpdateCallback(callback: Function): SessionBuilder;
    canvasResizedCallback(callback: Function): SessionBuilder;
    extension(ext: Extension): SessionBuilder;
    connect(): Promise<Session>;
}

declare class SessionTerminationInfo {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    reason(): string;
}

export { }
