# IronRDP React Client (Experimental)

## 1. Goal

The primary goal of this project is to demonstrate the capability of **IronRDP** when compiled to **WebAssembly (WASM)**. By leveraging WASM, we can move the heavy lifting of the RDP protocol processing from a backend server directly to the **client's web browser**.

This architecture offers several significant advantages:
*   **Client-Side Processing:** Reduces server load by handling RDP protocol logic (parsing, state management, graphics decoding) on the user's device.
*   **Enhanced Privacy:** Sensitive RDP data is processed locally within the browser sandbox, rather than being decrypted and re-encoded on an intermediate server.
*   **Reduced Latency:** Eliminates the "double hop" latency found in traditional VDI solutions (RDP -> Gateway -> HTML5 Canvas), as the browser directly interprets the RDP stream.

This directory contains a **React-based web client** that implements this architecture, serving as a modern alternative to the Svelte-based example.

## 2. Architecture

To overcome the limitation that **browsers cannot make direct TCP connections**, we employ a WebSocket-to-TCP proxy architecture.

This approach consists of 3 key components:

1.  **RDP Host (Windows PC)**
    *   **Role:** The target machine providing the Remote Desktop session.
    *   **Protocol:** Standard RDP over TCP (Default port: 3389).
    *   **Requirement:** Must have NLA (Network Level Authentication) disabled for this specific client implementation.

