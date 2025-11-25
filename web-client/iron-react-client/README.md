# IronRDP React Client (Experimental)

## 1. Goal

The goal of this project is to **compile the IronRDP library to WebAssembly (WASM)**, allowing the **handling of the RDP protocol directly in the client (web browser)** instead of server-side rendering.

This directory contains a **React-based web client** that demonstrates this capability.

## 2. Architecture

This approach consists of 3 key components:

1.  **RDP Host (Windows PC):**
    *   The target server providing the actual RDP session (TCP port 3389).
2.  **WebSocket Proxy (Gateway):**
    *   Browsers cannot access TCP sockets directly for security reasons. This proxy server acts as a bridge, accepting `WebSocket (WSS/WS)` connections from the browser and converting them to `TCP (RDP)` connections.
    *   We use **Devolutions Gateway** for this purpose.
3.  **Web Client (Browser):**
    *   A **React + Vite** based frontend UI.
    *   Loads the `IronRDP (WASM)` module to handle RDP protocol processing, graphics decoding, and user input (keyboard/mouse) transmission directly within the browser.

**Data Flow:**
`[Browser: React + IronRDP(WASM)]` ↔ `[WebSocket]` ↔ `[Gateway]` ↔ `[TCP/3389]` ↔ `[Windows RDP Host]`

---

## 3. Prerequisites

### 3.1. Rust (WASM) Toolchain
Required for building the WASM module.

1.  **Add WASM Compilation Target:**
    ```bash
    rustup target add wasm32-unknown-unknown
    ```
2.  **Install `wasm-pack`:**
    ```bash
    cargo install wasm-pack --version 0.12.1
    ```
    *   Ensure you are using the Rust version specified in `rust-toolchain.toml` (e.g., 1.88.0).

### 3.2. Web Toolchain
Required for building and running the React application.

1.  **Node.js & npm:**
    *   **Version:** Node.js v20.19+ or v22.12+ is required by Vite.
    *   Install via [Node.js website](https://nodejs.org/) or `nvm`.

### 3.3. RDP Host (Windows PC) Configuration

1.  **Enable Remote Desktop:** (`Settings` > `System` > `Remote Desktop`)
2.  **Allow Firewall:** "Remote Desktop" (Private)
3.  **[REQUIRED] Disable NLA:**
    *   **Network Level Authentication (NLA) must be disabled** for the WASM client's standard RDP authentication to work.
    *   Go to `Settings` > `Remote Desktop` > `Advanced settings` > **Uncheck "Require computers to use Network Level Authentication (NLA) to connect"**.

---

## 4. Build & Run Procedure

This process requires running **3 main services** simultaneously.

### 4.1. Setup Devolutions Gateway (WebSocket Proxy)

1.  **Clone & Build Gateway:**
```bash
    git clone https://github.com/Devolutions/devolutions-gateway.git
    cd devolutions-gateway
    cargo build --bin devolutions-gateway --release
```

2.  **Generate Provisioner Keys:**
```bash
    openssl genrsa -out provisioner.key 2048
    openssl rsa -in provisioner.key -outform PEM -pubout -out provisioner.pem
    ```

3.  **Configure `gateway.json`:**
    Create `gateway.json` in the gateway directory:
    ```json
    {
      "Id": "00000000-0000-0000-0000-000000000000",
      "ProvisionerPublicKeyFile": "provisioner.pem",
      "ProvisionerPrivateKeyFile": "provisioner.key",
      "TlsVerifyStrict": false,
      "WebApp": {
        "Enabled": false,
        "StaticRootPath": ".",
        "Authentication": "None"
      },
      "Listeners": [
        { "InternalUrl": "tcp://*:8181", "ExternalUrl": "tcp://*:8181" },
        { "InternalUrl": "http://*:7171", "ExternalUrl": "http://*:7171" }
      ],
      "__debug__": { "disable_token_validation": true }
    }
    ```

4.  **Run Gateway:**
    ```bash
    DGATEWAY_CONFIG_PATH="$(pwd)" ./target/release/devolutions-gateway
    ```
    *   Listening on: `http://localhost:7171`

### 4.2. Setup Token Server

1.  **Run Token Server:**
    ```bash
    cd devolutions-gateway/tools/tokengen
    DGATEWAY_CONFIG_PATH="../../" cargo run --release -- server
    ```
    *   Listening on: `http://localhost:8080`

### 4.3. Build & Run React Client

1.  **Navigate to Client Directory:**
```bash
    cd IronRDP/web-client/iron-react-client
    ```

2.  **Install Dependencies:**
```bash
    npm install
    ```

3.  **Build & Run:**
    This command will automatically build the WASM module, the web components, and start the React dev server.
    ```bash
    npm run dev-no-wasm
    ```
    *   *Note: `dev-no-wasm` skips the full WASM rebuild if you have already built it or are using the pre-built binaries copied by the script. For a full build, use `npm run dev` (requires Docker or correct local environment).*

4.  **Access the Client:**
    Open your browser at `http://localhost:5173`.

### 4.4. Connect

Fill in the login form:

| Field | Value | Description |
|---|---|---|
| **Hostname** | `YOUR_PC_IP:3389` | e.g. `192.168.1.100:3389` |
| **Username** | `Administrator` | RDP Username |
| **Password** | `******` | RDP Password |
| **Gateway Address** | `ws://localhost:7171/jet/rdp` | **Must include `/jet/rdp`** |
| **Enable Clipboard** | Checked | Optional |

Click **Login**.

---

## 5. Troubleshooting

*   **`wasm-pack not found`**: Install it via `cargo install wasm-pack`.
*   **`npm install` Permission Denied**: Run `rm -rf node_modules package-lock.json` and try again.
*   **WebSocket Connection Failed**:
    *   Check if Gateway is running on port 7171 (`lsof -i :7171`).
    *   Ensure Gateway Address starts with `ws://` and ends with `/jet/rdp`.
*   **Black Screen after Login**:
    *   Verify NLA is disabled on the Windows Host.
    *   Check if the RDP Host IP is reachable from the machine running the Gateway.
*   **Token Error**:
    *   Ensure `.env` file exists with `VITE_IRON_TOKEN_SERVER_URL=http://localhost:8080`.
    *   Check if Token Server is running on port 8080.
