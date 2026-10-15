/* ============================================================
   CYBER DEFENSE ACADEMY — Shared App Logic
   ============================================================ */

const CDA = (() => {
  const LS = {
    progress: 'cda.progress',      // { moduleId: {slides:[], quiz:score, done:bool} }
    theme: 'cda.theme',
    lastVisit: 'cda.lastVisit',
    lang: 'cda.lang'
  };

  /* ---------- i18n helpers ---------- */
  function lang() {
    if (typeof CDA_I18N !== 'undefined') return CDA_I18N.lang();
    try { return localStorage.getItem(LS.lang) || 'en'; } catch (e) { return 'en'; }
  }
  function t(key, fb) {
    if (typeof CDA_I18N !== 'undefined') return CDA_I18N.t(key, fb);
    return fb != null ? fb : key;
  }
  function tf(key, vars, fb) {
    if (typeof CDA_I18N !== 'undefined') return CDA_I18N.tf(key, vars, fb);
    return fb != null ? fb : key;
  }
  /* Select the active-language dataset (EN default, FR when toggled) */
  function data() {
    if (lang() === 'fr' && window.CDA_DATA_FR) return window.CDA_DATA_FR;
    return window.CDA_DATA;
  }

  function readJSON(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch (e) { return fallback; }
  }
  function writeJSON(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
  }

  /* ---------- Progress ---------- */
  function getProgress() { return readJSON(LS.progress, {}); }
  function getModuleProgress(id) { return getProgress()[id] || { slides: [], quiz: null, done: false }; }
  function saveModuleProgress(id, patch) {
    const all = getProgress();
    all[id] = Object.assign({ slides: [], quiz: null, done: false }, all[id] || {}, patch);
    writeJSON(LS.progress, all);
    return all[id];
  }
  function markSlideViewed(id, slideIndex) {
    const p = getModuleProgress(id);
    if (!p.slides.includes(slideIndex)) p.slides.push(slideIndex);
    saveModuleProgress(id, { slides: p.slides });
  }
  function isModuleComplete(id, totalSlides) {
    const p = getModuleProgress(id);
    const viewedAll = totalSlides ? p.slides.length >= totalSlides : true;
    return viewedAll && p.quiz !== null;
  }
  function setQuizScore(id, score, total) {
    saveModuleProgress(id, { quiz: { score, total, at: Date.now() } });
  }
  function overallStats(modules) {
    let done = 0, quizzes = 0, slidesViewed = 0, totalSlides = 0;
    modules.forEach(m => {
      const p = getModuleProgress(m.id);
      totalSlides += (m.slides || 0);
      slidesViewed += p.slides.length;
      if (p.quiz !== null) quizzes++;
      if (isModuleComplete(m.id, m.slides)) done++;
    });
    return { done, total: modules.length, quizzes, slidesViewed, totalSlides,
             pct: modules.length ? Math.round((done / modules.length) * 100) : 0 };
  }
  function resetProgress() { writeJSON(LS.progress, {}); }

  /* ---------- Theme ---------- */
  function applyTheme() {
    const t = localStorage.getItem(LS.theme) || 'dark';
    document.documentElement.setAttribute('data-theme', t);
  }
  function toggleTheme() {
    const cur = localStorage.getItem(LS.theme) || 'dark';
    const next = cur === 'dark' ? 'light' : 'dark';
    localStorage.setItem(LS.theme, next);
    applyTheme();
    return next;
  }

  /* ---------- Nav ---------- */
  function initNav(active) {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.navlinks');
    if (toggle && links) toggle.addEventListener('click', () => links.classList.toggle('open'));
    if (active) {
      document.querySelectorAll('.navlinks a').forEach(a => {
        if (a.getAttribute('href') && a.getAttribute('href').includes(active)) a.classList.add('active');
      });
    }
    const tt = document.querySelector('#themeToggle');
    if (tt) tt.addEventListener('click', () => { const n = toggleTheme(); tt.textContent = n === 'dark' ? '🌙' : '☀️'; });
    const rt = document.querySelector('#resetProgress');
    if (rt) rt.addEventListener('click', () => {
      if (confirm(t('portal.reset.confirm'))) { resetProgress(); location.reload(); }
    });
  }

  /* ---------- Code copy ---------- */
  function initCopyButtons(root) {
    (root || document).querySelectorAll('pre').forEach(pre => {
      if (pre.querySelector('.copy-btn')) return;
      const btn = document.createElement('button');
      btn.className = 'copy-btn'; btn.type = 'button'; btn.textContent = t('copy.btn', 'Copy');
      btn.addEventListener('click', () => {
        const text = pre.querySelector('code') ? pre.querySelector('code').innerText : pre.innerText;
        navigator.clipboard.writeText(text).then(() => {
          btn.textContent = t('copy.done', 'Copied!'); setTimeout(() => btn.textContent = t('copy.btn', 'Copy'), 1400);
        });
      });
      pre.appendChild(btn);
    });
  }

  /* ---------- Escape ---------- */
  function esc(s) { return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

  /* ---------- Search ---------- */
  function searchModules(modules, q) {
    q = q.trim().toLowerCase();
    if (!q) return modules;
    return modules.filter(m =>
      m.title.toLowerCase().includes(q) ||
      (m.summary || '').toLowerCase().includes(q) ||
      (m.track || '').toLowerCase().includes(q) ||
      (m.tags || []).join(' ').toLowerCase().includes(q)
    );
  }

  return {
    getProgress, getModuleProgress, saveModuleProgress, markSlideViewed,
    isModuleComplete, setQuizScore, overallStats, resetProgress,
    applyTheme, toggleTheme, initNav, initCopyButtons, esc, searchModules, LS,
    lang, t, tf, data
  };
})();

document.addEventListener('DOMContentLoaded', () => CDA.applyTheme());