2.  **Devolutions Gateway (WebSocket Proxy)**
    *   **Role:** Acts as a bridge between the browser and the RDP host.
    *   **Why is this needed?** Web browsers are restricted to HTTP and WebSocket protocols and cannot open raw TCP sockets. The Gateway accepts secure `WebSocket (WSS/WS)` connections from the client and tunnels the raw RDP traffic to the target `TCP` port.
    *   **Software:** We use the open-source [Devolutions Gateway](https://github.com/Devolutions/devolutions-gateway) for its robust performance and built-in support for the `jet` protocol used here.

3.  **Web Client (React + WASM)**
    *   **Role:** The frontend user interface and protocol handler.
    *   **Technology Stack:**
        *   **React + Vite:** For a modern, responsive UI.
        *   **IronRDP (WASM):** The core RDP library compiled to WebAssembly. It processes the raw binary stream received via WebSocket, handles encryption/decryption, and renders the desktop bitmap to an HTML5 Canvas.

**Data Flow:**
```
[Browser (React + WASM)] <===(WebSocket)===> [Devolutions Gateway] <===(TCP)===> [Windows RDP Host]
```

---

## 3. Prerequisites

Before building, ensure your environment meets the following requirements.

### 3.1. Rust (WASM) Toolchain
Required to compile the IronRDP Rust crate into a WebAssembly module.

1.  **Install Rust:** (If not already installed)
    ```bash
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
    ```

2.  **Add WASM Compilation Target (if not already installed):**
    ```bash
    rustup target add wasm32-unknown-unknown
    ```
    *   *Note:* If the target is already installed, this command will simply output `is up to date`, which is safe to ignore.

3.  **Install `wasm-pack`:**
    This tool is essential for packaging Rust code for npm.
    ```bash
    cargo install wasm-pack --version 0.12.1
    ```
    *   *Note:* Ensure you are using the Rust version specified in `rust-toolchain.toml` (e.g., 1.88.0) to avoid compatibility issues.

### 3.2. Web Toolchain
Required for building and running the React application.

1.  **Node.js & npm:**
    *   **Version:** Node.js **v20.19+** or **v22.12+** is strictly required by Vite 6.
    *   Check your version: `node -v`
    *   Install via [Node.js website](https://nodejs.org/) or use `nvm`.

### 3.3. RDP Host (Windows PC) Configuration

1.  **Enable Remote Desktop:**
    *   `Settings` > `System` > `Remote Desktop` > **On**.
2.  **Configure Firewall:**
    *   Ensure the "Remote Desktop" rule is allowed for your network profile (Private/Public).
3.  **[CRITICAL] Disable Network Level Authentication (NLA):**
    *   The current WASM client implementation requires standard RDP security negotiation and does not yet support NLA (CredSSP).
    *   Go to `Settings` > `Remote Desktop` > `Advanced settings`.
    *   **Uncheck** "Require computers to use Network Level Authentication (NLA) to connect".

---

## 4. Build & Run Procedure

This process involves running **3 separate services** simultaneously in different terminal windows.

### 4.1. Service 1: Devolutions Gateway (The Proxy)

This service bridges the WebSocket connection from your browser to the TCP port of the RDP server.

1.  **Clone & Build Gateway:**
    ```bash
    # Clone the repository
    git clone https://github.com/Devolutions/devolutions-gateway.git
    cd devolutions-gateway

    # Build in release mode (takes a few minutes)
    cargo build --bin devolutions-gateway --release
    ```

2.  **Generate Provisioner Keys:**
    The Gateway requires a key pair to sign and verify authentication tokens.
    ```bash
    # Generate private key
    openssl genrsa -out provisioner.key 2048

    # Extract public key
    openssl rsa -in provisioner.key -outform PEM -pubout -out provisioner.pem
    ```

3.  **Create Configuration File (`gateway.json`):**
    Create a file named `gateway.json` in the `devolutions-gateway` directory with the following content:
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

4.  **Run the Gateway:**
    ```bash
    DGATEWAY_CONFIG_PATH="$(pwd)" ./target/release/devolutions-gateway
    ```
    *   **Success:** You should see logs indicating it is listening on `http://0.0.0.0:7171`.

### 4.2. Service 2: Token Server

This helper service automatically generates short-lived authentication tokens required by the Gateway for each connection.

1.  **Run the Token Server:**
    Open a **new terminal** and navigate to the tool's directory:
    ```bash
    cd devolutions-gateway/tools/tokengen
    
    # Run the server, pointing to the config path where keys are located
    DGATEWAY_CONFIG_PATH="../../" cargo run --release -- server
    ```
    *   **Success:** You should see logs indicating it is listening on `http://localhost:8080`.

### 4.3. Service 3: React Client (The UI)

Finally, build and run the React frontend.

1.  **Navigate to Client Directory:**
    ```bash
    cd IronRDP/web-client/iron-react-client
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Setup Environment:**
    Create a `.env` file to tell the client where the Token Server is:
    ```bash
    echo "VITE_IRON_TOKEN_SERVER_URL=http://localhost:8080" > .env
    ```

4.  **Build & Run:**
    We use a helper script (`pre-build.js`) to copy the necessary WASM and Web Component assets before starting Vite.
    ```bash
    npm run dev-no-wasm
    ```
    *   *Note:* The `dev-no-wasm` command assumes the WASM binaries are already built (or present in the repo). If you need to rebuild the WASM module from source (e.g., after modifying Rust code), use `npm run dev` (requires a working WASM build environment).

5.  **Access the Client:**
    Open your browser and go to: `http://localhost:5173`

### 4.4. Connecting to a Session

Once the UI is loaded, fill in the connection details:

| Field | Example Value | Notes |
|---|---|---|
| **Hostname** | `192.168.1.100:3389` | The IP and Port of your Windows PC. |
| **Username** | `Administrator` | |
| **Password** | `******` | |
| **Gateway Address** | `ws://localhost:7171/jet/rdp` | **Must** start with `ws://` and end with `/jet/rdp`. |
| **AuthToken** | (Leave Empty) | The client will automatically fetch this from the Token Server. |
| **Enable Clipboard** | Checked | Allows copy-paste between host and client. |

Click **Login** to start your session!

---

## 5. Troubleshooting

### Common Issues

*   **Error: `wasm-pack not found`**
    *   **Fix:** You missed installing the WASM tool. Run: `cargo install wasm-pack --version 0.12.1`

*   **Error: `npm install` fails with Permission Denied**
    *   **Fix:** Clear the cache and retry:
        ```bash
        rm -rf node_modules package-lock.json
        npm install
        ```

*   **WebSocket Connection Failed**
    *   **Check 1:** Is the Gateway running? (`lsof -i :7171`)
    *   **Check 2:** Did you use the correct URL format? It must be `ws://localhost:7171/jet/rdp`.
    *   **Check 3:** Check the Gateway terminal logs for connection attempts.

*   **Black Screen / Immediate Disconnect**
    *   **Check 1:** **NLA must be disabled** on the target Windows PC. This is the most common cause.
    *   **Check 2:** Ensure the Windows PC is reachable from the machine running the Gateway (try `ping` from the Gateway terminal).
    *   **Check 3:** Verify the Windows Firewall allows port 3389.

*   **Token / Authentication Errors**
    *   **Check 1:** Is the Token Server running on port 8080?
    *   **Check 2:** Did you create the `.env` file with `VITE_IRON_TOKEN_SERVER_URL`?
    *   **Check 3:** Ensure `gateway.json` has `ProvisionerPublicKeyFile` correctly pointing to the generated `.pem` file.
