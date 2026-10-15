// Applies the saved or system theme before first paint. Loaded as an external file because the site CSP blocks inline scripts.
try{const t=localStorage.getItem('dracars-theme');document.documentElement.dataset.theme=t==='light'||t==='dark'?t:matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}catch{}
