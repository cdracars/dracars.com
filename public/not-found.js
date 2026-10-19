// Fills the 404 console with the requested path and a timestamp. The page reads fine without it.
(() => {
  const raw = location.pathname + location.search;
  let path = raw;
  try { path = decodeURIComponent(raw); } catch {} // A malformed escape such as /%E0 would otherwise stop the script.
  document.querySelectorAll('[data-requested-path]').forEach((node) => { node.textContent = path; });
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  document.querySelectorAll('[data-console-time]').forEach((node) => { node.textContent = time; });
})();
