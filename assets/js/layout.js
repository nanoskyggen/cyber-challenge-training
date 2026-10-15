/* ============================================================
   CYBER DEFENSE ACADEMY — Shared Page Chrome (topbar + footer)
   Injected into [data-chrome="topbar"] and [data-chrome="footer"]
   ============================================================ */

const CDA_LAYOUT = (() => {
  const NAV = [
    { href: 'portal.html',     label: 'Portal' },
    { href: 'cheatsheets.html', label: 'Cheat Sheets' },
    { href: 'checklists.html',  label: 'Checklists' },
    { href: 'about.html',       label: 'About' }
  ];

  const LOGO = `
    <svg class="logo" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#4ea8ff"/>
          <stop offset="1" stop-color="#7c5cff"/>
        </linearGradient>
      </defs>
      <path d="M24 3 41 10v12c0 11-7.4 19.3-17 23C14.4 41.3 7 33 7 22V10L24 3Z"
            fill="url(#lg)" opacity="0.18" stroke="url(#lg)" stroke-width="2"/>
      <path d="M24 14v10M19 19h10" stroke="#22d3ee" stroke-width="2.4" stroke-linecap="round"/>
      <circle cx="24" cy="24" r="10" stroke="#22d3ee" stroke-width="2" opacity="0.55"/>
    </svg>`;

  function topbar(active) {
    const links = NAV.map(n =>
      `<a href="${n.href}"${active && n.href.includes(active) ? ' class="active"' : ''}>${n.label}</a>`
    ).join('');
    return `
      <div class="topbar-inner">
        <a class="brand" href="index.html">
          ${LOGO}
          <span>
            <span class="brand-title">Cyber Defense Academy</span>
            <small>CyberPatriot &amp; CyberTitan Training</small>
          </span>
        </a>
        <button class="btn btn-sm nav-toggle" aria-label="Menu">☰</button>
        <nav class="navlinks">
          ${links}
          <a href="index.html" class="btn btn-sm" id="logoutBtn" title="Return to login">Log out</a>
          <button class="btn btn-sm btn-ghost" id="themeToggle" title="Toggle theme">🌙</button>
        </nav>
      </div>`;
  }

  function footer() {
    return `
      <div class="wrap">
        <div>
          <strong>Cyber Defense Academy</strong> — an independent, open training resource for
          CyberPatriot &amp; CyberTitan competitors. Not affiliated with or endorsed by the AFA or ICTC.
        </div>
        <div class="dim">
          Built for learning. Verify all commands against your own environment.
        </div>
      </div>`;
  }

  function mount(active) {
    const tb = document.querySelector('[data-chrome="topbar"]');
    if (tb) tb.innerHTML = topbar(active);
    const ft = document.querySelector('[data-chrome="footer"]');
    if (ft) ft.innerHTML = footer();
  }

  return { topbar, footer, mount, NAV };
})();
