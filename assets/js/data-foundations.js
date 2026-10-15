/* ============================================================
   DATA — Foundations Track
   ============================================================ */
window.CDA_DATA = window.CDA_DATA || { tracks: [], modules: [] };

window.CDA_DATA.tracks.push(
  { id: 'foundations', name: 'Foundations', icon: '🧭', color: 'var(--t-found)',
    blurb: 'What the competitions are, how operating systems and virtualization work, the security principles behind every fix, and how a competition round is actually run.' },
  { id: 'windows', name: 'Windows Hardening', icon: '🪟', color: 'var(--t-win)',
    blurb: 'Accounts, password policy, Defender, updates, services, software, Group Policy, firewall and file permissions on Windows 10/11 and Server.' },
  { id: 'linux', name: 'Linux Hardening', icon: '🐧', color: 'var(--t-linux)',
    blurb: 'Users and groups, PAM password policy, permissions, sudo, SSH, firewalls, packages and services on Ubuntu, Mint and Debian.' },
  { id: 'cisco', name: 'Cisco Networking', icon: '🛰️', color: 'var(--t-cisco)',
    blurb: 'Cisco IOS hardening, switching with VLANs and port security, routing, ACLs and the Packet Tracer challenge.' },
  { id: 'forensics', name: 'Forensics & Strategy', icon: '🔎', color: 'var(--t-forensics)',
    blurb: 'Answering forensics questions, hunting malware and suspicious files, encryption, and the team strategy that wins rounds.' }
);

