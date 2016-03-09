'use strict';

const electron = require('electron');

const app = electron.app;
// const ipc = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;
const globalShortcut = electron.globalShortcut;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let willAppQuit = false;

function createWindow() {
  mainWindow = new BrowserWindow({width: 1000, height: 700});
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  
  // mainWindow.webContents.openDevTools();

  mainWindow.on('close', function(event) {
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

  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  globalShortcut.register('MediaNextTrack', function() {
    mainWindow.webContents.send('media-next-track');
  });
  
  globalShortcut.register('MediaPreviousTrack', function() {
    mainWindow.webContents.send('media-prev-track');
  });
  
  globalShortcut.register('MediaStop', function() {
    mainWindow.webContents.send('media-stop');
  });
  
  globalShortcut.register('MediaPlayPause', function() {
    mainWindow.webContents.send('media-play-pause');
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // if (process.platform !== 'darwin') {
  //   app.quit();
  // }
//   globalShortcut.unregisterAll();
});

app.on('before-quit', function() {
  willAppQuit = true;
});

// For OSX, show hidden mainWindow when clicking dock icon.
app.on('activate', function(event) {
  mainWindow.show();
});
