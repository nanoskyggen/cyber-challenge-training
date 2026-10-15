/* ============================================================
   CYBER DEFENSE ACADEMY — Shared Page Chrome (topbar + footer)
   Injected into [data-chrome="topbar"] and [data-chrome="footer"]
   Bilingual (EN / FR-CA) via CDA_I18N
   ============================================================ */

const CDA_LAYOUT = (() => {
  const NAV = [
    { href: 'portal.html',     key: 'nav.portal' },
    { href: 'cheatsheets.html', key: 'nav.cheatsheets' },
    { href: 'checklists.html',  key: 'nav.checklists' },
    { href: 'about.html',       key: 'nav.about' }
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

  function T(key) { return (typeof CDA_I18N !== 'undefined') ? CDA_I18N.t(key) : key; }

  function topbar(active) {
    const links = NAV.map(n =>
      `<a href="${n.href}"${active && n.href.includes(active) ? ' class="active"' : ''}>${T(n.key)}</a>`
    ).join('');
    const langLabel = (typeof CDA_I18N !== 'undefined' && CDA_I18N.lang() === 'fr') ? '🌐 EN' : '🌐 FR';
    return `
      <div class="topbar-inner">
        <a class="brand" href="index.html">
          ${LOGO}
          <span>
            <span class="brand-title">${T('brand.title')}</span>
            <small>${T('brand.sub')}</small>
          </span>
        </a>
        <button class="btn btn-sm nav-toggle" aria-label="Menu">☰</button>
        <nav class="navlinks">
          ${links}
          <button class="btn btn-sm btn-ghost" id="langToggle" title="${T('lang.toggle')}">${langLabel}</button>
          <a href="index.html" class="btn btn-sm" id="logoutBtn" title="${T('nav.logout.title')}">${T('nav.logout')}</a>
          <button class="btn btn-sm btn-ghost" id="themeToggle" title="${T('theme.toggle')}">🌙</button>
        </nav>
      </div>`;
  }

  function footer() {
    return `
      <div class="wrap">
        <div>
          ${T('footer.about')}
        </div>
        <div class="dim">
          ${T('footer.built')}
        </div>
      </div>`;
  }

  function mount(active) {
    const tb = document.querySelector('[data-chrome="topbar"]');
    if (tb) tb.innerHTML = topbar(active);
    const ft = document.querySelector('[data-chrome="footer"]');
    if (ft) ft.innerHTML = footer();
    if (typeof CDA_I18N !== 'undefined') CDA_I18N.initToggle();
  }

  return { topbar, footer, mount, NAV };
})();
