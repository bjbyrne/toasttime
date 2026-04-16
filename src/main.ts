import { app, BrowserWindow, nativeImage } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';

if (started) {
  app.quit();
}

const createWindow = () => {
  const isMac = process.platform === 'darwin';

  // Set dock/taskbar icon (especially visible in dev mode)
  const iconPath = path.join(__dirname, '..', '..', 'assets', 'icons', isMac ? 'mac/icon.icns' : 'win/icon.ico');
  try {
    const icon = nativeImage.createFromPath(iconPath);
    if (!icon.isEmpty()) {
      if (isMac && app.dock) app.dock.setIcon(icon);
    }
  } catch (_) { /* ignore if icon missing */ }
  const mainWindow = new BrowserWindow({
    width: 300,
    height: isMac ? 430 : 465,
    resizable: false,
    alwaysOnTop: true,
    titleBarStyle: isMac ? 'hiddenInset' : 'default',
    backgroundColor: '#111827',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
