(() => {
  const root = document.documentElement;
  const button = document.querySelector('.theme-toggle');
  const label = button?.querySelector('span');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');

  function applyTheme(theme, persist = false) {
    root.dataset.theme = theme;
    if (persist) {
      try { localStorage.setItem('dracars-theme', theme); } catch {}
    }
    if (button && label) {
      const next = theme === 'dark' ? 'light' : 'dark';
      label.textContent = `${next[0].toUpperCase()}${next.slice(1)} mode`;
      button.setAttribute('aria-label', `Switch to ${next} mode`);
      button.title = `Switch to ${next} mode`;
    }
    document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
      meta.content = theme === 'dark' ? '#160f18' : '#eee2e7';
      meta.removeAttribute('media');
    });
  }

  const initialTheme = root.dataset.theme === 'dark'
    ? 'dark'
    : root.dataset.theme === 'light'
      ? 'light'
      : systemTheme.matches ? 'dark' : 'light';
  applyTheme(initialTheme);
  button?.addEventListener('click', () => {
    applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true);
  });
  systemTheme.addEventListener('change', (event) => {
    let saved;
    try { saved = localStorage.getItem('dracars-theme'); } catch {}
    if (saved !== 'light' && saved !== 'dark') applyTheme(event.matches ? 'dark' : 'light');
  });
  if (button) root.classList.add('theme-ready');
})();
