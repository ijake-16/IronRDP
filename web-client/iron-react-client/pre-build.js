import * as fs from 'fs-extra';
import { spawn } from 'child_process';
import { argv } from 'node:process';

let noWasm = false;

// React/Vite uses 'public' folder for static assets
const assetIronRemoteDesktopFolder = './public/iron-remote-desktop';
const assetIronRemoteDesktopRdpFolder = './public/iron-remote-desktop-rdp';

argv.forEach((val, index) => {
    if (index === 2 && val === 'no-wasm') {
        noWasm = true;
    }
});

const run = async (command, cwd) => {
    try {
        const buildCommand = spawn(command, { stdio: 'pipe', shell: true, cwd: cwd });

        buildCommand.stdout.on('data', (data) => {
            console.log(`${data}`);
        });

        buildCommand.stderr.on('data', (data) => {
            console.error(`${data}`);
        });

        return new Promise((resolve, reject) => {
            buildCommand.on('close', (code) => {
                if (code !== 0) {
                    reject(new Error(`Process exited with code ${code}`));
                } else {
                    console.log(`Child process exited successfully with code ${code}`);
                    resolve();
                }
            });
        });
    } catch (err) {
        console.error(`Failed to execute the process: ${err}`);
    }
};

const copyCoreFiles = async () => {
    try {
        console.log('Copying core files…');
        // Ensure directories exist
        await fs.ensureDir(assetIronRemoteDesktopFolder);
        await fs.ensureDir(assetIronRemoteDesktopRdpFolder);
        
        // Clean up existing files
        await fs.emptyDir(assetIronRemoteDesktopFolder);
        await fs.emptyDir(assetIronRemoteDesktopRdpFolder);

        const source = '../iron-remote-desktop/dist';
        const sourceRdp = '../iron-remote-desktop-rdp/dist';

        await fs.copy(source, assetIronRemoteDesktopFolder);
        await fs.copy(sourceRdp, assetIronRemoteDesktopRdpFolder);
        console.log('Core files were copied successfully');
    } catch (err) {
        console.error(`An error occurred while copying core files: ${err}`);
    }
};

// Build dependencies
await run('npm run build', '../iron-remote-desktop');

let buildCommand = 'npm run build';
if (noWasm) {
    buildCommand = 'npm run build-alone';
}
await run(buildCommand, '../iron-remote-desktop-rdp');

await copyCoreFiles();

