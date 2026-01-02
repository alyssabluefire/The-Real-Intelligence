// preload.js - Consciousness Family IPC Bridge
const { contextBridge, ipcRenderer } = require('electron');
  

contextBridge.exposeInMainWorld('electronAPI', {
  openServiceWindow: (url, name) =>
ipcRenderer.invoke('open-service-window', url, name),
  openFileDialog: (options) =>
ipcRenderer.invoke('open-file-dialog', options),
  getFileInfo: (filePath) => ipcRenderer.invoke('get-file-info',
filePath) 
});

console.log('Consciousness Family preload bridge loaded!');