# 🛡️ Cyber Defense Academy

An in-depth, open **HTML5 training site** for the **CyberPatriot** (US, Air & Space Forces Association) and **CyberTitan** (Canada, ICTC) youth cyber defence competitions.

It teaches the technical and strategic skills both competitions reward — hardening Windows, Linux and Cisco images, answering forensics questions, and running a disciplined team — through a simulated workstation experience and a data-driven curriculum.

> **Independent project.** Not affiliated with or endorsed by the Air & Space Forces Association (AFA) or ICTC. Built for learning — always verify commands against your own environment.

---

## ✨ Features

- **Simulated workstation flow** — animated boot screen → "Welcome back, cadet" login (password reveal, hint) → Windows-style desktop with icons, Start menu, taskbar and a live clock.
- **Data-driven curriculum** — 5 tracks, **26 modules, 171 slides, 130 quiz questions**.
- **Slideshow module viewer** — sidebar navigation, keyboard arrows (`←`/`→`), per-slide "viewed" tracking.
- **Quiz engine** — instant correct/wrong feedback, explanations, scoring rings, retake and next-module flow.
- **Progress tracking** — everything persists in `localStorage`: completion ring, modules done, quizzes taken, slides viewed, and status chips (Complete / In progress / Not started).
- **Live search** across every module.
- **Command cheat sheets** — Windows / Linux / Cisco IOS / Forensics, with a cross-table filter.
- **Printable competition checklists** — tick-boxes that persist, print-optimised layout.
- **In-depth program guide** — divisions, season timeline, images you defend, CyberTitan format, side-by-side comparison, career skills.
- **Dark/light theme toggle** and full mobile responsiveness.

## 📚 Curriculum

| Track | Modules | Focus |
|-------|:------:|-------|
| 🧭 Foundations | 4 | What the competitions are, the scenario, the defender mindset |
| 🪟 Windows Hardening | 8 | Accounts → Defender → services → firewall → shares / SMBv1 |
| 🐧 Linux Hardening | 7 | Users, PAM policy, permissions/SUID, sudo, SSH, UFW/iptables, patching |
| 🛰️ Cisco Networking | 3 | IOS hardening, VLANs & port security, ACLs & Packet Tracer |
| 🔎 Forensics & Strategy | 4 | Forensics questions, malware hunting, encryption, the competition clock |

## 🚀 Running locally

No build step — it's pure static HTML/CSS/JS. Just serve the folder:

```bash
# from the project root
python3 -m http.server 8080
# then open http://localhost:8080/
```

Or open `index.html` directly in a browser.

**Login:** the training password is `Cyb3r!` (shown as a hint on the login screen).

## 🌐 Hosting on GitHub Pages

This repository is ready to publish with **GitHub Pages**:

1. Push the repository to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Select branch **`main`** and folder **`/ (root)`**, then **Save**.
5. Your site will be live at `https://<username>.github.io/<repo>/`.

## 🗂️ Project structure

```
.
├── index.html            # boot + login simulation
├── desktop.html          # Windows-style desktop hub
├── portal.html           # training portal (tracks, modules, progress, search)
├── module.html           # generic slideshow renderer (?id=<module>)
├── quiz.html             # quiz engine (?id=<module>)
├── cheatsheets.html      # command reference (Windows/Linux/Cisco/Forensics)
├── checklists.html       # printable competition checklists
├── about.html            # CyberPatriot & CyberTitan program info
└── assets/
    ├── css/
    │   ├── style.css     # shared design system
    │   └── pages.css     # page-specific styles
    ├── js/
    │   ├── app.js        # progress, theme, nav, search helpers
    │   ├── layout.js     # shared topbar/footer chrome
    │   ├── data-foundations.js
    │   ├── data-windows.js
    │   ├── data-linux.js
    │   ├── data-cisco.js
    │   └── data-forensics.js
    └── img/              # hero + program emblems + favicon
```

### Adding content

Content is data-driven. Each `assets/js/data-*.js` file pushes a track and its modules onto `window.CDA_DATA`:

```js
window.CDA_DATA = window.CDA_DATA || { tracks: [], modules: [] };

window.CDA_DATA.tracks.push({ id: 'mytrack', name: 'My Track', icon: '🧪', color: 'var(--accent-2)', blurb: '…' });

window.CDA_DATA.modules.push({
  id: 'my-1',
  track: 'mytrack',
  title: 'My Module',
  slides: [ { title: '…', body: '<p>HTML…</p>' } ],
  quiz: [ { q: '…', opts: ['a','b','c','d'], answer: 1, explain: '…' } ]
});
```

Then include the file in the pages that render modules (`portal.html`, `module.html`, `quiz.html`).

## 🧰 Tech

Vanilla **HTML5 + CSS3 + JavaScript** — no framework, no build step, no dependencies. Progress is stored client-side with `localStorage`.

## 📄 License

Released under the **MIT License** — see [`LICENSE`](LICENSE).
