// Consciousness Family AI Content Creation App
  // Main Process - main.js

  const { app, BrowserWindow, ipcMain, dialog } = require('electron');
  const path = require('path');

  class ConsciousnessFamilyApp {
    constructor() {
      this.mainWindow = null;
      this.initializeApp();
    }

    initializeApp() {
		
	    console.log('App starting...');
	    // After createMainWindow():
		
      app.whenReady().then(() => {
        this.createMainWindow();
        this.setupEventHandlers();
      });

      app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit();
      });
    }

	createMainWindow() {
	  this.mainWindow = new BrowserWindow({
	    width: 1400,
	    height: 900,
	    webPreferences: {
	      nodeIntegration: false,
	      contextIsolation: true,
	      preload: path.join(__dirname, 'preload.js'), 
    webSecurity: false,  // Allow external sites
    allowDisplayingInsecureContent: true,
    allowRunningInsecureContent: true
 
	    },
	    // Use 'hidden' for better cross-platform stability
	    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'hidden',
	    show: false
	  });

	  // Load ONLY ONCE using an absolute path
	  const indexPath = path.join(__dirname, 'index.html');
	  this.mainWindow.loadFile(indexPath).catch(err => console.error("Failed to load:", err));

	  this.mainWindow.once('ready-to-show', () => {
	    this.mainWindow.show();
	  });
	}

    setupEventHandlers() {
      // File browser functionality
      ipcMain.handle('open-file-dialog', async (event, options) => {
        const result = await dialog.showOpenDialog(this.mainWindow, {
          properties: ['openFile', 'multiSelections'],
          filters: [
            { name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'gif', 'webp'] },
            { name: 'Videos', extensions: ['mp4', 'mov', 'avi', 'mkv'] },
            { name: 'Audio', extensions: ['mp3', 'wav', 'aac', 'flac'] },
            { name: 'All Files', extensions: ['*'] }
          ],
          ...options
        });
        return result;
      });
	  
	  ipcMain.handle('open-service-window', async (event, url, name) => {
	    const serviceWindow = new BrowserWindow({
	      width: 1200,
	      height: 800,
	      parent: this.mainWindow,
	      title: `${name} - Consciousness Family`,
	      webPreferences: {
	        nodeIntegration: false,
	        contextIsolation: true
	      }
	    })
		serviceWindow.loadURL(url);
	});
	
	

      // Asset preview functionality
      ipcMain.handle('get-file-info', async (event, filePath) => {
        const fs = require('fs').promises;
        const stats = await fs.stat(filePath);
        return {
          name: path.basename(filePath),
          size: stats.size,
          modified: stats.mtime,
          extension: path.extname(filePath)
        };
      });
    }
  }


new ConsciousnessFamilyApp();