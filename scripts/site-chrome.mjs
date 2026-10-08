// Shared static site chrome, rendered at build time (no browser JavaScript required).
export function siteHeader(path) {
  const current = path === '/' ? 'tools' : path.startsWith('/build-logs') ? 'build-logs' : 'guides';
  return `    <a class="skip-link" href="#content">Skip to content</a>
    <a class="github-corner" href="https://github.com/cdracars" target="_blank" rel="noreferrer" aria-label="Visit Cody Dracars on GitHub" title="GitHub">
      <svg viewBox="0 0 250 250" aria-hidden="true" focusable="false">
        <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" />
        <path class="octo-arm" d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" />
        <path class="octo-body" d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.6 C171.4,40.6 176.1,42.5 178.8,56.2 C183.8,58.6 187.2,61.8 189.8,65.4 C203.1,64.1 206.7,69.9 206.7,69.9 C203.7,78.2 197.8,81.0 196.1,81.4 C196.4,87.8 194.4,93.4 189.8,98.1 C173.7,114.2 159.5,107.5 149.9,99.4 C150.1,101.8 149.3,104.9 146.9,108.1 L133.0,121.9 C131.9,123.0 133.3,126.8 133.4,126.8 Z" />
      </svg>
    </a>
    <header class="site-header">
      <a class="wordmark" href="/" aria-label="dracars home">
        <img class="brand-lockup" src="/dracars-wordmark.webp" alt="" width="96" height="32" />
      </a>
      <nav class="site-nav" aria-label="Site">
        <a href="/"${current === 'tools' ? ' aria-current="page"' : ''}>Tools</a>
        <a href="/build-logs/"${current === 'build-logs' ? ' aria-current="page"' : ''}>Build Logs</a>
        <a href="/guides/"${current === 'guides' ? (path === '/guides/' ? ' aria-current="page"' : ' aria-current="true"') : ''}>Guides</a>
      </nav>
    </header>`;
}

export function siteFooter() {
  return `    <footer class="site-footer">
      <div class="footer-main">
        <span>Built by Cody Dracars.</span>
        <a href="https://github.com/cdracars" target="_blank" rel="noreferrer">There’s more over on GitHub <span aria-hidden="true">↗</span></a>
      </div>
      <p class="footer-disclosure">Guides may include affiliate links, disclosed on the page. Recommendations come first; links are added only where they fit.</p>
    </footer>`;
}
