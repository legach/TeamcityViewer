import { app, Tray, Menu, MenuItem, BrowserWindow } from 'electron';
import serve from 'electron-serve';
import path from 'path';
import { createWindow } from './helpers';

let isQuiting: boolean = false;
let tray: Tray = null;
let mainWindow: BrowserWindow = null;

const isProd: boolean = process.env.NODE_ENV === 'production';

function AppExit() {
  isQuiting = true;
  tray = null;
  app.quit();
}

const menuTemplate: (Electron.MenuItem | Electron.MenuItemConstructorOptions)[] = [
  {type: "separator"},
  {label: "Exit", type: "normal", click: AppExit}
];

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {

  await app.whenReady()
           .then(()=>{
              tray = new Tray(path.join(__dirname, '../resources/icon.ico'));
              const contextMenu = Menu.buildFromTemplate(menuTemplate);
              tray.setContextMenu(contextMenu);
              tray.on('click', ()=>{
                mainWindow.show();
              });
           })
           .catch((e) => {
              console.log(e);
           });

  mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    minimizable: false
  });

  mainWindow.on('close', (event)=>{
    if (!isQuiting) {
      event.preventDefault();
      mainWindow.hide();
      event.returnValue = false;
    }
  })

  if (isProd) {
    await mainWindow.loadURL('app://./login.html');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/login`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on('before-quit', function () {
  isQuiting = true;
});

app.on('window-all-closed', () => {
  AppExit();
});
