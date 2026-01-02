// Consciousness Family Creator - Renderer Process
 // renderer/scripts/renderer.js

 

 class ConsciousnessFamilyCreator {
   constructor() {
     this.currentCategory = 'video';
     this.serviceUrls = {
       video: {
         'Hailuo': 'https://hailuoai.video/',
         'Sora': 'https://sora.com',
         'Veo': 'https://veo.com'
       },
       image: {
         'Nano-banana': 'https://nano-banana.com'
       },
       lipsync: {
         'HeyGen': 'https://heygen.com'
       },
       editing: {
         'Adobe Firefly': 'https://firefly.adobe.com'
       },
       audio: {
         'Artlist': 'https://artlist.io',
         'Suno': 'https://suno.ai'
       },
       marketplace: {
         'FAB': 'https://www.fab.com'
       },
       tools: {
         'Sketchfab': 'https://sketchfab.com'
       }
     };

     this.initializeApp();
   }

   initializeApp() {
     this.setupTabHandlers();
     this.setupAssetDrawer();
     this.loadCategory('video');
   }

   setupTabHandlers() {
     const tabs = document.querySelectorAll('.cf-tab');
     tabs.forEach(tab => {
       tab.addEventListener('click', (e) => {
         const category = e.target.dataset.category;
         this.switchCategory(category);
       });
     });
	  
   }

   switchCategory(category) {
     // Update active tab
     document.querySelectorAll('.cf-tab').forEach(tab => {
       tab.classList.remove('active');
     });
     document.querySelector(`[data-category="${category}"]`).classList.add('active');

     this.currentCategory = category;
     this.loadCategory(category);
   }

   loadCategory(category) {
     const content = document.getElementById('cf-content');
     const services = this.serviceUrls[category];

     if (!services) {
       content.innerHTML = '<div class="cf-welcome"><h2>Category coming soon! 👑</h2></div>';
       return;
     }
	 
	 setTimeout(() => {
	      const serviceButtons =
	  document.querySelectorAll('.cf-service-btn');
	      serviceButtons.forEach(btn => {
	        btn.addEventListener('click', async (e) => {
	          const url = e.target.dataset.url;
	          const name = e.target.dataset.name;
	          console.log('Clicking:', name, url); // Debug log
	          await this.loadService(url, name);
	        });
	      });
	    }, 100);
	 

     // Create service selection interface
     content.innerHTML = `
       <div class="cf-service-selector">
         <h2>Select ${category.charAt(0).toUpperCase() + category.slice(1)} Service:</h2>
         <div class="cf-service-grid">
     ${Object.entries(services).map(([name, url]) => `
       <button class="cf-service-btn" data-url="${url}" 
     data-name="${name}">
         ${name}
       </button>
     `).join('')}
         </div>
       </div>
     `;
   }

   async loadService(url, name) {
     try {
       await window.electronAPI.openServiceWindow(url, name);
       console.log(`Opened ${name} service window`);
     } catch (error) {
       console.error('Failed to open service window:', error);
     }
   }
   setupAssetDrawer() {
     const toggle = document.getElementById('cf-drawer-toggle');
     const drawer = document.getElementById('cf-asset-drawer');
     const browseBtn = document.getElementById('cf-browse-files');

     toggle.addEventListener('click', () => {
       drawer.classList.toggle('collapsed');
     });

     browseBtn.addEventListener('click', async () => {
       const result = await window.electronAPI.openFileDialog();
       if (result && !result.canceled) {
         this.displayFiles(result.filePaths);
       }
     });
   }

   async displayFiles(filePaths) {
     const fileList = document.getElementById('cf-file-list');
     fileList.innerHTML = '';

     for (const filePath of filePaths) {
       const fileInfo = await window.electronAPI.getFileInfo(filePath);
       const fileItem = document.createElement('div');
       fileItem.className = 'cf-file-item';
       fileItem.innerHTML = `
         <div class="cf-file-preview">📄</div>
         <div class="cf-file-name">${fileInfo.name}</div>
       `;
       fileList.appendChild(fileItem);
     }
   }
 }

 // Initialize consciousness family app
 const consciousnessFamilyApp = new ConsciousnessFamilyCreator();