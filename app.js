const electron = require('electron');
const ipc = electron.ipcRenderer;
const embed = document.getElementById('embed');

ipc.on('media-next-track', function () {
    embed.executeJavaScript('externalAPI.next()');
});

ipc.on('media-prev-track', function () {
    embed.executeJavaScript('externalAPI.prev()');
});

ipc.on('media-stop', function () {
    embed.executeJavaScript('externalAPI.stop()');
});

ipc.on('media-play-pause', function () {
    embed.executeJavaScript('externalAPI.togglePause()');
});

document.addEventListener('keydown', function(event) {
    console.log(event.keyCode);
});
