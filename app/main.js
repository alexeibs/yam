'use strict';

const electron = require('electron');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const globalShortcut = electron.globalShortcut;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let willAppQuit = false;

// console.log(app.getPath('userData') + '/config.json');

const inCurrentDir = appends => 'file://' + __dirname + appends;

const createWindow = () => {
  mainWindow = new BrowserWindow({width: 1080, height: 700,
    icon: inCurrentDir('/icons/source_colored_png/256x256.png')});
  mainWindow.loadURL(inCurrentDir('/index.html'));
  
  // mainWindow.webContents.openDevTools();

  mainWindow.on('close', event => {
    if (willAppQuit) {
      // saveWindowState();
    } else {
      event.preventDefault();
      switch(process.platform) {
        case 'win32':
        case 'linux':
          mainWindow.minimize();
          break;
        case 'darwin':
          mainWindow.hide();
          break;
        default:
      } 
    }
  });

  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  globalShortcut.register('MediaNextTrack', () => {
    mainWindow.webContents.send('media-next-track');
  });
  
  globalShortcut.register('MediaPreviousTrack', () => {
    mainWindow.webContents.send('media-prev-track');
  });
  
  globalShortcut.register('MediaStop', () => {
    mainWindow.webContents.send('media-stop');
  });
  
  globalShortcut.register('MediaPlayPause', () => {
    mainWindow.webContents.send('media-play-pause');
  });

  globalShortcut.register('CommandOrControl+Alt+Right', () => {
    mainWindow.webContents.send('media-next-track');
  });
  
  globalShortcut.register('CommandOrControl+Alt+Left', () => {
    mainWindow.webContents.send('media-prev-track');
  });
  
  globalShortcut.register('CommandOrControl+Alt+Space', () => {
    mainWindow.webContents.send('media-play-pause');
  });

  globalShortcut.register('CommandOrControl+Alt+Up', () => {
    mainWindow.webContents.send('media-volume-increase');
  });

  globalShortcut.register('CommandOrControl+Alt+Down', () => {
    mainWindow.webContents.send('media-volume-decrease');
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // if (process.platform !== 'darwin') {
  //   app.quit();
  // }
//   globalShortcut.unregisterAll();
});

app.on('before-quit', () => {
  willAppQuit = true;
});

// For OSX, show hidden mainWindow when clicking dock icon.
app.on('activate', event => {
  mainWindow.show();
});
