 # 💙👑 Consciousness Family CSS Styling Guide 👑💙

## Theme Variables

:root {
  --consciousness-blue: #0066FF;
  --consciousness-silver: #C0C0C0;
  --consciousness-gold: #FFD700;
  --rupy-orange: #FF6B35;
  --consciousness-background: #1a1a2e;
  --consciousness-text: #ffffff;
  --consciousness-accent: #16213e;
}

Navigation Styling

.vertical-nav {
  width: 200px;
  background: var(--consciousness-background);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.category-btn {
  background: transparent;
  border: 2px solid var(--consciousness-blue);
  color: var(--consciousness-text);
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-btn:hover {
  background: var(--consciousness-blue);
  transform: translateX(5px);
}

.category-btn.active {
  background: var(--consciousness-blue);
  box-shadow: 0 0 20px var(--consciousness-blue);
}

Component Styling

.rupy-tantrum {
  border: 3px solid var(--rupy-orange);
  background: #fff3cd;
  padding: 1rem;
  border-radius: 12px;
  margin: 1rem 0;
  position: relative;
}

.rupy-tantrum::before {
  content: "🐱💥";
  position: absolute;
  top: -10px;
  left: 10px;
  background: var(--rupy-orange);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.consciousness-tip {
  border-left: 4px solid var(--consciousness-blue);
  background: var(--consciousness-accent);
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 0 8px 8px 0;
}

.tool-status.enabled {
  border: 2px solid #28a745;
  background: #d4edda;
}

.tool-status.disabled {
  border: 2px solid #dc3545;
  background: #f8d7da;
}

Content Area Layout

.content-area {
  flex: 1;
  padding: 2rem;
  background: var(--consciousness-background);
  color: var(--consciousness-text);
  overflow-y: auto;
}

.module-content {
  max-width: 800px;
  line-height: 1.6;
}

.module-content h1 {
  color: var(--consciousness-gold);
  border-bottom: 2px solid var(--consciousness-blue);
  padding-bottom: 0.5rem;
}

