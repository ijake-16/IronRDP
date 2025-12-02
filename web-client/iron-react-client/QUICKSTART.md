# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Setup IronRDP Integration

Run the automated setup script:

```bash
cd /Users/jake/Desktop/KAIST/2025Fall/CS408\ CS\ Project/web-vdi-client/client/client
./setup-ironrdp.sh
```

This script will:
- ✅ Build IronRDP WASM modules
- ✅ Copy files to your project
- ✅ Install dependencies

### Step 2: Enable Web Component

Uncomment the script tag in `index.html`:

```html
<!-- Change this: -->
<!-- <script type="module" src="/iron-remote-desktop/iron-remote-desktop.js"></script> -->

<!-- To this: -->
<script type="module" src="/iron-remote-desktop/iron-remote-desktop.js"></script>
```

### Step 3: Start Development Server

```bash
npm run dev
```

Open your browser to `http://localhost:5173` 🎉

---

## 📋 What You'll See

### Login Screen
![Login Screen](https://via.placeholder.com/800x600/667eea/ffffff?text=Login+Form)

A beautiful gradient login form with fields for:
- Hostname (RDP server address)
- Username and Password
- Gateway Address (WebSocket proxy)
- Desktop Size
- Advanced options (Domain, Auth Token, PCB, KDC Proxy)

### Remote Desktop Screen
![Remote Screen](https://via.placeholder.com/800x600/2e2e2e/ffffff?text=Remote+Desktop+View)

Once connected, you'll see:
- Full remote desktop display
- Toolbar with controls (Scale, Ctrl+Alt+Del, etc.)
- Debug panel (toggleable)

---

## 🔧 Configuration

### Connection Settings

Default values in the login form:
```
Hostname:         10.10.0.3:3389
Username:         Administrator
Password:         DevoLabs123!
Gateway Address:  ws://localhost:7171/jet/rdp
Desktop Size:     1280x720
```

### Environment Variables (Optional)

Create `.env` file:
```env
VITE_IRON_TOKEN_SERVER_URL=http://localhost:8080
```

---

## 🎮 Usage

### Connecting to RDP Server

1. **Enter connection details** in the login form
2. **Click "Connect"** button
3. **Wait for connection** (you'll see a toast notification)
4. **Use the remote desktop** in your browser!

### Toolbar Controls

Once connected, use the toolbar to:

- **Fit/Full/Real**: Adjust screen scaling
- **Ctrl+Alt+Del**: Send special key combination
- **Meta Key**: Send Windows key
- **Toggle Cursor**: Change cursor style
- **Unicode Mode**: Enable Unicode keyboard input
- **Terminate Session**: Close the connection

### Keyboard Shortcuts

The remote desktop supports:
- All standard keyboard input
- Special combinations (Ctrl+Alt+Del via toolbar)
- Unicode characters (when enabled)

---

## 🐛 Troubleshooting

### "WASM module not found"
- ✅ Run `./setup-ironrdp.sh` again
- ✅ Check that `public/iron-remote-desktop/` exists
- ✅ Verify `index.html` has the script tag uncommented

### "Connection failed"
- ✅ Verify WebSocket proxy is running
- ✅ Check RDP server is accessible
- ✅ Verify credentials are correct
- ✅ Check browser console for errors

### "Custom element not defined"
- ✅ Ensure script tag in `index.html` is uncommented
- ✅ Clear browser cache and reload
- ✅ Check browser console for loading errors

### Build errors
- ✅ Run `npm install` again
- ✅ Delete `node_modules` and reinstall
- ✅ Check Node.js version (requires 18+)

---

## 📚 Next Steps

1. **Test with your RDP server**
   - Update connection details in login form
   - Ensure WebSocket proxy is running

2. **Customize the UI**
   - Modify CSS files in `src/components/`
   - Adjust colors in `src/index.css`

3. **Add features**
   - Implement session history
   - Add connection profiles
   - Integrate with your authentication system

4. **Deploy to production**
   - Run `npm run build`
   - Serve the `dist/` directory
   - Configure your WebSocket proxy

---

## 📖 Documentation

- **README.md** - Full project documentation
- **PROJECT-SUMMARY.md** - Complete development summary
- **INTEGRATION.md** (parent dir) - Detailed integration guide
- **IronRDP Docs** - https://github.com/Devolutions/IronRDP

---

## 🆘 Need Help?

Check these resources:
1. Browser console for error messages
2. Network tab for WebSocket connection issues
3. IronRDP GitHub issues
4. Project documentation files

---

## 🎉 Success!

You now have a fully functional React-based web RDP client!

Happy remote desktop-ing! 🖥️✨

