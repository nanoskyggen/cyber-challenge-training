/* ============================================================
   DATA — Linux Hardening Track
   Ubuntu 22.04, Linux Mint 21, Debian 12 (the CyberPatriot images)
   ============================================================ */
window.CDA_DATA = window.CDA_DATA || { tracks: [], modules: [] };

window.CDA_DATA.modules.push(
  /* ===================== LIN 1 ===================== */
  {
    id: 'lin-1', track: 'linux', num: 1,
    title: 'Linux Users & Groups',
    summary: 'Read /etc/passwd and /etc/shadow, spot rogue accounts and UID 0 impostors, and add, lock, or delete users and groups the right way.',
    tags: ['linux', 'users', 'passwd', 'shadow', 'groups', 'useradd', 'uid 0'],
    slides: [
      { title: 'The Linux Account Model', html: `
        <p>Linux stores identity in plain text files, which makes it refreshingly easy to audit. Everything you need lives in three files under <code>/etc</code>:</p>
        <div class="pillarGrid">
          <div class="pillarCard"><h3>/etc/passwd</h3><p class="small">One line per account. Readable by everyone. Holds the username, UID, GID, home directory and login shell.</p></div>
          <div class="pillarCard"><h3>/etc/shadow</h3><p class="small">Password hashes and ageing data. Readable only by root. An <code>*</code> or <code>!</code> in the hash field means login is disabled.</p></div>
          <div class="pillarCard"><h3>/etc/group</h3><p class="small">Group definitions and their members. The <code>sudo</code> (or <code>wheel</code>) group is the one to guard jealously.</p></div>
        </div>
        <p>Each <code>/etc/passwd</code> line has seven colon-separated fields:</p>
        <pre><code><span class="cmt">username : x : UID : GID : comment : home : shell</span>
alice:x:1000:1000:Alice Smith:/home/alice:/bin/bash
root:x:0:0:root:/root:/bin/bash</code></pre>
      ` },
      { title: 'Reading the User List', html: `
        <p>Start every Linux round by listing accounts. The fastest way to see only the <em>human</em> accounts is to filter out system accounts, which use <code>/usr/sbin/nologin</code> or <code>/bin/false</code> as their shell.</p>
        <pre><code><span class="cmt"># Everyone, in full</span>
cat /etc/passwd

<span class="cmt"># Only accounts that can actually log in</span>
grep -vE '/(nologin|false)$' /etc/passwd

<span class="cmt"># Show UID, username and shell side by side</span>
awk -F: '{print $3, $1, $7}' /etc/passwd</code></pre>
        <div class="callout tip"><strong>Know your normal.</strong> A stock Ubuntu image has <code>root</code> plus one user you created (usually UID 1000). Anything else with a real shell and a UID below 1000 deserves a hard look.</div>
      ` },
      { title: 'The UID 0 Impostor', html: `
        <p>The single most dangerous finding on a Linux image is a <strong>second account with UID 0</strong>. UID 0 <em>is</em> root, no matter what the username says. Attackers create these "backdoor root" accounts so they can log in even if the real root password changes.</p>
        <pre><code><span class="cmt"># Find every account with UID 0 (there should be exactly one: root)</span>
awk -F: '$3==0 {print $1}' /etc/passwd</code></pre>
        <p>If the output is anything other than a single <code>root</code> line, you have found a backdoor. Remove the account entirely:</p>
        <pre><code><span class="cmt"># Delete the rogue account and its home directory</span>
sudo userdel -r badactor</code></pre>
        <div class="callout danger"><strong>Also check the sudo group.</strong> An attacker rarely stops at one trick. Run <code>getent group sudo</code> and remove anyone the README does not authorise.</div>
      ` },
      { title: 'Creating, Locking and Deleting Users', html: `
        <p>Use the friendly wrappers on Ubuntu/Mint/Debian. They create the home directory and prompt for a password in one step.</p>
        <pre><code><span class="cmt"># Create a new user (interactive)</span>
sudo adduser dana

<span class="cmt"># Lock an account without deleting it (prefixes the hash with !)</span>
sudo usermod -L olduser

<span class="cmt"># Unlock it again</span>
sudo usermod -U olduser

<span class="cmt"># Give an account no login shell (service account)</span>
sudo usermod -s /usr/sbin/nologin svcuser

<span class="cmt"># Delete a user and their home directory</span>
sudo userdel -r olduser</code></pre>
        <div class="callout warn"><strong>Lock vs. delete.</strong> If the README says an account is "not authorised", delete it. If it says an account should be "disabled", lock it. Match the wording exactly.</div>
      ` },
      { title: 'Groups and the sudo Group', html: `
        <p>Groups grant privileges in bulk. The most important one is <code>sudo</code> (on Debian/Ubuntu) or <code>wheel</code> (on RHEL/Fedora). Membership there is equivalent to being an administrator.</p>
        <pre><code><span class="cmt"># Who can become root?</span>
getent group sudo

<span class="cmt"># Show the groups a user belongs to</span>
groups alice
id alice

<span class="cmt"># Add a user to a group (note: -a to APPEND, or you'll wipe their groups)</span>
sudo usermod -aG sudo alice

<span class="cmt"># Remove a user from a group</span>
sudo gpasswd -d alice sudo

<span class="cmt"># Create a group and delete one</span>
sudo groupadd webteam
sudo groupdel webteam</code></pre>
        <div class="callout danger"><strong>The classic mistake.</strong> <code>usermod -G</code> without <code>-a</code> <em>replaces</em> a user's group list. Always write <code>usermod -aG</code>.</div>
      ` },
      { title: 'Password Ageing with chage', html: `
        <p>Each account carries password-ageing rules stored in <code>/etc/shadow</code>. The <code>chage</code> tool reads and edits them. Competitions frequently ask you to expire a password or force a change at next login.</p>
        <pre><code><span class="cmt"># View ageing info for a user</span>
sudo chage -l alice

<span class="cmt"># Force a password change at next login</span>
sudo chage -d 0 alice

<span class="cmt"># Expire an account on a specific date (YYYY-MM-DD)</span>
sudo chage -E 2025-12-31 tempuser

<span class="cmt"># Set maximum password age to 90 days</span>
sudo chage -M 90 alice</code></pre>
        <div class="callout tip"><strong>chage -d 0 is a favourite.</strong> It is the cleanest way to satisfy "the user must set a new password on first login" style requirements.</div>
      ` },
      { title: 'Users & Groups Checklist', html: `
        <ol>
          <li><code>awk -F: '$3==0 {print $1}' /etc/passwd</code> &mdash; exactly one root, no impostors.</li>
          <li>Compare <code>/etc/passwd</code> against the README's authorised list.</li>
          <li><code>getent group sudo</code> &mdash; only authorised administrators.</li>
          <li>Delete unauthorised accounts (<code>userdel -r</code>); lock ones that must remain.</li>
          <li>Check for empty passwords: <code>sudo awk -F: '($2==""){print $1}' /etc/shadow</code>.</li>
          <li>Give service accounts a <code>nologin</code> shell.</li>
          <li>Apply password ageing with <code>chage</code> where the README requires it.</li>
          <li>Log every change.</li>
        </ol>
      ` }
    ],
    quiz: [
      { q: 'Which file holds the password hashes?', opts: ['/etc/passwd', '/etc/shadow', '/etc/group', '/etc/login.defs'], answer: 1, explain: '/etc/shadow stores hashes and is readable only by root.' },
      { q: 'How do you find every account with UID 0?', opts: ["awk -F: '$3==0 {print $1}' /etc/passwd", 'cat /etc/shadow', 'groups root', 'ls -l /root'], answer: 0, explain: 'UID 0 is root; this awk prints any impostor accounts.' },
      { q: 'What does a "!" at the start of a hash in /etc/shadow mean?', opts: ['Password is empty', 'Account is locked', 'User is root', 'Password never expires'], answer: 1, explain: 'A leading ! locks the account.' },
      { q: 'Which command adds a user to the sudo group without removing their other groups?', opts: ['usermod -G sudo alice', 'usermod -aG sudo alice', 'groupadd sudo alice', 'chage -G sudo alice'], answer: 1, explain: '-aG appends; plain -G would replace the group list.' },
      { q: 'What does "chage -d 0 alice" do?', opts: ['Deletes alice', 'Forces a password change at next login', 'Locks alice', 'Sets password to never expire'], answer: 1, explain: 'Setting the last-change day to 0 forces a change at next login.' }
    ]
  },

  /* ===================== LIN 2 ===================== */
  {
    id: 'lin-2', track: 'linux', num: 2,
    title: 'PAM Password Policy & Account Security',
    summary: 'Configure password complexity with pam_pwquality, set ageing defaults in login.defs, and lock out brute-force attempts with faillock.',
    tags: ['linux', 'pam', 'pwquality', 'login.defs', 'password policy', 'faillock'],
    slides: [
      { title: 'Two Files, Two Jobs', html: `
        <p>Linux password rules are split across two configuration areas, and competitions test both.</p>
        <div class="pillarGrid">
          <div class="pillarCard"><h3>Complexity</h3><p class="small">How <em>strong</em> a password must be: length, character classes, similarity. Controlled by <strong>PAM</strong> (<code>pam_pwquality</code>) and <code>/etc/security/pwquality.conf</code>.</p></div>
          <div class="pillarCard"><h3>Ageing</h3><p class="small">How <em>often</em> it must change and how long it lives: <code>PASS_MAX_DAYS</code>, <code>PASS_MIN_DAYS</code>. Controlled by <code>/etc/login.defs</code>.</p></div>
        </div>
        <p>PAM (Pluggable Authentication Modules) is the framework that every login, <code>su</code>, and <code>sudo</code> call passes through. Its rules live in <code>/etc/pam.d/</code>.</p>
      ` },
      { title: 'pwquality.conf — The Complexity Engine', html: `
        <p>On Debian, Ubuntu and Mint the complexity rules are read from <code>/etc/security/pwquality.conf</code>. Edit it with a text editor as root.</p>
        <pre><code><span class="cmt"># /etc/security/pwquality.conf</span>
minlen = 12        <span class="cmt"># minimum length</span>
dcredit = -1       <span class="cmt"># require at least 1 digit</span>
ucredit = -1       <span class="cmt"># require at least 1 uppercase</span>
lcredit = -1       <span class="cmt"># require at least 1 lowercase</span>
ocredit = -1       <span class="cmt"># require at least 1 symbol</span>
minclass = 4       <span class="cmt"># require 4 of the 4 classes</span>
retry = 3          <span class="cmt"># attempts before failure</span></code></pre>
        <div class="callout tip"><strong>Negative numbers mean "require".</strong> A value of <code>-1</code> demands at least one of that character type; a positive value gives credit toward length.</div>
      ` },
      { title: 'Wiring PAM to pwquality', html: `
        <p>The config file only takes effect if a PAM module references it. Check <code>/etc/pam.d/common-password</code> (Debian family):</p>
        <pre><code><span class="cmt"># /etc/pam.d/common-password</span>
password requisite pam_pwquality.so retry=3
password [success=1 default=ignore] pam_unix.so obscure sha512</code></pre>
        <p>If <code>pam_pwquality.so</code> is missing, add the line. Older systems use <code>pam_cracklib.so</code> instead. After editing, test that a weak password is rejected:</p>
        <pre><code><span class="cmt"># Try to set a weak password (should be refused)</span>
sudo passwd alice</code></pre>
        <div class="callout warn"><strong>Don't break login.</strong> A typo in a PAM file can lock everyone out, including root. Keep a root shell open while testing, and revert if logins fail.</div>
      ` },
      { title: 'login.defs — Ageing Defaults', html: `
        <p><code>/etc/login.defs</code> sets the <em>default</em> ageing applied to new accounts. Changing it does not retroactively update existing users &mdash; use <code>chage</code> for those.</p>
        <pre><code><span class="cmt"># /etc/login.defs</span>
PASS_MAX_DAYS   90     <span class="cmt"># password must be changed every 90 days</span>
PASS_MIN_DAYS   7      <span class="cmt"># can't change again for 7 days</span>
PASS_WARN_AGE   14     <span class="cmt"># warn 14 days before expiry</span>
PASS_MIN_LEN    12     <span class="cmt"># legacy length (pwquality is preferred)</span></code></pre>
        <p>Competition READMEs often state a specific maximum age, e.g. "passwords must expire every 60 days". Set <code>PASS_MAX_DAYS</code> to match, then apply it to existing accounts.</p>
      ` },
      { title: 'Locking Out Brute Force with faillock', html: `
        <p>Account lockout stops password guessing. Modern Debian/Ubuntu uses <code>pam_faillock</code>, configured in <code>/etc/security/faillock.conf</code>.</p>
        <pre><code><span class="cmt"># /etc/security/faillock.conf</span>
deny = 5              <span class="cmt"># lock after 5 failures</span>
unlock_time = 900     <span class="cmt"># stay locked for 15 minutes</span>
fail_interval = 900   <span class="cmt"># count failures within 15 minutes</span></code></pre>
        <p>Older systems used <code>pam_tally2</code> with settings in <code>/etc/pam.d/common-auth</code>. You can inspect and clear the current lock state:</p>
        <pre><code>sudo faillock --user alice
sudo faillock --user alice --reset</code></pre>
      ` },
      { title: 'Password Policy Checklist', html: `
        <ol>
          <li>Set <code>minlen</code> and character-class requirements in <code>/etc/security/pwquality.conf</code>.</li>
          <li>Confirm <code>pam_pwquality.so</code> is referenced in <code>/etc/pam.d/common-password</code>.</li>
          <li>Set <code>PASS_MAX_DAYS</code> / <code>PASS_MIN_DAYS</code> / <code>PASS_WARN_AGE</code> in <code>/etc/login.defs</code>.</li>
          <li>Apply ageing to existing users with <code>chage</code>.</li>
          <li>Configure lockout via <code>faillock.conf</code> (deny, unlock_time).</li>
          <li>Verify no accounts have empty passwords.</li>
          <li>Test a weak password is rejected; test a good one still works.</li>
          <li>Log the changes.</li>
        </ol>
      ` }
    ],
    quiz: [
      { q: 'Which file sets password complexity on Debian/Ubuntu?', opts: ['/etc/login.defs', '/etc/security/pwquality.conf', '/etc/shadow', '/etc/pam.d/login'], answer: 1, explain: 'pwquality.conf drives pam_pwquality complexity rules.' },
      { q: 'In pwquality.conf, what does "ucredit = -1" mean?', opts: ['Allow one uppercase', 'Require at least one uppercase', 'Disallow uppercase', 'Ignore uppercase'], answer: 1, explain: 'A negative value requires at least that many of the class.' },
      { q: 'Which file sets default PASS_MAX_DAYS?', opts: ['/etc/login.defs', '/etc/passwd', '/etc/security/pwquality.conf', '/etc/sudoers'], answer: 0, explain: 'login.defs holds the ageing defaults for new accounts.' },
      { q: 'Which module provides modern account lockout?', opts: ['pam_pwquality', 'pam_faillock', 'pam_unix', 'pam_limits'], answer: 1, explain: 'pam_faillock (configured in faillock.conf) locks after failed attempts.' },
      { q: 'Changing login.defs affects which accounts immediately?', opts: ['All existing accounts', 'Only new accounts', 'Only root', 'No accounts'], answer: 1, explain: 'It sets defaults for new accounts; use chage for existing ones.' }
    ]
  },

  /* ===================== LIN 3 ===================== */
  {
    id: 'lin-3', track: 'linux', num: 3,
    title: 'File Permissions & Ownership',
    summary: 'Decode rwx permissions, use chmod and chown, hunt SUID and world-writable files, and fix the classic insecure permission findings.',
    tags: ['linux', 'permissions', 'chmod', 'chown', 'suid', 'world-writable', 'umask'],
    slides: [
      { title: 'Decoding ls -l', html: `
        <p>Every file carries permissions for three audiences: the <strong>owner</strong>, the <strong>group</strong>, and <strong>others</strong>. Reading <code>ls -l</code> is a core exam skill.</p>
        <pre><code>-rwxr-x--- 1 alice webteam 4096 Jun 1 12:00 report.sh
│└┬┘└┬┘└┬┘
│ │  │  └── others: --- (no access)
│ │  └───── group:  r-x (read + execute)
│ └──────── owner:  rwx (read + write + execute)
└────────── type: - file, d directory, l symlink</code></pre>
        <p>Each permission maps to a number: <strong>r = 4</strong>, <strong>w = 2</strong>, <strong>x = 1</strong>. Add them per audience to get the octal form.</p>
        <div class="table-wrap"><table>
          <thead><tr><th>Symbolic</th><th>Octal</th><th>Meaning</th></tr></thead>
          <tbody>
            <tr><td>rwxr-xr-x</td><td>755</td><td>Owner full; everyone else read+execute</td></tr>
            <tr><td>rw-r--r--</td><td>644</td><td>Owner writes; others read only</td></tr>
            <tr><td>rwx------</td><td>700</td><td>Owner only &mdash; ideal for private files</td></tr>
            <tr><td>rwxrwxrwx</td><td>777</td><td>Everyone full control &mdash; usually a finding</td></tr>
          </tbody>
        </table></div>
      ` },
      { title: 'chmod and chown', html: `
        <p>Two commands do almost all the work. <code>chmod</code> changes permissions; <code>chown</code> changes ownership.</p>
        <pre><code><span class="cmt"># Octal mode</span>
chmod 640 secrets.txt

<span class="cmt"># Symbolic mode: add execute for the owner</span>
chmod u+x script.sh

<span class="cmt"># Remove write for group and others</span>
chmod go-w shared.txt

<span class="cmt"># Recursive on a directory</span>
chmod -R 750 /srv/app

<span class="cmt"># Change owner and group</span>
chown alice:webteam report.sh

<span class="cmt"># Change group only</span>
chgrp webteam report.sh</code></pre>
        <div class="callout tip"><strong>Fix the home directory too.</strong> A common finding is a home directory readable by everyone. <code>chmod 750 /home/alice</code> locks it down.</div>
      ` },
      { title: 'SUID and SGID — The Big One', html: `
        <p>A file with the <strong>SUID</strong> bit runs as its <em>owner</em> regardless of who launched it. If that owner is root, the program runs with root power. Legitimate examples exist (<code>passwd</code>, <code>sudo</code>, <code>ping</code>), but attackers plant SUID copies of shells to keep root access.</p>
        <pre><code><span class="cmt"># List all SUID binaries (runs as owner)</span>
sudo find / -perm -4000 -type f 2>/dev/null

<span class="cmt"># List all SGID binaries (runs as group)</span>
sudo find / -perm -2000 -type f 2>/dev/null

<span class="cmt"># In ls -l, SUID shows as an 's' in the owner's execute slot</span>
-rwsr-xr-x 1 root root ... /usr/bin/passwd</code></pre>
        <p>Compare the list against what should exist. A SUID binary in <code>/tmp</code>, <code>/home</code>, or with an unusual name is almost certainly malicious.</p>
        <div class="callout danger"><strong>Remove the bit, don't just delete.</strong> If a legitimate tool has an unnecessary SUID bit, <code>chmod u-s file</code>. If the file itself is malware, remove it &mdash; but note the path first for the forensics question.</div>
      ` },
      { title: 'World-Writable Files', html: `
        <p>A file that <em>anyone</em> can write to is a liability: an attacker can alter it, and if root later runs it, they gain root. Hunt them down:</p>
        <pre><code><span class="cmt"># World-writable files (excluding the sticky-bit /tmp)</span>
sudo find / -xdev -type f -perm -0002 2>/dev/null

<span class="cmt"># World-writable DIRECTORIES (without the sticky bit) are worse</span>
sudo find / -xdev -type d -perm -0002 ! -perm -1000 2>/dev/null</code></pre>
        <p>Fix them by removing the "others write" bit:</p>
        <pre><code>chmod o-w /path/to/file</code></pre>
        <div class="callout tip"><strong>Sticky bit.</strong> <code>/tmp</code> is world-writable on purpose, but its sticky bit (<code>+t</code>) means only a file's owner can delete it. Directories that are world-writable <em>without</em> the sticky bit are the real finding.</div>
      ` },
      { title: 'Orphaned Files and umask', html: `
        <p>Files owned by a user or group that no longer exists are called <strong>orphaned</strong>. They often linger after a rogue account is deleted.</p>
        <pre><code><span class="cmt"># Files with no valid owner</span>
sudo find / -xdev -nouser 2>/dev/null

<span class="cmt"># Files with no valid group</span>
sudo find / -xdev -nogroup 2>/dev/null</code></pre>
        <p>The <strong>umask</strong> decides default permissions for new files. A permissive umask (like 000) creates world-writable files by accident.</p>
        <pre><code><span class="cmt"># Show current umask</span>
umask
<span class="cmt"># Set a sane default in /etc/profile or /etc/login.defs</span>
umask 027</code></pre>
      ` },
      { title: 'Permissions Checklist', html: `
        <ol>
          <li><code>sudo find / -perm -4000 -type f 2>/dev/null</code> &mdash; review every SUID binary.</li>
          <li><code>sudo find / -xdev -type f -perm -0002 2>/dev/null</code> &mdash; world-writable files.</li>
          <li>World-writable directories lacking the sticky bit.</li>
          <li>Orphaned files (<code>-nouser</code> / <code>-nogroup</code>).</li>
          <li>Home directories should be <code>750</code> or stricter.</li>
          <li>Check <code>/etc/shadow</code> is <code>640</code> and <code>/etc/passwd</code> is <code>644</code>.</li>
          <li>Set a sane <code>umask</code> (027).</li>
          <li>Log each change with the path and old mode.</li>
        </ol>
      ` }
    ],
    quiz: [
      { q: 'What octal value is "rwxr-xr-x"?', opts: ['644', '755', '700', '777'], answer: 1, explain: '7+5+5 = 755.' },
      { q: 'Which command lists all SUID files?', opts: ['find / -perm -4000 -type f', 'find / -perm -0002', 'ls -l /tmp', 'chmod u+s /'], answer: 0, explain: '-perm -4000 matches the SUID bit.' },
      { q: 'A world-writable directory is safe from deletion attacks if it has the:', opts: ['SUID bit', 'sticky bit', 'SGID bit', 'execute bit'], answer: 1, explain: 'The sticky bit (+t) restricts deletion to file owners.' },
      { q: 'Which command changes a file owner and group?', opts: ['chmod', 'chown', 'umask', 'chgrp'], answer: 1, explain: 'chown user:group file.' },
      { q: 'What does an "s" in the owner execute slot of ls -l mean?', opts: ['Symlink', 'SUID bit set', 'Sticky bit', 'Read-only'], answer: 1, explain: 'It marks the SUID bit.' }
    ]
  },

  /* ===================== LIN 4 ===================== */
  {
    id: 'lin-4', track: 'linux', num: 4,
    title: 'sudo & Privilege Management',
    summary: 'Understand /etc/sudoers, use visudo safely, audit who can become root, and apply least privilege with drop-in files.',
    tags: ['linux', 'sudo', 'sudoers', 'visudo', 'privilege', 'least privilege'],
    slides: [
      { title: 'Why sudo Matters', html: `
        <p>On Linux, <strong>root is god</strong>. Every privilege decision comes down to one question: <em>who can become root?</em> The answer lives in <code>/etc/sudoers</code> and the files in <code>/etc/sudoers.d/</code>.</p>
        <p>Competition scenarios often add an unauthorised user to the <code>sudo</code> group, or grant a user blanket <code>NOPASSWD: ALL</code> rights. Both are findings you must correct.</p>
        <div class="callout tip"><strong>Check three places.</strong> Membership in the <code>sudo</code> group, explicit entries in <code>sudoers</code>, and drop-in files in <code>sudoers.d</code>. Miss one and the backdoor survives.</div>
      ` },
      { title: 'Reading /etc/sudoers', html: `
        <p>The main file defines aliases and rules. A rule looks like <code>who host=(runas) command</code>.</p>
        <pre><code><span class="cmt"># /etc/sudoers</span>
Defaults        env_reset
root    ALL=(ALL:ALL) ALL
%sudo   ALL=(ALL:ALL) ALL      <span class="cmt"># anyone in group sudo</span>
alice   ALL=(ALL) NOPASSWD: ALL <span class="cmt"># alice needs no password — suspicious</span></code></pre>
        <p>Check who currently has sudo rights:</p>
        <pre><code><span class="cmt"># What may I run as root?</span>
sudo -l

<span class="cmt"># Who is in the sudo group?</span>
getent group sudo</code></pre>
      ` },
      { title: 'Editing Safely with visudo', html: `
        <p><strong>Never edit <code>/etc/sudoers</code> with a plain text editor.</strong> A syntax error can lock everyone out of root. Use <code>visudo</code>, which validates the file before saving.</p>
        <pre><code><span class="cmt"># Edit the main sudoers file (validates on save)</span>
sudo visudo

<span class="cmt"># Edit a drop-in file (preferred for custom rules)</span>
sudo visudo -f /etc/sudoers.d/cyberteam</code></pre>
        <div class="callout warn"><strong>Drop-in files must not contain dots.</strong> A file named <code>my.rules</code> in <code>sudoers.d</code> is ignored. Use <code>myrules</code> or <code>90-cyberteam</code>.</div>
      ` },
      { title: 'Applying Least Privilege', html: `
        <p>Least privilege means granting the smallest right that gets the job done. Instead of <code>ALL</code>, allow only the specific commands a role needs.</p>
        <pre><code><span class="cmt"># Bad: full root, no password</span>
webadmin ALL=(ALL) NOPASSWD: ALL

<span class="cmt"># Better: only restart the web server, with a password</span>
webadmin ALL=(root) /usr/bin/systemctl restart nginx</code></pre>
        <p>To remove a user's blanket access, delete their line from <code>sudoers</code> (via <code>visudo</code>) and remove them from the <code>sudo</code> group:</p>
        <pre><code>sudo gpasswd -d mallory sudo</code></pre>
      ` },
      { title: 'The su Command and root Login', html: `
        <p><code>su</code> switches users; <code>su -</code> gives a full login shell as that user. Restricting who may <code>su</code> to root is part of hardening.</p>
        <pre><code><span class="cmt"># Switch to root (needs root's password)</span>
su -

<span class="cmt"># Run a single command as another user</span>
su -s /bin/bash apache -c 'whoami'</code></pre>
        <p>You can restrict <code>su</code> to a group in <code>/etc/pam.d/su</code> by enabling the <code>pam_wheel.so</code> line:</p>
        <pre><code><span class="cmt"># /etc/pam.d/su</span>
auth required pam_wheel.so use_uid</code></pre>
        <p>With that line active, only members of the <code>wheel</code> (or configured) group can <code>su</code> to root.</p>
      ` },
      { title: 'sudo & Privilege Checklist', html: `
        <ol>
          <li><code>getent group sudo</code> &mdash; only authorised administrators.</li>
          <li><code>sudo -l</code> for each user &mdash; look for unexpected <code>NOPASSWD</code> or <code>ALL</code>.</li>
          <li>Read <code>/etc/sudoers</code> and every file in <code>/etc/sudoers.d/</code>.</li>
          <li>Edit only with <code>visudo</code>.</li>
          <li>Remove unauthorised sudo entries and group memberships.</li>
          <li>Replace blanket rights with command-specific rules where possible.</li>
          <li>Consider restricting <code>su</code> with <code>pam_wheel</code>.</li>
          <li>Log the changes.</li>
        </ol>
      ` }
    ],
    quiz: [
      { q: 'Which tool should you use to edit /etc/sudoers?', opts: ['nano', 'vim', 'visudo', 'echo >>'], answer: 2, explain: 'visudo validates syntax before saving.' },
      { q: 'What does "NOPASSWD: ALL" grant?', opts: ['No privileges', 'Passwordless full root', 'Read-only root', 'Group membership'], answer: 1, explain: 'It allows running any command as root without a password.' },
      { q: 'Which command shows what a user may run via sudo?', opts: ['sudo -l', 'groups', 'id', 'whoami'], answer: 0, explain: 'sudo -l lists the caller\'s sudo privileges.' },
      { q: 'A drop-in file in /etc/sudoers.d must NOT contain:', opts: ['numbers', 'dashes', 'dots', 'uppercase'], answer: 2, explain: 'Filenames with dots are ignored by sudo.' },
      { q: 'Which group grants admin rights on Debian/Ubuntu?', opts: ['wheel', 'sudo', 'admin', 'root'], answer: 1, explain: 'The sudo group on Debian/Ubuntu (wheel on RHEL).' }
    ]
  },

  /* ===================== LIN 5 ===================== */
  {
    id: 'lin-5', track: 'linux', num: 5,
    title: 'SSH Hardening',
    summary: 'Lock down sshd_config: disable root login, force key auth, restrict users, and understand the settings competitions always test.',
    tags: ['linux', 'ssh', 'sshd_config', 'keys', 'remote access', 'PermitRootLogin'],
    slides: [
      { title: 'Why SSH Is Targeted', html: `
        <p>SSH is the front door to a Linux server. If it is misconfigured, an attacker can brute-force their way in from anywhere on the internet. Hardening <code>sshd</code> is one of the highest-value tasks in any Linux round.</p>
        <p>All settings live in <code>/etc/ssh/sshd_config</code>. After editing, restart the service and &mdash; crucially &mdash; <strong>test that you can still connect</strong> before closing your session.</p>
        <div class="callout danger"><strong>Don't lock yourself out.</strong> Keep your current SSH session open, make changes, open a <em>second</em> session to verify, and only then close the first.</div>
      ` },
      { title: 'The Settings That Matter', html: `
        <p>These are the directives competitions look for. Edit them in <code>/etc/ssh/sshd_config</code>:</p>
        <pre><code><span class="cmt"># /etc/ssh/sshd_config</span>
PermitRootLogin no            <span class="cmt"># never allow direct root login</span>
PasswordAuthentication no     <span class="cmt"># require SSH keys</span>
PubkeyAuthentication yes
PermitEmptyPasswords no       <span class="cmt"># reject blank passwords</span>
X11Forwarding no              <span class="cmt"># disable GUI forwarding if unused</span>
MaxAuthTries 4                <span class="cmt"># limit guesses per connection</span>
LoginGraceTime 30             <span class="cmt"># seconds to authenticate</span>
AllowUsers alice bob          <span class="cmt"># whitelist who may log in</span>
Protocol 2                    <span class="cmt"># only modern protocol (legacy)</span></code></pre>
        <div class="callout tip"><strong>AllowUsers is powerful.</strong> Listing only authorised accounts means rogue accounts cannot log in even if they exist. It is one of the most reliable point-scorers.</div>
      ` },
      { title: 'Applying and Verifying Changes', html: `
        <p>Always validate the config before restarting, so a typo does not take SSH down.</p>
        <pre><code><span class="cmt"># Check syntax</span>
sudo sshd -t

<span class="cmt"># Restart the service</span>
sudo systemctl restart ssh

<span class="cmt"># Confirm it is running</span>
sudo systemctl status ssh</code></pre>
        <p>If you are connected remotely, open a new terminal and try to log in before you disconnect the old one. If the new session works, you are safe.</p>
      ` },
      { title: 'SSH Keys, the Secure Way', html: `
        <p>Key-based authentication is far stronger than passwords. You generate a key pair, keep the private key secret, and place the public key on the server.</p>
        <pre><code><span class="cmt"># On your workstation: generate a key pair</span>
ssh-keygen -t ed25519 -C "alice@example.com"

<span class="cmt"># Copy the public key to the server</span>
ssh-copy-id alice@server

<span class="cmt"># The server stores it here, owned by the user, mode 600</span>
~/.ssh/authorized_keys</code></pre>
        <div class="callout warn"><strong>Permissions matter.</strong> If <code>~/.ssh</code> is not <code>700</code> and <code>authorized_keys</code> not <code>600</code>, SSH refuses the key. Ownership must be the user, not root.</div>
      ` },
      { title: 'Auditing SSH on a Competition Image', html: `
        <p>On a scored image you usually will not create keys &mdash; you will tighten an existing config. Work through this audit:</p>
        <pre><code><span class="cmt"># Show the effective config (comments stripped)</span>
grep -vE '^\s*#|^\s*$' /etc/ssh/sshd_config

<span class="cmt"># Find any permissive settings</span>
grep -Ei 'permitrootlogin|passwordauthentication|permitempty' /etc/ssh/sshd_config</code></pre>
        <p>Watch for a second config file that could override the first. Debian/Ubuntu read drop-ins from <code>/etc/ssh/sshd_config.d/</code>:</p>
        <pre><code>ls -l /etc/ssh/sshd_config.d/</code></pre>
      ` },
      { title: 'SSH Hardening Checklist', html: `
        <ol>
          <li><code>PermitRootLogin no</code>.</li>
          <li><code>PasswordAuthentication no</code> (keys only) &mdash; if the README allows passwords, at least keep root off.</li>
          <li><code>PermitEmptyPasswords no</code>.</li>
          <li>Set <code>AllowUsers</code> to the authorised list.</li>
          <li>Reduce <code>MaxAuthTries</code> and <code>LoginGraceTime</code>.</li>
          <li>Disable <code>X11Forwarding</code> if unused.</li>
          <li>Check <code>sshd_config.d/</code> for overriding drop-ins.</li>
          <li>Run <code>sshd -t</code>, restart, and verify a login still works.</li>
        </ol>
      ` }
    ],
    quiz: [
      { q: 'Which directive disables direct root SSH login?', opts: ['AllowRoot no', 'PermitRootLogin no', 'RootLogin false', 'DenyRoot yes'], answer: 1, explain: 'PermitRootLogin no is the correct directive.' },
      { q: 'Which command validates sshd_config syntax?', opts: ['sshd -t', 'ssh -t', 'systemctl check ssh', 'sshd --verify'], answer: 0, explain: 'sshd -t tests the configuration file.' },
      { q: 'What does AllowUsers do?', opts: ['Lists users who may log in via SSH', 'Blocks all users', 'Creates users', 'Sets passwords'], answer: 0, explain: 'It whitelists the accounts permitted to connect.' },
      { q: 'What permissions should ~/.ssh/authorized_keys have?', opts: ['777', '644', '600', '755'], answer: 2, explain: 'SSH requires 600 (and ~/.ssh at 700).' },
      { q: 'Which setting forces key-based authentication?', opts: ['PubkeyAuthentication no', 'PasswordAuthentication no', 'PermitEmptyPasswords yes', 'X11Forwarding yes'], answer: 1, explain: 'Disabling password auth leaves keys as the method.' }
    ]
  },

  /* ===================== LIN 6 ===================== */
  {
    id: 'lin-6', track: 'linux', num: 6,
    title: 'Linux Firewalls (UFW & iptables)',
    summary: 'Enable and configure UFW, understand default-deny policy, and read the underlying iptables rules that protect the host.',
    tags: ['linux', 'firewall', 'ufw', 'iptables', 'ports', 'default deny'],
    slides: [
      { title: 'Firewall Fundamentals', html: `
        <p>A firewall decides which network traffic is allowed to reach the machine. The security posture you want is <strong>default-deny</strong>: block everything, then open only the ports the business needs.</p>
        <p>On Ubuntu and Mint the friendly front-end is <strong>UFW</strong> (Uncomplicated Firewall). Underneath, it writes <strong>iptables</strong> rules. You should understand both.</p>
        <div class="callout tip"><strong>Know the required ports first.</strong> The README will say things like "the web server must stay reachable on port 80/443". Open those; close the rest.</div>
      ` },
      { title: 'Enabling and Configuring UFW', html: `
        <pre><code><span class="cmt"># Set default policy: deny incoming, allow outgoing</span>
sudo ufw default deny incoming
sudo ufw default allow outgoing

<span class="cmt"># Allow the services the scenario needs</span>
sudo ufw allow 22/tcp      <span class="cmt"># SSH</span>
sudo ufw allow 80/tcp      <span class="cmt"># HTTP</span>
sudo ufw allow 443/tcp     <span class="cmt"># HTTPS</span>

<span class="cmt"># Enable the firewall</span>
sudo ufw enable

<span class="cmt"># Check status</span>
sudo ufw status verbose</code></pre>
        <div class="callout warn"><strong>Enable SSH before enabling UFW remotely.</strong> If you enable the firewall without allowing port 22, you will cut your own connection.</div>
      ` },
      { title: 'Removing Rules and Denying Traffic', html: `
        <p>If you find an unnecessary open port, remove it. UFW matches rules by their specification.</p>
        <pre><code><span class="cmt"># List rules with numbers</span>
sudo ufw status numbered

<span class="cmt"># Delete rule number 3</span>
sudo ufw delete 3

<span class="cmt"># Explicitly deny a port</span>
sudo ufw deny 23/tcp

<span class="cmt"># Disable the firewall (rarely needed)</span>
sudo ufw disable</code></pre>
        <p>Telnet (23), FTP (21) and other cleartext services should generally be denied &mdash; and ideally the services themselves disabled.</p>
      ` },
      { title: 'Reading iptables Directly', html: `
        <p>UFW is a wrapper; the real rules live in iptables. Being able to read them proves you understand what is actually enforced.</p>
        <pre><code><span class="cmt"># List rules with line numbers</span>
sudo iptables -L -v -n --line-numbers

<span class="cmt"># Look at the INPUT chain policy</span>
sudo iptables -S</code></pre>
        <p>A healthy INPUT chain ends with a policy of <code>DROP</code> or <code>REJECT</code>. If it is <code>ACCEPT</code>, the machine accepts everything by default.</p>
        <div class="callout tip"><strong>Save your rules.</strong> iptables rules vanish on reboot unless persisted. UFW handles this automatically; raw iptables needs <code>iptables-persistent</code>.</div>
      ` },
      { title: 'Seeing What Is Listening', html: `
        <p>A firewall is only half the story &mdash; you must also know what services are listening, so you can decide what even deserves a port.</p>
        <pre><code><span class="cmt"># Modern tool: show listening TCP/UDP sockets with processes</span>
sudo ss -tulpn

<span class="cmt"># Legacy equivalent</span>
sudo netstat -tulpn</code></pre>
        <p>For every listening service, ask: does the README require it? If not, stop and disable it (covered in the next module) and close its port.</p>
      ` },
      { title: 'Firewall Checklist', html: `
        <ol>
          <li><code>sudo ufw status verbose</code> &mdash; is it active?</li>
          <li>Default policy: deny incoming, allow outgoing.</li>
          <li>Allow only the ports the scenario needs (often 22, 80, 443).</li>
          <li>Deny/remove Telnet, FTP and other cleartext services.</li>
          <li><code>sudo ss -tulpn</code> &mdash; reconcile listening ports with the firewall.</li>
          <li>Confirm the INPUT policy is DROP/REJECT.</li>
          <li>Ensure rules survive a reboot.</li>
          <li>Log the changes.</li>
        </ol>
      ` }
    ],
    quiz: [
      { q: 'What is the recommended default UFW policy?', opts: ['Allow incoming', 'Deny incoming', 'Deny outgoing', 'Allow all'], answer: 1, explain: 'Default-deny incoming is the secure posture.' },
      { q: 'Which command shows UFW rules with numbers?', opts: ['ufw list', 'ufw status numbered', 'ufw show', 'iptables -L'], answer: 1, explain: 'ufw status numbered lets you delete by index.' },
      { q: 'What does a DROP policy on the INPUT chain mean?', opts: ['Accept all', 'Reject all incoming by default', 'Allow SSH', 'Disable the firewall'], answer: 1, explain: 'DROP discards unmatched inbound traffic.' },
      { q: 'Which command lists listening ports with processes?', opts: ['ss -tulpn', 'ufw status', 'ipconfig', 'ls -l'], answer: 0, explain: 'ss -tulpn shows sockets and their owning processes.' },
      { q: 'Why allow port 22 before enabling UFW remotely?', opts: ['It is required by law', 'Otherwise you cut your own SSH connection', 'To speed up the firewall', 'It is not necessary'], answer: 1, explain: 'Enabling UFW without allowing SSH would block your session.' }
    ]
  },

  /* ===================== LIN 7 ===================== */
  {
    id: 'lin-7', track: 'linux', num: 7,
    title: 'Packages, Services & System Updates',
    summary: 'Patch with apt, remove insecure software, disable unnecessary services, and audit cron and startup persistence.',
    tags: ['linux', 'apt', 'systemctl', 'services', 'updates', 'cron', 'persistence'],
    slides: [
      { title: 'Keeping the System Patched', html: `
        <p>Unpatched software is the most common way systems are compromised. On Debian/Ubuntu/Mint, the package manager is <strong>apt</strong>.</p>
        <pre><code><span class="cmt"># Refresh the package index</span>
sudo apt update

<span class="cmt"># Install available upgrades</span>
sudo apt upgrade -y

<span class="cmt"># Full upgrade (handles dependency changes)</span>
sudo apt full-upgrade -y

<span class="cmt"># Remove packages no longer needed</span>
sudo apt autoremove -y</code></pre>
        <div class="callout tip"><strong>Competition images may be offline.</strong> If there is no internet, you cannot update. Note that in your log and move on &mdash; do not waste the clock.</div>
      ` },
      { title: 'Removing Insecure Software', html: `
        <p>Old, insecure services are planted as findings. Common culprits: <strong>telnet</strong>, <strong>rsh</strong>, <strong>ftp</strong>, <strong>vsftpd</strong>, and <strong>telnetd</strong>. If the README does not require them, remove them.</p>
        <pre><code><span class="cmt"># List installed packages</span>
dpkg -l | less

<span class="cmt"># Search for a specific one</span>
dpkg -l | grep -i telnet

<span class="cmt"># Remove it (and its config)</span>
sudo apt purge telnetd -y

<span class="cmt"># Remove an installed game or tool the README bans</span>
sudo apt purge <package> -y</code></pre>
        <p>Also check for non-package software in <code>/opt</code>, <code>/usr/local</code>, and users' home directories.</p>
      ` },
      { title: 'Managing Services with systemctl', html: `
        <p>Modern Linux uses <strong>systemd</strong>. A service that is <em>running</em> or <em>enabled at boot</em> but not needed is a finding.</p>
        <pre><code><span class="cmt"># List running services</span>
systemctl list-units --type=service --state=running

<span class="cmt"># List services enabled at boot</span>
systemctl list-unit-files --state=enabled

<span class="cmt"># Stop a service now and disable it at boot</span>
sudo systemctl stop apache2
sudo systemctl disable apache2

<span class="cmt"># Check one service</span>
systemctl status ssh</code></pre>
        <div class="callout warn"><strong>Don't disable the essentials.</strong> Never disable <code>ssh</code> if you are remote, or core services like <code>systemd-journald</code>. Verify against the README.</div>
      ` },
      { title: 'Auditing Scheduled Tasks (cron)', html: `
        <p>Attackers love cron: a scheduled job runs their code repeatedly, even after a reboot. Auditing cron is a classic forensics step.</p>
        <pre><code><span class="cmt"># Current user's cron jobs</span>
crontab -l

<span class="cmt"># Every user's cron jobs (as root)</span>
sudo crontab -l -u alice

<span class="cmt"># System-wide cron files</span>
cat /etc/crontab
ls -l /etc/cron.d/ /etc/cron.daily/ /etc/cron.hourly/

<span class="cmt"># Search all cron locations for a suspicious command</span>
sudo grep -r "curl\|wget\|nc " /etc/cron* /var/spool/cron 2>/dev/null</code></pre>
      ` },
      { title: 'Startup and Shell Persistence', html: `
        <p>Beyond cron, malware persists through shell startup files and systemd units. Check these on every image.</p>
        <pre><code><span class="cmt"># Shell startup files (per user and system-wide)</span>
cat ~/.bashrc ~/.profile ~/.bash_profile
cat /etc/profile /etc/bash.bashrc

<span class="cmt"># Suspicious systemd units</span>
ls -l /etc/systemd/system/
systemctl list-unit-files --state=enabled

<span class="cmt"># rc.local (older systems)</span>
cat /etc/rc.local 2>/dev/null</code></pre>
        <div class="callout danger"><strong>Read before you delete.</strong> If you find malicious persistence, note the exact path and command &mdash; that is often the answer to a forensics question &mdash; then remove it.</div>
      ` },
      { title: 'Packages & Services Checklist', html: `
        <ol>
          <li><code>sudo apt update &amp;&amp; sudo apt upgrade -y</code> if online.</li>
          <li><code>dpkg -l | grep -iE 'telnet|ftp|rsh'</code> &mdash; purge insecure services.</li>
          <li>Remove banned games/tools listed in the README.</li>
          <li><code>systemctl list-unit-files --state=enabled</code> &mdash; disable unneeded services.</li>
          <li>Reconcile running services with <code>ss -tulpn</code>.</li>
          <li>Audit <code>crontab -l</code>, <code>/etc/crontab</code>, <code>/etc/cron.*</code>.</li>
          <li>Check <code>~/.bashrc</code>, <code>/etc/profile</code> and systemd units for persistence.</li>
          <li>Log the changes.</li>
        </ol>
      ` }
    ],
    quiz: [
      { q: 'Which command installs available security updates on Debian/Ubuntu?', opts: ['apt update && apt upgrade', 'yum update', 'pacman -Syu', 'brew upgrade'], answer: 0, explain: 'apt update refreshes the index; apt upgrade installs updates.' },
      { q: 'Which command disables a service at boot?', opts: ['systemctl stop svc', 'systemctl disable svc', 'service svc off', 'kill svc'], answer: 1, explain: 'disable prevents it starting at boot (stop halts it now).' },
      { q: 'Where would you look for a malicious scheduled task?', opts: ['/etc/hosts', 'crontab -l and /etc/cron.d', '/etc/passwd', '/var/log/apt'], answer: 1, explain: 'Cron is the classic persistence mechanism.' },
      { q: 'Which tool lists installed packages?', opts: ['dpkg -l', 'lsmod', 'systemctl', 'ss'], answer: 0, explain: 'dpkg -l lists installed Debian packages.' },
      { q: 'Why is telnet a finding?', opts: ['It is too fast', 'It sends credentials in cleartext', 'It uses too much RAM', 'It is open source'], answer: 1, explain: 'Telnet is unencrypted; use SSH instead.' }
    ]
  }
);
