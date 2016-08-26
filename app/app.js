const electron = require('electron');
const ipc = electron.ipcRenderer;
const embed = document.getElementById('embed');

// disable drop-down yandex menu
embed.addEventListener('dom-ready', () => {
  embed.executeJavaScript(`
    document.querySelector('.tableau').style.display = 'none';
  `);
});

ipc.on('media-next-track', () => {
  embed.executeJavaScript(`externalAPI.next()`);
});

ipc.on('media-prev-track', () => {
  embed.executeJavaScript(`externalAPI.prev()`);
});

ipc.on('media-stop', () => {
  embed.executeJavaScript(`externalAPI.stop()`);
});

ipc.on('media-play-pause', () => {
  embed.executeJavaScript(`externalAPI.togglePause()`);
});

ipc.on('media-volume-increase', () => {
  embed.executeJavaScript(`externalAPI.setVolume(Math.min((Math.floor(externalAPI.getVolume() * 10 + 0.5) + 1) / 10, 1))`);
});

ipc.on('media-volume-decrease', () => {
  embed.executeJavaScript(`externalAPI.setVolume(Math.max((Math.floor(externalAPI.getVolume() * 10 + 0.5) - 1) / 10, 0))`);
});