window.CDA_DATA.modules.push(
  /* ===================== FOUND 1 ===================== */
  {
    id: 'found-1', track: 'foundations', num: 1,
    title: 'Welcome to the Cyber Arena',
    summary: 'Meet CyberPatriot and CyberTitan: who runs them, who can compete, and why hardening real machines is the best way to learn defense.',
    tags: ['cyberpatriot', 'cybertitan', 'intro', 'overview', 'afa', 'ictc'],
    slides: [
      { title: 'Welcome, Defender', html: `
        <p>In this module you will learn what <strong>CyberPatriot</strong> and <strong>CyberTitan</strong> are, how they differ, and why they are the best possible place to start a career in cybersecurity. By the end you will understand the shape of the competition you are preparing for and the mindset you need to succeed.</p>
        <p>Both programs put you in the shoes of a newly hired IT professional. A company's previous administrator left in a hurry, the systems are a mess, and it is your job to secure them &mdash; <em>without breaking the services the business depends on.</em> That last clause is the heart of the whole competition.</p>
        <div class="callout tip"><strong>Defense, not offense.</strong> Unlike a capture-the-flag event, you are not breaking into anything. You are the person who cleans up, locks the doors, and writes down what changed. Every scored action makes a machine <em>more</em> secure.</div>
      ` },
      { title: 'What Is CyberPatriot?', html: `
        <p><strong>CyberPatriot</strong> is the National Youth Cyber Education Program created by the <strong>Air &amp; Space Forces Association (AFA)</strong>. Its flagship event, the <em>National Youth Cyber Defense Competition</em>, is the largest youth cyber defense competition in the United States.</p>
        <p>It began in 2009 as a proof-of-concept with eight Air Force JROTC and Civil Air Patrol teams. Today it regularly draws <strong>4,000&ndash;5,000 teams</strong> from all 50 states and several international locations. The scoring engine and the virtual machines are built with the <strong>Center for Infrastructure Assurance and Security (CIAS)</strong> at the University of Texas at San Antonio.</p>
        <div class="pillarGrid">
          <div class="pillarCard"><h3>Who runs it</h3><ul><li>Air &amp; Space Forces Association</li><li>Arlington, Virginia</li><li>Presenting sponsor: Northrop Grumman Foundation</li></ul></div>
          <div class="pillarCard"><h3>Who competes</h3><ul><li>High school (Open Division)</li><li>JROTC / CAP / Sea Cadets (All Service)</li><li>Middle school &amp; junior high</li></ul></div>
          <div class="pillarCard"><h3>The format</h3><ul><li>Monthly 4-hour online rounds</li><li>Harden Windows &amp; Linux images</li><li>Cisco networking challenge</li><li>In-person National Finals</li></ul></div>
        </div>
      ` },
      { title: 'What Is CyberTitan?', html: `
        <p><strong>CyberTitan</strong> is Canada's largest youth cyber defence competition, run by the <strong>Information and Communications Technology Council (ICTC)</strong>. It gives middle and secondary school students hands-on experience in simulated cyber threat environments.</p>
        <p>CyberTitan is a sister program to CyberPatriot. Canadian teams train on the same style of hardening challenges and many compete inside CyberPatriot's structure as well. The season runs from <strong>October to February</strong>, culminating in a national finale in May. Registration is open April to October, and a school can enrol up to <strong>five teams of two to six players</strong>.</p>
        <div class="callout"><strong>One skillset, two badges.</strong> Whether you wear the CyberPatriot star or the CyberTitan maple leaf, the technical skills are identical: know who should be on the system, what they may do, and how to prove it. Everything in this academy applies to both.</div>
        <p>CyberTitan's partners include the <strong>Communications Security Establishment (CSE)</strong> and industry sponsors, which means the scenarios reflect real Canadian threat landscapes.</p>
      ` },
      { title: 'How the Two Compare', html: `
        <p>The table below summarizes the differences at a glance. The technical content &mdash; the part you actually practise &mdash; overlaps almost completely.</p>
        <div class="table-wrap"><table>
          <thead><tr><th>Feature</th><th>CyberPatriot</th><th>CyberTitan</th></tr></thead>
          <tbody>
            <tr><td>Run by</td><td>Air &amp; Space Forces Association (US)</td><td>ICTC (Canada)</td></tr>
            <tr><td>Audience</td><td>US high school &amp; middle school, JROTC/CAP</td><td>Canadian middle &amp; secondary school</td></tr>
            <tr><td>Season</td><td>October &ndash; March</td><td>October &ndash; May</td></tr>
            <tr><td>Team size</td><td>2&ndash;6 (5 compete at once)</td><td>2&ndash;6 per team, up to 5 teams/school</td></tr>
            <tr><td>Core challenge</td><td>Windows + Linux images, Cisco</td><td>Hardening images in simulated environments</td></tr>
            <tr><td>Rounds</td><td>Practice, Training, Qualifiers, State, Semis, Finals</td><td>Online rounds + national finale</td></tr>
          </tbody>
        </table></div>
      ` },
      { title: 'The Scenario You Will Face', html: `
        <p>Every image ships with a <strong>README</strong> file that describes the company and its rules. It is the single most important document in the round, because it tells you what the "correct" system looks like. A typical README says things like:</p>
        <ul>
          <li>"The following users are authorized on this system: alice (administrator), bob, carol."</li>
          <li>"The company runs a web server on port 80 &mdash; do not remove it."</li>
          <li>"Only administrators may install software."</li>
          <li>"Password length must be at least 12 characters."</li>
        </ul>
        <p>Your job is to compare <em>reality</em> against the README and close the gap. If a user is on the system who is not listed, remove them. If the README says a service must stay up, harden it rather than delete it.</p>
        <div class="callout danger"><strong>Penalties are real.</strong> Deleting a user or shutting down a service the scenario needs <em>loses</em> points. Points come back when you undo the mistake, but the clock does not. Read before you cut.</div>
      ` },
      { title: 'The Skills You Will Build', html: `
        <p>Competition work is system administration done carefully. Across a season you will learn to:</p>
        <div class="pillarGrid">
          <div class="pillarCard"><h3>Identity &amp; Access</h3><ul><li>Create/remove users &amp; groups</li><li>Enforce password &amp; lockout policy</li><li>Least privilege &amp; sudo</li></ul></div>
          <div class="pillarCard"><h3>Hardening</h3><ul><li>Firewalls</li><li>Disable insecure services</li><li>Patch &amp; update</li></ul></div>
          <div class="pillarCard"><h3>Investigation</h3><ul><li>Forensics questions</li><li>Find malware &amp; rogue files</li><li>Read logs</li></ul></div>
          <div class="pillarCard"><h3>Networking</h3><ul><li>Cisco IOS basics</li><li>VLANs &amp; port security</li><li>ACLs &amp; Packet Tracer</li></ul></div>
        </div>
        <p>These are the exact skills listed in entry-level IT and SOC job descriptions. That is the real prize &mdash; the trophies are a bonus.</p>
      ` },
      { title: 'The Defender Mindset', html: `
        <p>Three habits separate teams that score well from teams that flail:</p>
        <ol>
          <li><strong>Read first, act second.</strong> Open the README and the scoring report before touching anything. Know the target state.</li>
          <li><strong>Change one thing at a time and log it.</strong> Keep a written log of every change. When your score drops, the log tells you what to undo.</li>
          <li><strong>Respect the business.</strong> A "fix" that breaks email is a failure. Security and availability are a balance you must manage.</li>
        </ol>
        <div class="callout tip"><strong>Checklists win.</strong> Printed and handwritten checklists are allowed in competition. Build your own from general documentation, never from another team's competition-specific notes &mdash; the rules forbid that.</div>
        <p>You are ready. Continue to the next module to learn how the machines you will defend actually work.</p>
      ` }
    ],
    quiz: [
      { q: 'Which organization created and runs CyberPatriot?', opts: ['The National Security Agency', 'The Air & Space Forces Association', 'Cisco Systems', 'The Department of Education'], answer: 1, explain: 'CyberPatriot is an AFA program; the scoring engine is built with CIAS at UT San Antonio.' },
      { q: 'CyberTitan is best described as:', opts: ['A US-only middle school league', 'Canada\u2019s largest youth cyber defence competition run by ICTC', 'A Cisco certification exam', 'A capture-the-flag hacking event'], answer: 1, explain: 'CyberTitan is ICTC\u2019s Canadian sister program to CyberPatriot.' },
      { q: 'What is the most important document to read at the start of a round?', opts: ['The scoring report', 'The README scenario file', 'The Windows Event Log', 'The team roster'], answer: 1, explain: 'The README defines the correct state of the system and what must keep running.' },
      { q: 'A security fix that shuts down a service the company needs is:', opts: ['A bonus', 'A penalty, because it conflicts with the scenario', 'Ignored by scoring', 'Required by the rules'], answer: 1, explain: 'Actions that conflict with the scenario lose points until undone.' },
      { q: 'Which is NOT a typical competition skill category?', opts: ['Users and passwords', 'Firewall and services', 'Offensive exploitation of other teams', 'Forensics questions'], answer: 2, explain: 'Offensive activity against other teams is explicitly forbidden.' }
    ]
  },

  /* ===================== FOUND 2 ===================== */
  {
    id: 'found-2', track: 'foundations', num: 2,
    title: 'Operating Systems & Virtualization',
    summary: 'How Windows, Linux and macOS differ, what a virtual machine is, and how VMware and Packet Tracer deliver the competition environment.',
    tags: ['os', 'virtualization', 'vmware', 'packet tracer', 'windows', 'linux'],
    slides: [
      { title: 'What an Operating System Does', html: `
        <p>An <strong>operating system (OS)</strong> is the software that manages a computer's hardware and software. It sits between you and the machine and handles four jobs:</p>
        <ul>
          <li><strong>Running programs</strong> &mdash; scheduling CPU time and memory.</li>
          <li><strong>Managing storage</strong> &mdash; files, folders, and permissions.</li>
          <li><strong>Controlling hardware</strong> &mdash; keyboards, disks, network cards, printers.</li>
          <li><strong>Isolating users and processes</strong> &mdash; so one program cannot read another's memory or another user's files.</li>
        </ul>
        <p>Almost every vulnerability you will fix is a failure of that fourth job: someone can do something they should not be able to do.</p>
      ` },
      { title: 'The Three Big Families', html: `
        <div class="pillarGrid">
          <div class="pillarCard"><h3>Windows</h3><ul><li>Made by Microsoft</li><li>Most common desktop/server OS</li><li>GUI-first, with PowerShell &amp; CMD</li><li>Competition: Windows 10/11, Server 2019/2022</li></ul></div>
          <div class="pillarCard"><h3>Linux</h3><ul><li>Free &amp; open source</li><li>Dominates servers, cloud, embedded</li><li>Command-line-first</li><li>Competition: Ubuntu 22, Mint 21, Debian 12</li></ul></div>
          <div class="pillarCard"><h3>macOS / Unix</h3><ul><li>Made by Apple</li><li>Unix foundation, similar to Linux under the hood</li><li>Not used in the main rounds</li></ul></div>
        </div>
        <p>CyberPatriot's online rounds have used <strong>Windows 10/11, Windows Server 2019/2022, Ubuntu 22, and Linux Mint 21</strong>. Later rounds add <strong>Debian 12</strong>, and the Semifinals have introduced <strong>FreeBSD</strong>.</p>
      ` },
      { title: 'The Filesystem: Where Security Lives', html: `
        <p>Every account, password rule, and permission is stored in a file or registry key. Knowing where to look is half the battle.</p>
        <div class="table-wrap"><table>
          <thead><tr><th>What</th><th>Linux path</th><th>Windows equivalent</th></tr></thead>
          <tbody>
            <tr><td>User accounts</td><td><code>/etc/passwd</code></td><td>Local Users and Groups (<code>lusrmgr.msc</code>)</td></tr>
            <tr><td>Password hashes</td><td><code>/etc/shadow</code></td><td>SAM database (hidden)</td></tr>
            <tr><td>Groups</td><td><code>/etc/group</code></td><td>Group membership in <code>lusrmgr.msc</code></td></tr>
            <tr><td>Password policy</td><td><code>/etc/pam.d/</code>, <code>login.defs</code></td><td>Local Security Policy (<code>secpol.msc</code>)</td></tr>
            <tr><td>Services</td><td><code>systemctl</code>, <code>/etc/init.d</code></td><td><code>services.msc</code></td></tr>
            <tr><td>Firewall</td><td><code>ufw</code>, <code>iptables</code></td><td>Windows Defender Firewall</td></tr>
          </tbody>
        </table></div>
      ` },
      { title: 'What Is a Virtual Machine?', html: `
        <p>A <strong>virtual machine (VM)</strong> is a complete computer &mdash; CPU, memory, disk, network card &mdash; simulated in software. A program called a <strong>hypervisor</strong> runs several VMs on one physical host, each isolated from the others.</p>
        <p>Competition images are VMs. You do not need to install Windows or Linux on your own computer; you open the provided image inside <strong>VMware Workstation Pro</strong> (free for competitors). The image is a snapshot of a deliberately broken machine.</p>
        <div class="callout"><strong>Why VMs matter for safety.</strong> Because a VM is isolated, you can break it, restore a snapshot, and try again. That is exactly how you should practise &mdash; snapshot before you experiment.</div>
        <p>Your host computer needs <strong>64-bit Windows</strong>, <strong>8 GB RAM</strong>, <strong>40 GB free disk</strong>, and <strong>virtualization (VT-x / AMD-V) enabled in the BIOS</strong>. Some images will not open without it.</p>
      ` },
      { title: 'The Competition Toolkit', html: `
        <p>These are the standard tools you will use every round:</p>
        <ul>
          <li><strong>VMware Workstation Pro</strong> &mdash; runs the OS images. Free for CyberPatriot teams.</li>
          <li><strong>7-Zip</strong> &mdash; extracts the compressed image archives.</li>
          <li><strong>WinMD5</strong> &mdash; verifies the image checksum so you know the download is intact.</li>
          <li><strong>Your web browser</strong> &mdash; for the Cisco Networking Challenge on <code>netacad.com</code>.</li>
          <li><strong>Packet Tracer</strong> &mdash; Cisco's network simulator, used for the networking exercise.</li>
        </ul>
        <div class="callout warn"><strong>Download early.</strong> Images are large. Download them days before your round and check the MD5 checksum. School firewalls blocking ports 80/443 to the scoring server is the single most common technical failure.</div>
      ` },
      { title: 'Packet Tracer in 60 Seconds', html: `
        <p><strong>Cisco Packet Tracer</strong> is a network simulator. You drag routers, switches, and PCs onto a canvas, cable them together, and configure them with Cisco IOS commands &mdash; without any physical hardware.</p>
        <p>In the Cisco Networking Challenge you will typically be asked to:</p>
        <ul>
          <li>Build or repair a small network topology.</li>
          <li>Assign IP addresses and subnet correctly.</li>
          <li>Configure device security (passwords, SSH, banners).</li>
          <li>Apply ACLs or port security to meet a requirement.</li>
        </ul>
        <p>The quiz and the Packet Tracer exercise are both based on the assigned NetAcad training modules, so the content is learnable in advance. The Cisco track later in this academy walks you through it.</p>
      ` },
      { title: 'Practice Environment Setup', html: `
        <p>You cannot learn to harden systems by reading alone. Build a lab:</p>
        <ol>
          <li>Install <strong>VMware Workstation Pro</strong> on a 64-bit host.</li>
          <li>Install a clean <strong>Ubuntu</strong> or <strong>Linux Mint</strong> VM and a clean <strong>Windows 11</strong> VM.</li>
          <li>Snapshot each one <em>before</em> you change anything.</li>
          <li>Break something on purpose (add a rogue user, weaken a password), then fix it.</li>
          <li>Restore the snapshot and repeat until it is muscle memory.</li>
        </ol>
        <div class="callout tip"><strong>Never practise on shared machines.</strong> Only harden systems you own or are explicitly authorized to change. Your school's lab computers are not your competition image.</div>
      ` }
    ],
    quiz: [
      { q: 'Which component runs the virtual machines on a physical host?', opts: ['The kernel', 'The hypervisor', 'The BIOS', 'The scoring engine'], answer: 1, explain: 'The hypervisor (VMware Workstation Pro) creates and runs the VMs.' },
      { q: 'On Linux, where are user password hashes stored?', opts: ['/etc/passwd', '/etc/shadow', '/etc/group', '/etc/hosts'], answer: 1, explain: '/etc/shadow holds hashes and is readable only by root.' },
      { q: 'Which is NOT required on the host to run competition images?', opts: ['64-bit Windows host', '8 GB RAM', 'A discrete GPU', 'Virtualization enabled in BIOS'], answer: 2, explain: 'A discrete GPU is not required; CPU virtualization support is.' },
      { q: 'What is the purpose of WinMD5?', opts: ['Crack passwords', 'Verify the image checksum', 'Configure the firewall', 'Simulate a network'], answer: 1, explain: 'WinMD5 confirms the downloaded image matches the expected checksum.' },
      { q: 'Packet Tracer is used to:', opts: ['Harden Windows', 'Simulate and configure networks', 'Edit the registry', 'Crack hashes'], answer: 1, explain: 'Packet Tracer is Cisco\u2019s network simulator for the networking challenge.' }
    ]
  },

  /* ===================== FOUND 3 ===================== */
  {
    id: 'found-3', track: 'foundations', num: 3,
    title: 'Core Security Principles',
    summary: 'The CIA triad, least privilege, attack surface, defense in depth and the risk equation — the mental models behind every hardening action.',
    tags: ['cia triad', 'least privilege', 'attack surface', 'defense in depth', 'risk'],
    slides: [
      { title: 'Why Principles Beat Recipes', html: `
        <p>You could memorise a hundred fixes, but the images change every round. What stays constant are the <strong>principles</strong> that tell you <em>why</em> a fix matters. Ask "which attack does this setting block?" and the fix sticks.</p>
        <p>This module gives you five mental models you will use on every machine: the CIA triad, least privilege, attack surface, defense in depth, and the risk equation.</p>
      ` },
      { title: 'The CIA Triad', html: `
        <p>The three goals of security are <strong>Confidentiality</strong>, <strong>Integrity</strong>, and <strong>Availability</strong>.</p>
        <div class="pillarGrid">
          <div class="pillarCard"><h3>Confidentiality</h3><ul><li>Only authorized people see data</li><li>Encryption, permissions, password policy</li><li>Broken by: weak passwords, open shares</li></ul></div>
          <div class="pillarCard"><h3>Integrity</h3><ul><li>Data is accurate and unaltered</li><li>Hashes, file permissions, auditing</li><li>Broken by: malware, unauthorized edits</li></ul></div>
          <div class="pillarCard"><h3>Availability</h3><ul><li>Systems work when needed</li><li>Backups, patching, DDoS protection</li><li>Broken by: deleting needed services</li></ul></div>
        </div>
        <div class="callout warn"><strong>Availability is scored too.</strong> If you "secure" a machine by disabling the service the company needs, you have broken availability &mdash; and you lose points.</div>
      ` },
      { title: 'Principle of Least Privilege', html: `
        <p><strong>Least privilege</strong> means every user and process gets the minimum access needed to do its job &mdash; nothing more. It is the single most useful idea in the whole competition.</p>
        <p>Concretely, on every image you should ask:</p>
        <ul>
          <li>Who is an <strong>administrator / sudoer</strong>? Should they be?</li>
          <li>Does a regular user have root/Admin rights they do not need?</li>
          <li>Are there accounts that should be <strong>disabled or deleted</strong>?</li>
          <li>Are services running as an over-privileged account?</li>
        </ul>
        <p>Most "rogue admin" findings are least-privilege violations: a user in the <code>sudo</code> or <code>Administrators</code> group who should not be.</p>
      ` },
      { title: 'Reduce the Attack Surface', html: `
        <p>The <strong>attack surface</strong> is everything an attacker could use: open ports, running services, installed programs, user accounts, scheduled tasks. Every one you remove or disable is one fewer way in.</p>
        <div class="table-wrap"><table>
          <thead><tr><th>Attack surface item</th><th>Why it is risky</th><th>Typical action</th></tr></thead>
          <tbody>
            <tr><td>FTP server (port 21)</td><td>Sends credentials in cleartext</td><td>Remove, or replace with SFTP if required</td></tr>
            <tr><td>Telnet (port 23)</td><td>Unencrypted remote shell</td><td>Disable; use SSH instead</td></tr>
            <tr><td>Guest account enabled</td><td>No password, no accountability</td><td>Disable</td></tr>
            <tr><td>Unneeded games / tools</td><td>Often vulnerable, against policy</td><td>Uninstall</td></tr>
            <tr><td>Open file shares</td><td>Data exposure</td><td>Restrict permissions</td></tr>
          </tbody>
        </table></div>
        <div class="callout tip"><strong>But check the README.</strong> If the scenario says the company runs a file server, you harden it rather than delete it. Reduce surface, but never break the business.</div>
      ` },
      { title: 'Defense in Depth', html: `
        <p><strong>Defense in depth</strong> means layering independent controls so that if one fails, another still protects you. A single control is a single point of failure.</p>
        <p>For a user account, layers might be: a strong password policy, account lockout after failed attempts, least-privilege group membership, and auditing of logons. For a network: a firewall, a patched OS, and hardened services.</p>
        <p>When you fix a finding, ask whether there is a <em>second</em> control you can add. Teams that think in layers score higher than teams that chase individual checkboxes.</p>
      ` },
      { title: 'The Risk Equation', html: `
        <p>Risk is commonly expressed as:</p>
        <pre><code>Risk = Threat × Vulnerability × Impact</code></pre>
        <p>You cannot usually remove the <strong>threat</strong> (attackers exist). You can reduce the <strong>vulnerability</strong> (patch it, close the port, remove the account) and reduce the <strong>impact</strong> (limit what an account can reach, back up data).</p>
        <p>This is why least privilege and attack-surface reduction are so powerful: they attack two terms of the equation at once.</p>
        <div class="callout"><strong>Prioritise by risk.</strong> With limited time, fix the findings that are both easy <em>and</em> high-impact first: rogue admins, missing passwords, disabled firewalls, and unpatched systems.</div>
      ` },
      { title: 'Authorization & Ethics', html: `
        <p>Everything you learn here is a double-edged sword. The rule is simple and absolute:</p>
        <div class="callout danger"><strong>Only touch systems you own or are explicitly authorized to change.</strong> Competition images are built for you to modify. Your school's network, your friends' accounts, and public websites are not.</div>
        <p>In competition, the rules also forbid offensive activity of any kind, outside assistance during a round, and sharing competition-specific material. Breaking these can disqualify an entire team.</p>
        <p>Good defenders are trusted because they respect boundaries. Build that habit now.</p>
      ` }
    ],
    quiz: [
      { q: 'Which part of the CIA triad is broken if you disable a service the company needs?', opts: ['Confidentiality', 'Integrity', 'Availability', 'Non-repudiation'], answer: 2, explain: 'Availability means systems work when needed; breaking a needed service harms availability.' },
      { q: 'Least privilege means:', opts: ['Everyone gets admin so work is fast', 'Users get only the access they need', 'Passwords are shared', 'All ports are open'], answer: 1, explain: 'Least privilege grants the minimum access required for the job.' },
      { q: 'Which is the best example of reducing attack surface?', opts: ['Adding another admin', 'Disabling the Telnet service', 'Enabling the guest account', 'Opening port 21'], answer: 1, explain: 'Removing an unencrypted, unneeded service shrinks the attack surface.' },
      { q: 'Defense in depth means:', opts: ['One very strong control', 'Layered independent controls', 'Disabling the firewall', 'Using the same password everywhere'], answer: 1, explain: 'Layering controls means a single failure does not compromise the system.' },
      { q: 'In the risk equation Risk = Threat × Vulnerability × Impact, hardening mainly reduces:', opts: ['Threat', 'Vulnerability and impact', 'Nothing', 'Only impact'], answer: 1, explain: 'Hardening reduces vulnerability and can limit impact; the threat itself remains.' }
    ]
  },

  /* ===================== FOUND 4 ===================== */
  {
    id: 'found-4', track: 'foundations', num: 4,
    title: 'How a Competition Round Works',
    summary: 'From downloading images and entering your Unique ID to reading the scoring report, managing four hours, and avoiding the penalties that sink new teams.',
    tags: ['round', 'scoring', 'readme', 'rules', 'strategy', 'unique id'],
    slides: [
      { title: 'The Rhythm of a Round', html: `
        <p>Every online round follows the same sequence. Learn it once and the logistics stop being scary.</p>
        <ol>
          <li><strong>Download early.</strong> The Monday before a round, your coach gets links to the VM images. Download them days ahead and verify the MD5 checksum.</li>
          <li><strong>Get the password.</strong> On the start day, a "StartEx" email arrives with the password that unlocks the images.</li>
          <li><strong>Pick your four hours.</strong> Teams choose one continuous four-hour block. The clock starts the moment you power on your first image &mdash; not when you feel ready.</li>
          <li><strong>Enter your Unique ID.</strong> Each image asks for your team's identifier so the scoring server knows who you are.</li>
          <li><strong>Fix, score, repeat.</strong> A scoring report on the desktop updates as you work.</li>
        </ol>
      ` },
      { title: 'The Scoring Report', html: `
        <p>Inside each image is a <strong>scoring report</strong> (often an HTML page on the desktop) that lists scored items and updates live. Green means you earned the points; red or grey means you have not.</p>
        <p>Two things surprise new teams:</p>
        <ul>
          <li><strong>Not every vulnerability is scored.</strong> A fix that earns nothing is not proof you did it wrong &mdash; the rules explicitly say not all vulnerabilities in an image are scored.</li>
          <li><strong>You can lose points.</strong> Any action that conflicts with the scenario (deleting a needed user or service) removes points. Undoing the mistake restores them.</li>
        </ul>
        <div class="callout tip"><strong>Refresh the report.</strong> It does not always update instantly. If your score has not moved, wait a moment and reload before assuming the fix failed.</div>
      ` },
      { title: 'What Actually Gets Scored', html: `
        <p>The official results categories map directly to your study plan. Expect findings in these buckets:</p>
        <div class="table-wrap"><table>
          <thead><tr><th>Category</th><th>Examples</th></tr></thead>
          <tbody>
            <tr><td>User Policy</td><td>Rogue accounts, unauthorized admins, disabled vs deleted users</td></tr>
            <tr><td>Password Policy</td><td>Minimum length, complexity, maximum age, history</td></tr>
            <tr><td>Login Policy</td><td>Lockout threshold, guest account, auto-logon</td></tr>
            <tr><td>Access Control</td><td>File/share permissions, sudoers, group membership</td></tr>
            <tr><td>Insecure Services</td><td>FTP, Telnet, unnecessary daemons</td></tr>
            <tr><td>Firewall</td><td>Enabled profiles, allowed/blocked ports</td></tr>
            <tr><td>Updates &amp; Antivirus</td><td>Missing patches, disabled Defender</td></tr>
            <tr><td>Malware &amp; Policy Violations</td><td>Rogue files, games, tools against policy</td></tr>
            <tr><td>Forensics Questions</td><td>Find and report something specific on the system</td></tr>
          </tbody>
        </table></div>
      ` },
      { title: 'Reading the README Properly', html: `
        <p>The README is a contract. Extract three lists from it before you change anything:</p>
        <ol>
          <li><strong>Authorized users</strong> &mdash; who may log in, and who is an administrator.</li>
          <li><strong>Required services</strong> &mdash; what must keep running (web, mail, file share).</li>
          <li><strong>Company policy</strong> &mdash; password rules, allowed software, banned activities.</li>
        </ol>
        <p>Then compare reality to the contract. On Linux, listing human accounts is one command:</p>
        <pre><code><span class="cmt"># List regular (human) accounts on Debian-based systems</span>
awk -F: '$3 >= 1000 && $3 < 65534 {print $1}' /etc/passwd
<span class="cmt"># Show who has admin rights</span>
getent group sudo</code></pre>
        <p>If the README says only <code>alice</code> is an administrator, then <code>mallory</code> should not be in the sudo group.</p>
      ` },
      { title: 'Managing Four Hours', html: `
        <p>Four hours is generous if you are organised and brutal if you are not. A proven plan:</p>
        <div class="table-wrap"><table>
          <thead><tr><th>Time</th><th>Focus</th></tr></thead>
          <tbody>
            <tr><td>0:00&ndash;0:20</td><td>Read every README, open the scoring report, note the required users/services</td></tr>
            <tr><td>0:20&ndash;1:30</td><td>Users, groups, password policy, lockout &mdash; the highest-value, fastest wins</td></tr>
            <tr><td>1:30&ndash;2:30</td><td>Services, software removal, firewall, updates, antivirus</td></tr>
            <tr><td>2:30&ndash;3:15</td><td>Forensics questions and malware hunting</td></tr>
            <tr><td>3:15&ndash;3:50</td><td>Second pass: re-read the report, chase missed items</td></tr>
            <tr><td>3:50&ndash;4:00</td><td>Log changes, verify nothing broke, stop</td></tr>
          </tbody>
        </table></div>
        <div class="callout warn"><strong>Stop at four hours.</strong> Continuing after the limit incurs penalties. The clock starts when the first image powers on.</div>
      ` },
      { title: 'Team Roles & Communication', html: `
        <p>Up to six students may be on a roster, but only <strong>five compete at once</strong>, with one substitution allowed per round. A strong split:</p>
        <ul>
          <li><strong>1&ndash;2 people per image</strong> (Windows, Linux) so no one context-switches.</li>
          <li><strong>1 person on Cisco</strong> &mdash; the quiz and Packet Tracer.</li>
          <li><strong>1 floater</strong> to read READMEs, run forensics, and double-check the report.</li>
        </ul>
        <p>Agree on a rule before you start: <em>nobody deletes a user or a service without checking the README first.</em> Verbal-only communication, no outside contact.</p>
      ` },
      { title: 'Rules That Sink New Teams', html: `
        <p>Many penalties have nothing to do with skill. Know these cold:</p>
        <ul>
          <li><strong>No outside help during a round.</strong> Coaches handle logistics and timekeeping only. No forum posts, no asking a friend.</li>
          <li><strong>No AI during rounds.</strong> Chatbots and AI-generated scripts are banned during competition; paid AI products are banned in connection with the competition at any time.</li>
          <li><strong>One copy of each image.</strong> Opening the same image twice triggers a multiple-instance penalty.</li>
          <li><strong>Four hours means four hours.</strong> Opening an image "just to check" starts your round early.</li>
          <li><strong>No offensive activity.</strong> You defend; you do not attack.</li>
        </ul>
        <div class="callout tip"><strong>Build your own checklist.</strong> Handwritten and printed checklists are allowed, but they must be your own work from general documentation &mdash; not a downloaded "CyberPatriot checklist".</div>
      ` }
    ],
    quiz: [
      { q: 'When does the four-hour competition clock start?', opts: ['When the StartEx email arrives', 'When you power on the first image', 'When you finish reading the README', 'At 9:00 AM ET'], answer: 1, explain: 'The clock starts the moment the first image is powered on.' },
      { q: 'The scoring report is used to:', opts: ['Chat with other teams', 'See which fixes earned points, live', 'Download images', 'Reset passwords'], answer: 1, explain: 'It updates as you work and shows scored items.' },
      { q: 'Which action can LOSE points?', opts: ['Disabling the guest account', 'Deleting a user the scenario needs', 'Enabling the firewall', 'Setting a strong password policy'], answer: 1, explain: 'Actions that conflict with the scenario remove points until undone.' },
      { q: 'How many students may compete at once on a team?', opts: ['2', '3', '5', '6'], answer: 2, explain: 'Up to six on the roster, but only five compete at once.' },
      { q: 'Which is allowed during a competition round?', opts: ['Asking a mentor for advice', 'Using a chatbot to generate fixes', 'A handwritten checklist you wrote yourself', 'Posting a question on a forum'], answer: 2, explain: 'Your own handwritten/printed checklist is allowed; outside help and AI are not.' }
    ]
  }
);
