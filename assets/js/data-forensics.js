/* ============================================================
   DATA — Forensics & Strategy Track
   Forensics questions, malware hunting, encryption, team strategy
   ============================================================ */
window.CDA_DATA = window.CDA_DATA || { tracks: [], modules: [] };

window.CDA_DATA.modules.push(
  /* ===================== FORE 1 ===================== */
  {
    id: 'fore-1', track: 'forensics', num: 1,
    title: 'Answering Forensics Questions',
    summary: 'Learn what forensics questions ask, how to find the evidence on Windows and Linux, and how to answer them precisely under time pressure.',
    tags: ['forensics', 'questions', 'investigation', 'evidence', 'logs', 'method'],
    slides: [
      { title: 'What Forensics Questions Are', html: `
        <p>Every CyberPatriot and CyberTitan image includes a set of <strong>forensics questions</strong>. Unlike the hardening tasks, these have one correct answer each, and they are worth a fixed number of points. They reward <em>investigation</em>, not configuration.</p>
        <p>Typical questions look like:</p>
        <ul>
          <li>"What is the name of the unauthorised account that was created on this system?"</li>
          <li>"What is the path of the malicious file that runs at startup?"</li>
          <li>"What is the password of the hidden user?" (found by cracking a weak hash)</li>
          <li>"Which service was installed to provide remote access?"</li>
          <li>"What is the MAC address of the rogue device?" (Cisco)</li>
        </ul>
        <div class="callout tip"><strong>Answer exactly.</strong> Forensics answers are usually case-sensitive and must match precisely. A full path, not just a filename. Copy and paste where you can.</div>
      ` },
      { title: 'A Repeatable Investigation Method', html: `
        <p>Do not guess. Work the same way every time:</p>
        <ol>
          <li><strong>Read the question carefully.</strong> Note exactly what is asked (a username? a path? a port?).</li>
          <li><strong>Identify the artifact type.</strong> Account, file, service, scheduled task, network device?</li>
          <li><strong>Go to the source of truth.</strong> Accounts live in the user database; startup items in the startup locations; services in the service manager.</li>
          <li><strong>Corroborate.</strong> Confirm with a second command or the logs.</li>
          <li><strong>Record and answer.</strong> Write it down, then submit the exact value.</li>
        </ol>
        <div class="callout"><strong>Timebox it.</strong> Forensics questions can be rabbit holes. If you are stuck after a few minutes, note it and move on &mdash; come back after the hardening tasks are done.</div>
      ` },
      { title: 'Finding Accounts and Groups', html: `
        <p>Account questions are the most common. On Windows:</p>
        <pre><code><span class="cmt">:: All local users and their status</span>
net user
<span class="cmt">:: Details for one account</span>
net user suspicioususer
<span class="cmt">:: Who is an administrator</span>
net localgroup Administrators
<span class="cmt">:: PowerShell: accounts created recently</span>
Get-LocalUser | Sort-Object -Property PasswordLastSet</code></pre>
        <p>On Linux:</p>
        <pre><code><span class="cmt"># Accounts with a login shell</span>
grep -vE '/(nologin|false)$' /etc/passwd
<span class="cmt"># Extra UID 0 accounts</span>
awk -F: '$3==0 {print $1}' /etc/passwd
<span class="cmt"># Accounts with recent changes</span>
stat /etc/passwd</code></pre>
      ` },
      { title: 'Finding Files and Paths', html: `
        <p>File questions ask for the full path of something malicious. Search by name, by location, and by modification time.</p>
        <pre><code><span class="cmt"># Linux: find executables in temp/home dirs</span>
sudo find /tmp /var/tmp /home -type f -executable 2>/dev/null
<span class="cmt"># Recently modified files</span>
sudo find / -mtime -1 -type f 2>/dev/null | less
<span class="cmt"># Search file contents for a keyword</span>
sudo grep -rl "malware" /home /etc 2>/dev/null</code></pre>
        <pre><code><span class="cmt">:: Windows: PowerShell search by name</span>
Get-ChildItem C:\ -Recurse -ErrorAction SilentlyContinue |
  Where-Object { $_.Name -like "*hack*" }
<span class="cmt">:: Recently created files</span>
Get-ChildItem C:\ -Recurse -ErrorAction SilentlyContinue |
  Where-Object { $_.CreationTime -gt (Get-Date).AddDays(-1) }</code></pre>
      ` },
      { title: 'Logs, Services and Scheduled Tasks', html: `
        <p>Many questions point to persistence. Check these locations:</p>
        <div class="table-wrap"><table>
          <thead><tr><th>Artifact</th><th>Windows</th><th>Linux</th></tr></thead>
          <tbody>
            <tr><td>Services</td><td><code>services.msc</code>, <code>Get-Service</code></td><td><code>systemctl list-units</code></td></tr>
            <tr><td>Scheduled tasks</td><td><code>taskschd.msc</code>, <code>schtasks /query</code></td><td><code>crontab -l</code>, <code>/etc/cron.*</code></td></tr>
            <tr><td>Startup</td><td><code>Get-CimInstance Win32_StartupCommand</code></td><td><code>~/.bashrc</code>, <code>/etc/profile</code></td></tr>
            <tr><td>Logs</td><td>Event Viewer, <code>Get-WinEvent</code></td><td><code>/var/log/</code></td></tr>
          </tbody>
        </table></div>
        <pre><code><span class="cmt"># Linux: recent authentication activity</span>
sudo tail -n 50 /var/log/auth.log
<span class="cmt">:: Windows: recent logons</span>
Get-WinEvent -LogName Security -MaxEvents 50</code></pre>
      ` },
      { title: 'Forensics Answering Checklist', html: `
        <ol>
          <li>Read each question and note exactly what is required.</li>
          <li>Search the correct source (accounts, files, services, tasks, logs).</li>
          <li>Corroborate with a second command.</li>
          <li>Record the exact value (full path, exact username).</li>
          <li>Submit precisely &mdash; mind case sensitivity.</li>
          <li>Timebox; return to hard ones later.</li>
          <li>Keep your notes &mdash; they help the whole team.</li>
        </ol>
      ` }
    ],
    quiz: [
      { q: 'Forensics answers are usually:', opts: ['Approximate', 'Case-sensitive and exact', 'Multiple choice', 'Optional'], answer: 1, explain: 'They must match precisely, often including full paths.' },
      { q: 'Which Linux command finds extra UID 0 accounts?', opts: ["awk -F: '$3==0 {print $1}' /etc/passwd", 'ls /home', 'whoami', 'groups'], answer: 0, explain: 'It prints any account with UID 0.' },
      { q: 'Where do you look for scheduled tasks on Windows?', opts: ['services.msc', 'taskschd.msc', 'lusrmgr.msc', 'wf.msc'], answer: 1, explain: 'Task Scheduler (taskschd.msc) manages scheduled tasks.' },
      { q: 'Which is a good first step for a forensics question?', opts: ['Guess', 'Read exactly what is asked', 'Reboot', 'Delete files'], answer: 1, explain: 'Identify precisely what artifact is required first.' },
      { q: 'Where are Linux authentication events logged?', opts: ['/var/log/auth.log', '/etc/passwd', '/tmp', 'C:\\Windows'], answer: 0, explain: '/var/log/auth.log records authentication activity.' }
    ]
  },

  /* ===================== FORE 2 ===================== */
  {
    id: 'fore-2', track: 'forensics', num: 2,
    title: 'Malware Hunting & Suspicious Files',
    summary: 'Hunt rogue executables, backdoors, and persistence on Windows and Linux, and understand how attackers hide and how you find them.',
    tags: ['forensics', 'malware', 'backdoor', 'persistence', 'suspicious files', 'hunting'],
    slides: [
      { title: 'How Malware Hides on a Competition Image', html: `
        <p>Competition images plant "malware" that is deliberately findable &mdash; the point is to test whether you know where to look. Common tricks:</p>
        <ul>
          <li>A file with a tempting name (<code>passwords.txt</code>, <code>hack.exe</code>) in an unusual location.</li>
          <li>A hidden file (dot-prefixed on Linux, hidden attribute on Windows).</li>
          <li>A backdoor user with a legitimate-sounding name.</li>
          <li>A scheduled task or cron job that re-runs the payload.</li>
          <li>A listening port that should not be open.</li>
        </ul>
        <div class="callout tip"><strong>Think like the author.</strong> The image author wants you to find it. Ask "where would I put a backdoor if I were writing this scenario?"</div>
      ` },
      { title: 'Hunting on Windows', html: `
        <pre><code><span class="cmt">:: Find hidden files</span>
Get-ChildItem C:\ -Recurse -Force -ErrorAction SilentlyContinue |
  Where-Object { $_.Attributes -match 'Hidden' }

<span class="cmt">:: Recently created executables</span>
Get-ChildItem C:\ -Recurse -Include *.exe,*.bat,*.ps1 -ErrorAction SilentlyContinue |
  Where-Object { $_.CreationTime -gt (Get-Date).AddDays(-2) }

<span class="cmt">:: Startup programs</span>
Get-CimInstance Win32_StartupCommand | Select-Object Name, Command, Location

<span class="cmt">:: Listening ports and owning processes</span>
Get-NetTCPConnection -State Listen | Select-Object LocalPort, OwningProcess</code></pre>
      ` },
      { title: 'Hunting on Linux', html: `
        <pre><code><span class="cmt"># Executables in world-writable or temp directories</span>
sudo find /tmp /var/tmp /dev/shm -type f -executable 2>/dev/null

<span class="cmt"># Hidden files in home directories</span>
find /home -name ".*" -type f 2>/dev/null

<span class="cmt"># Files modified in the last day</span>
sudo find / -mtime -1 -type f 2>/dev/null | grep -vE '^/(proc|sys|run)'

<span class="cmt"># Listening sockets with processes</span>
sudo ss -tulpn

<span class="cmt"># SUID binaries outside the standard set</span>
sudo find / -perm -4000 -type f 2>/dev/null</code></pre>
        <div class="callout warn"><strong>/dev/shm and /tmp are favourites.</strong> They are world-writable and often overlooked. Always sweep them.</div>
      ` },
      { title: 'Spotting Persistence', html: `
        <p>Malware that does not persist is a one-time annoyance; malware that does is a backdoor. Hunt the persistence mechanisms.</p>
        <div class="pillarGrid">
          <div class="pillarCard"><h3>Windows</h3><ul><li>Run / RunOnce registry keys</li><li>Startup folder</li><li>Task Scheduler</li><li>Services (auto-start)</li><li>Winlogon shell/userinit</li></ul></div>
          <div class="pillarCard"><h3>Linux</h3><ul><li>cron (user + system)</li><li>systemd units</li><li>~/.bashrc, /etc/profile</li><li>rc.local</li><li>SSH authorized_keys</li></ul></div>
        </div>
        <pre><code><span class="cmt"># Linux: check for unexpected SSH keys</span>
cat ~/.ssh/authorized_keys
<span class="cmt">:: Windows: Run keys</span>
reg query HKLM\Software\Microsoft\Windows\CurrentVersion\Run</code></pre>
      ` },
      { title: 'What to Do When You Find It', html: `
        <p>Finding malware is only half the task. Handle it correctly:</p>
        <ol>
          <li><strong>Record the exact path and name</strong> &mdash; it may be a forensics answer.</li>
          <li><strong>Check for a running process</strong> and note its PID.</li>
          <li><strong>Remove the persistence</strong> (the task, cron entry, or startup item) so it cannot relaunch.</li>
          <li><strong>Delete or quarantine the file</strong> (use Defender on Windows where possible).</li>
          <li><strong>Kill the process</strong> if it is running.</li>
          <li><strong>Re-scan</strong> to confirm it is gone.</li>
        </ol>
        <div class="callout danger"><strong>Order matters.</strong> If you delete the file but leave the scheduled task, the task fails harmlessly. If you delete the task but leave the file, it stays dormant. Remove both.</div>
      ` },
      { title: 'Malware Hunting Checklist', html: `
        <ol>
          <li>Run a full antivirus scan (Windows Defender / ClamAV).</li>
          <li>Search temp, home, and world-writable directories for executables.</li>
          <li>Find hidden and recently modified files.</li>
          <li>Review startup items, services, and scheduled tasks.</li>
          <li>Check listening ports against expected services.</li>
          <li>Inspect SSH <code>authorized_keys</code> and shell startup files.</li>
          <li>Remove persistence, then the file, then the process.</li>
          <li>Log everything for the team.</li>
        </ol>
      ` }
    ],
    quiz: [
      { q: 'Which Linux directories are favourites for dropped malware?', opts: ['/etc, /bin', '/tmp, /var/tmp, /dev/shm', '/usr/share', '/root'], answer: 1, explain: 'World-writable temp dirs are commonly abused.' },
      { q: 'Which command lists listening sockets with processes on Linux?', opts: ['ss -tulpn', 'ls -l', 'cat /etc/passwd', 'df -h'], answer: 0, explain: 'ss -tulpn shows sockets and owning processes.' },
      { q: 'On Windows, which registry key is a common persistence spot?', opts: ['HKLM\\...\\Run', 'HKLM\\...\\Print', 'HKCU\\...\\Colors', 'HKLM\\...\\Fonts'], answer: 0, explain: 'The Run key launches programs at login.' },
      { q: 'Correct order when removing malware?', opts: ['Delete file only', 'Remove persistence, then file, then process', 'Reboot first', 'Kill process only'], answer: 1, explain: 'Remove persistence first so it cannot relaunch.' },
      { q: 'Which file could hide an attacker backdoor on Linux?', opts: ['~/.ssh/authorized_keys', '/etc/hostname', '/etc/timezone', '/etc/motd'], answer: 0, explain: 'An added key grants persistent access.' }
    ]
  },

  /* ===================== FORE 3 ===================== */
  {
    id: 'fore-3', track: 'forensics', num: 3,
    title: 'Encryption, Hashing & Data Protection',
    summary: 'Tell encryption from hashing, crack weak passwords to answer questions, and protect data at rest with the right tools.',
    tags: ['forensics', 'encryption', 'hashing', 'password cracking', 'john', 'data protection'],
    slides: [
      { title: 'Encryption vs. Hashing', html: `
        <p>These two are constantly confused, and competitions test the difference.</p>
        <div class="pillarGrid">
          <div class="pillarCard"><h3>Encryption</h3><p class="small">Reversible <em>with a key</em>. Protects data in transit and at rest. Examples: AES, RSA, TLS. Encrypt &rarr; decrypt.</p></div>
          <div class="pillarCard"><h3>Hashing</h3><p class="small">One-way. Used for integrity and password storage. Examples: SHA-256, bcrypt. You cannot "unhash" &mdash; you compare.</p></div>
        </div>
        <p>Passwords are <em>hashed</em>, never encrypted. When you "crack" a password you are guessing inputs until one produces the stored hash.</p>
      ` },
      { title: 'Why Weak Hashes Fall', html: `
        <p>A hash is only as strong as the password behind it. Fast, unsalted hashes (like MD5 or plain SHA-1) fall quickly to a wordlist or brute force. Modern systems use slow, salted hashes (bcrypt, SHA-512 crypt).</p>
        <pre><code><span class="cmt"># Linux hashes live in /etc/shadow</span>
sudo cat /etc/shadow
<span class="cmt"># Format: user:$id$salt$hash:...</span>
<span class="cmt"># $1$ = MD5, $5$ = SHA-256, $6$ = SHA-512, $y$ = yescrypt</span></code></pre>
        <div class="callout tip"><strong>Competition twist.</strong> A question may give you a hash and a wordlist and ask for the password. Weak, well-known passwords (like <code>password1</code> or <code>letmein</code>) are crackable in seconds.</div>
      ` },
      { title: 'Cracking a Weak Password', html: `
        <p><strong>John the Ripper</strong> is the standard tool. It reads the shadow file, guesses passwords, and prints any it recovers.</p>
        <pre><code><span class="cmt"># Combine passwd and shadow into one file John can read</span>
sudo unshadow /etc/passwd /etc/shadow &gt; hashes.txt

<span class="cmt"># Run John with the default wordlist</span>
john hashes.txt

<span class="cmt"># Show recovered passwords</span>
john --show hashes.txt</code></pre>
        <div class="callout warn"><strong>Only on your own image.</strong> Password cracking is legitimate here because you are the administrator of the competition machine. Never do this on systems you do not own.</div>
      ` },
      { title: 'Protecting Data at Rest', html: `
        <p>Beyond competition forensics, defenders encrypt sensitive data so a stolen disk is useless. The tooling differs by platform.</p>
        <div class="table-wrap"><table>
          <thead><tr><th>Platform</th><th>Tool</th><th>Use</th></tr></thead>
          <tbody>
            <tr><td>Windows</td><td>BitLocker</td><td>Full-disk encryption</td></tr>
            <tr><td>Windows</td><td>EFS</td><td>Per-file/folder encryption</td></tr>
            <tr><td>Linux</td><td>LUKS</td><td>Full-disk encryption</td></tr>
            <tr><td>Linux</td><td>gpg</td><td>File and message encryption</td></tr>
            <tr><td>Cross</td><td>7-Zip / AES</td><td>Encrypted archives</td></tr>
          </tbody>
        </table></div>
        <pre><code><span class="cmt"># Encrypt a file with GPG (symmetric)</span>
gpg -c secret.txt
<span class="cmt"># Decrypt it</span>
gpg -d secret.txt.gpg</code></pre>
      ` },
      { title: 'Integrity with Hashes', html: `
        <p>Hashes also verify that a file has not changed. If the hash matches the published value, the download is intact and unaltered.</p>
        <pre><code><span class="cmt"># Linux</span>
sha256sum important.iso
<span class="cmt">:: Windows PowerShell</span>
Get-FileHash important.iso -Algorithm SHA256</code></pre>
        <p>In a competition, an unexpected change to a system file's hash can be a clue that it was tampered with.</p>
      ` },
      { title: 'Encryption & Hashing Checklist', html: `
        <ol>
          <li>Know the difference: encryption is reversible, hashing is not.</li>
          <li>Check password hash algorithm in <code>/etc/shadow</code> (<code>$6$</code> is good).</li>
          <li>Use <code>unshadow</code> + <code>john</code> to crack weak passwords for forensics answers.</li>
          <li>Verify file integrity with <code>sha256sum</code> / <code>Get-FileHash</code>.</li>
          <li>Know the data-at-rest tools: BitLocker, EFS, LUKS, gpg.</li>
          <li>Never store passwords in plaintext; always hash and salt.</li>
        </ol>
      ` }
    ],
    quiz: [
      { q: 'Which is one-way and used for password storage?', opts: ['Encryption', 'Hashing', 'Compression', 'Encoding'], answer: 1, explain: 'Hashing is one-way; passwords are hashed, not encrypted.' },
      { q: 'What does the $6$ prefix in /etc/shadow indicate?', opts: ['MD5', 'SHA-256', 'SHA-512', 'bcrypt'], answer: 2, explain: '$6$ marks SHA-512 crypt.' },
      { q: 'Which tool cracks weak Linux passwords?', opts: ['John the Ripper', 'gpg', 'sha256sum', 'ss'], answer: 0, explain: 'John the Ripper guesses passwords from hashes.' },
      { q: 'Which command verifies a file hash on Windows?', opts: ['Get-FileHash', 'sha256sum', 'md5', 'certutil -hash'], answer: 0, explain: 'Get-FileHash computes a file hash in PowerShell.' },
      { q: 'Which Linux tool provides full-disk encryption?', opts: ['LUKS', 'UFW', 'PAM', 'cron'], answer: 0, explain: 'LUKS is the standard Linux disk-encryption format.' }
    ]
  },

  /* ===================== FORE 4 ===================== */
  {
    id: 'fore-4', track: 'forensics', num: 4,
    title: 'Team Strategy & the Competition Clock',
    summary: 'Organise a team, divide roles, triage for maximum points, manage the clock, and avoid the penalties that sink good teams.',
    tags: ['strategy', 'teamwork', 'time management', 'scoring', 'triage', 'rules'],
    slides: [
      { title: 'The Clock Is the Real Opponent', html: `
        <p>A CyberPatriot round is typically <strong>four hours</strong> for the online rounds, and you cannot finish everything. Winning teams do not work harder &mdash; they work in the right <em>order</em>.</p>
        <p>Your score is a running total that updates as the scoring engine detects changes. Points come from hardening items and forensics answers; penalties come from breaking required services or removing authorised accounts.</p>
        <div class="callout tip"><strong>Score is visible and live.</strong> Watch it. If a change drops your score, undo it immediately &mdash; the log you kept tells you what to reverse.</div>
      ` },
      { title: 'Build a Team with Roles', html: `
        <p>CyberPatriot teams field up to five competitors at once (roster of six). CyberTitan allows two to six per team, up to five teams per school. Assign clear roles so nobody collides.</p>
        <div class="pillarGrid">
          <div class="pillarCard"><h3>Windows lead</h3><p class="small">Owns the Windows image: accounts, Defender, updates, services.</p></div>
          <div class="pillarCard"><h3>Linux lead</h3><p class="small">Owns the Linux image: users, PAM, permissions, SSH.</p></div>
          <div class="pillarCard"><h3>Forensics lead</h3><p class="small">Answers the questions and hunts malware across both images.</p></div>
          <div class="pillarCard"><h3>Network lead</h3><p class="small">Handles the Cisco challenge in Packet Tracer.</p></div>
          <div class="pillarCard"><h3>Coordinator</h3><p class="small">Tracks the clock, reads the README aloud, keeps the log, calls time.</p></div>
        </div>
        <p>Small teams merge roles, but every role must be <em>owned</em> by someone. A team where everyone does everything is a team where nothing gets finished.</p>
      ` },
      { title: 'Triage: Points per Minute', html: `
        <p>Some tasks earn a lot of points in seconds; others take half an hour for one point. Do the fast, high-value work first.</p>
        <div class="table-wrap"><table>
          <thead><tr><th>Priority</th><th>Task</th><th>Why</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>Read the README and scoring report</td><td>Tells you the target state</td></tr>
            <tr><td>2</td><td>Forensics questions you can answer fast</td><td>Fixed points, quick wins</td></tr>
            <tr><td>3</td><td>Accounts &amp; groups (both OSes)</td><td>High value, low risk</td></tr>
            <tr><td>4</td><td>Password policy, updates, firewall</td><td>Standard, repeatable</td></tr>
            <tr><td>5</td><td>Services &amp; software removal</td><td>Medium value</td></tr>
            <tr><td>6</td><td>Deep forensics &amp; hardening edge cases</td><td>Time-expensive</td></tr>
          </tbody>
        </table></div>
      ` },
      { title: 'The Rules You Must Not Break', html: `
        <p>CyberPatriot and CyberTitan have strict rules. Breaking them can disqualify a team.</p>
        <ul>
          <li><strong>No internet during the round</strong> except where explicitly allowed (the scoring portal).</li>
          <li><strong>No pre-made, competition-specific checklists</strong> from other teams or prior rounds. General documentation is fine; handwritten notes built by your team are fine.</li>
          <li><strong>No outside help.</strong> Coaches may not solve tasks for competitors.</li>
          <li><strong>No attacking other teams or the infrastructure.</strong> This is a defence competition.</li>
          <li><strong>Stay in the provided environment.</strong> Do not tamper with the scoring engine.</li>
        </ul>
        <div class="callout danger"><strong>Integrity matters.</strong> A disqualification erases every point you earned. Read the competition rules each season &mdash; they are updated.</div>
      ` },
      { title: 'Communication and the Log', html: `
        <p>The coordinator keeps a shared log: what changed, on which machine, at what time. This single habit prevents the two most common disasters:</p>
        <ol>
          <li><strong>Duplicate work</strong> &mdash; two people fix the same thing and miss another.</li>
          <li><strong>Unrecoverable mistakes</strong> &mdash; a score drop with no record of what caused it.</li>
        </ol>
        <p>Use a simple format and keep it visible to the whole team:</p>
        <pre><code><span class="cmt">14:05  WIN  Removed mallory from Administrators   +pts</span>
<span class="cmt">14:12  LIN  Set PASS_MAX_DAYS=90 in login.defs   +pts</span>
<span class="cmt">14:20  WIN  Disabled print spooler -> score DROPPED, re-enabled</span></code></pre>
      ` },
      { title: 'Final 30 Minutes', html: `
        <p>Stop starting new tasks with half an hour left. Use the time to consolidate.</p>
        <ol>
          <li><strong>Verify</strong> every change you made actually took effect.</li>
          <li><strong>Answer</strong> any forensics questions you deferred.</li>
          <li><strong>Re-check</strong> the score for unexpected drops and undo the cause.</li>
          <li><strong>Save</strong> Cisco configs and any unsaved work.</li>
          <li><strong>Confirm</strong> no required service is down and no authorised user is missing.</li>
          <li><strong>Breathe.</strong> Submit calmly.</li>
        </ol>
        <div class="callout tip"><strong>Consistency beats brilliance.</strong> A team that reliably completes the standard checklist every round will out-score a team that gambles on clever one-offs.</div>
      ` },
      { title: 'Strategy Checklist', html: `
        <ol>
          <li>Assign roles before the round starts.</li>
          <li>Read the README and scoring report first, together.</li>
          <li>Work in triage order: fast, high-value first.</li>
          <li>Keep a shared, timestamped log.</li>
          <li>Watch the live score; undo any drop immediately.</li>
          <li>Respect the rules: no internet, no outside help, no pre-made competition checklists.</li>
          <li>Reserve the final 30 minutes for verification and cleanup.</li>
          <li>Debrief after every round and improve the checklist.</li>
        </ol>
      ` }
    ],
    quiz: [
      { q: 'What should you do FIRST in a round?', opts: ['Start disabling services', 'Read the README and scoring report', 'Reboot', 'Run antivirus'], answer: 1, explain: 'The README defines the target state you are scored against.' },
      { q: 'If a change drops your score, you should:', opts: ['Ignore it', 'Undo it immediately', 'Reboot', 'Delete the image'], answer: 1, explain: 'The log tells you what to reverse; undo the drop fast.' },
      { q: 'Which is forbidden in competition?', opts: ['Handwritten team notes', 'Using the README', 'Pre-made competition-specific checklists from others', 'A shared log'], answer: 2, explain: 'Competition-specific checklists from others are prohibited.' },
      { q: 'What is the coordinator\'s main job?', opts: ['Only hack', 'Track the clock and keep the log', 'Ignore the score', 'Work alone'], answer: 1, explain: 'The coordinator manages time and the shared log.' },
      { q: 'What should the final 30 minutes focus on?', opts: ['New tasks', 'Verification and cleanup', 'Rebooting', 'Restarting'], answer: 1, explain: 'Consolidate: verify changes, answer deferred questions, save.' }
    ]
  }
);
