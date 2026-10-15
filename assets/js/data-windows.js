/* ============================================================
   DATA — Windows Hardening Track
   ============================================================ */
window.CDA_DATA = window.CDA_DATA || { tracks: [], modules: [] };

window.CDA_DATA.modules.push(
  /* ===================== WIN 1 ===================== */
  {
    id: 'win-1', track: 'windows', num: 1,
    title: 'Windows Accounts & User Management',
    summary: 'Find rogue accounts, fix group membership, disable the guest account, and manage local users with lusrmgr.msc, net and PowerShell.',
    tags: ['windows', 'users', 'lusrmgr', 'administrators', 'guest', 'net user'],
    slides: [
      { title: 'The Highest-Value Finding', html: `
        <p>On almost every Windows image, the fastest points come from <strong>user and group mistakes</strong>. The README tells you exactly who should be on the system and who should be an administrator &mdash; so this is a comparison exercise, not a hunt.</p>
        <p>Your goals in this module:</p>
        <ul>
          <li>List every local account and decide: keep, disable, or delete.</li>
          <li>Check who is in the <strong>Administrators</strong> group and remove anyone who should not be.</li>
          <li>Make sure the <strong>Guest</strong> account is disabled.</li>
          <li>Rename or disable default accounts the scenario does not need.</li>
        </ul>
      ` },
      { title: 'Opening Local Users and Groups', html: `
        <p>The GUI tool is <strong>Local Users and Groups</strong>. Open it with the Run dialog (<kbd>Win</kbd>+<kbd>R</kbd>):</p>
        <pre><code>lusrmgr.msc</code></pre>
        <p>You will see two nodes:</p>
        <ul>
          <li><strong>Users</strong> &mdash; every local account. A red circle with a down-arrow means the account is disabled.</li>
          <li><strong>Groups</strong> &mdash; including <strong>Administrators</strong>, <strong>Users</strong>, <strong>Guests</strong>, and <strong>Remote Desktop Users</strong>.</li>
        </ul>
        <div class="callout tip"><strong>Home editions.</strong> Some Windows editions lack <code>lusrmgr.msc</code>. Use the command line or PowerShell instead &mdash; both are shown later in this module.</div>
      ` },
      { title: 'Listing Accounts from the Command Line', html: `
        <p>Command line is faster and scriptable. In an elevated Command Prompt:</p>
        <pre><code><span class="cmt">:: List all local users</span>
net user

<span class="cmt">:: Show details for one account</span>
net user alice

<span class="cmt">:: List members of the Administrators group</span>
net localgroup Administrators

<span class="cmt">:: List members of the Users group</span>
net localgroup Users</code></pre>
        <p>PowerShell equivalents:</p>
        <pre><code><span class="cmt"># All local users</span>
Get-LocalUser
<span class="cmt"># Who is an administrator?</span>
Get-LocalGroupMember -Group Administrators</code></pre>
      ` },
      { title: 'Removing a Rogue Administrator', html: `
        <p>If the README says only <code>alice</code> should be an administrator but <code>mallory</code> is also in the group, remove the extra membership. Removing from the group is usually better than deleting the account, unless the README says the account should not exist at all.</p>
        <pre><code><span class="cmt">:: Remove mallory from Administrators (keeps the account)</span>
net localgroup Administrators mallory /delete

<span class="cmt">:: PowerShell equivalent</span>
Remove-LocalGroupMember -Group Administrators -Member mallory</code></pre>
        <div class="callout warn"><strong>Do not lock yourself out.</strong> Never remove the last administrator, and never remove the account you are logged in as unless the scenario says to. Keep one working admin.</div>
      ` },
      { title: 'Creating, Disabling and Deleting Accounts', html: `
        <p>Match the system to the README precisely:</p>
        <pre><code><span class="cmt">:: Create an authorized user</span>
net user bob P@ssw0rd!2024 /add

<span class="cmt">:: Add them to a group</span>
net localgroup Users bob /add

<span class="cmt">:: Disable an account that should not be active</span>
net user guest /active:no

<span class="cmt">:: Delete an account the scenario says should not exist</span>
net user mallory /delete</code></pre>
        <div class="callout"><strong>Disable vs delete.</strong> If the README says a user is "not authorized", deleting is usually correct. If it says an account is "temporarily" not in use, disabling is safer. When unsure, read the scenario again &mdash; and log your decision.</div>
      ` },
      { title: 'The Guest Account and Built-in Accounts', html: `
        <p>Two built-in accounts need attention on every image:</p>
        <ul>
          <li><strong>Guest</strong> &mdash; passwordless access. It should be <strong>disabled</strong> unless the scenario explicitly needs it.</li>
          <li><strong>Administrator</strong> &mdash; the built-in superuser. It is often disabled by default; leave it disabled unless required, and if it must be active, give it a strong password and consider renaming it.</li>
        </ul>
        <pre><code><span class="cmt">:: Confirm guest is disabled</span>
net user guest
<span class="cmt">:: Disable it if needed</span>
net user guest /active:no</code></pre>
      ` },
      { title: 'Groups, Remote Access and Hidden Accounts', html: `
        <p>Beyond Administrators, check these groups:</p>
        <div class="table-wrap"><table>
          <thead><tr><th>Group</th><th>Risk</th><th>Action</th></tr></thead>
          <tbody>
            <tr><td>Administrators</td><td>Full control</td><td>Only authorized admins</td></tr>
            <tr><td>Remote Desktop Users</td><td>Remote login</td><td>Remove unauthorized members</td></tr>
            <tr><td>Remote Management Users</td><td>WinRM access</td><td>Restrict</td></tr>
            <tr><td>Backup Operators</td><td>Can read any file</td><td>Rarely needed &mdash; empty it</td></tr>
          </tbody>
        </table></div>
        <p>Also watch for <strong>hidden accounts</strong> &mdash; a user whose name ends in <code>$</code> is hidden from <code>net user</code> but visible in <code>lusrmgr.msc</code> and with PowerShell. Look for accounts with unexpected names or no description.</p>
      ` },
      { title: 'Windows Accounts Checklist', html: `
        <div class="callout tip"><strong>Run this every round.</strong></div>
        <ol>
          <li>Read the README's authorized-user and admin lists.</li>
          <li><code>net user</code> &mdash; compare every account to the list.</li>
          <li><code>net localgroup Administrators</code> &mdash; remove extra admins.</li>
          <li>Disable <strong>Guest</strong>; check the built-in <strong>Administrator</strong>.</li>
          <li>Check Remote Desktop / Remote Management groups.</li>
          <li>Look for hidden accounts (names ending in <code>$</code>).</li>
          <li>Log every change you made.</li>
        </ol>
      ` }
    ],
    quiz: [
      { q: 'Which command lists members of the Administrators group?', opts: ['net user', 'net localgroup Administrators', 'net share', 'ipconfig /all'], answer: 1, explain: 'net localgroup Administrators lists the group\u2019s members.' },
      { q: 'The Guest account should normally be:', opts: ['Enabled with no password', 'Disabled', 'An administrator', 'Deleted from the registry'], answer: 1, explain: 'Guest allows passwordless access and should be disabled unless required.' },
      { q: 'A username ending in $ on Windows typically indicates:', opts: ['An administrator', 'A hidden account', 'A service account that is safe', 'A disabled account'], answer: 1, explain: 'Accounts ending in $ are hidden from net user output.' },
      { q: 'Which is the safer action when the README says a user is "not authorized"?', opts: ['Ignore it', 'Delete the account', 'Make them an admin', 'Change their password'], answer: 1, explain: 'An unauthorized account should be removed; disabling is for accounts temporarily out of use.' },
      { q: 'Which group can read any file on the system and should usually be empty?', opts: ['Users', 'Backup Operators', 'Guests', 'Performance Log Users'], answer: 1, explain: 'Backup Operators can bypass file permissions and is rarely needed.' }
    ]
  },

  /* ===================== WIN 2 ===================== */
  {
    id: 'win-2', track: 'windows', num: 2,
    title: 'Password & Account Lockout Policy',
    summary: 'Configure minimum length, complexity, maximum age, history and lockout through secpol.msc, gpedit, and net accounts.',
    tags: ['windows', 'password policy', 'secpol', 'lockout', 'net accounts', 'gpedit'],
    slides: [
      { title: 'Why Password Policy Is Its Own Category', html: `
        <p>Weak passwords are the most common way attackers get in. The competition scores password policy as its own category because it is one of the highest-impact, easiest fixes on any image.</p>
        <p>You will configure five settings:</p>
        <ul>
          <li><strong>Minimum password length</strong> &mdash; at least 8, often 12 in the scenario.</li>
          <li><strong>Complexity requirements</strong> &mdash; mix of upper, lower, digits, symbols.</li>
          <li><strong>Maximum password age</strong> &mdash; forces periodic changes.</li>
          <li><strong>Minimum password age</strong> &mdash; stops users cycling back immediately.</li>
          <li><strong>Password history</strong> &mdash; remember previous passwords.</li>
        </ul>
      ` },
      { title: 'Local Security Policy (secpol.msc)', html: `
        <p>The GUI is <strong>Local Security Policy</strong>. Open it from Run:</p>
        <pre><code>secpol.msc</code></pre>
        <p>Navigate to <strong>Account Policies</strong>:</p>
        <ul>
          <li><strong>Password Policy</strong> &mdash; length, complexity, age, history.</li>
          <li><strong>Account Lockout Policy</strong> &mdash; lockout threshold, duration, reset counter.</li>
        </ul>
        <div class="callout tip"><strong>Complexity requires a mix.</strong> Enabling "Password must meet complexity requirements" enforces at least three of: uppercase, lowercase, digits, symbols, and it forbids the username inside the password.</div>
      ` },
      { title: 'The Command-Line Shortcut: net accounts', html: `
        <p>The fastest way to view and set policy is <code>net accounts</code> in an elevated prompt:</p>
        <pre><code><span class="cmt">:: View current policy</span>
net accounts

<span class="cmt">:: Set policy (length 12, age 60, min age 1, history 24)</span>
net accounts /minpwlen:12 /maxpwage:60 /minpwage:1 /uniquepw:24

<span class="cmt">:: Force lockout after 5 bad attempts, reset after 15 minutes</span>
net accounts /lockoutthreshold:5 /lockoutduration:15 /lockoutwindow:15</code></pre>
        <p>Typical output to read carefully:</p>
        <pre><code>Minimum password length:                 0   <span class="cmt">← finding!</span>
Maximum password age (days):             42
Lockout threshold:                       Never  <span class="cmt">← finding!</span></code></pre>
        <div class="callout danger">A minimum length of <strong>0</strong> and a lockout threshold of <strong>Never</strong> are two separate, high-value findings on that output alone.</div>
      ` },
      { title: 'Lockout Policy in Detail', html: `
        <p>Account lockout stops brute-force guessing by locking an account after a set number of failed attempts.</p>
        <div class="table-wrap"><table>
          <thead><tr><th>Setting</th><th>Meaning</th><th>Typical value</th></tr></thead>
          <tbody>
            <tr><td>Lockout threshold</td><td>Failed attempts before lock</td><td>5&ndash;10</td></tr>
            <tr><td>Lockout duration</td><td>Minutes locked</td><td>15&ndash;30</td></tr>
            <tr><td>Reset counter after</td><td>Minutes before attempts reset</td><td>15</td></tr>
          </tbody>
        </table></div>
        <div class="callout warn"><strong>Do not lock everyone out.</strong> If the README specifies values, use them exactly. A threshold that is too low can lock legitimate users (including you) out mid-round.</div>
      ` },
      { title: 'Setting Policy with PowerShell', html: `
        <p>On modern Windows you can also use PowerShell (with the Security module):</p>
        <pre><code><span class="cmt"># View current password policy</span>
Get-ADDefaultDomainPasswordPolicy   <span class="cmt"># domain only</span>
<span class="cmt"># Local machine policy is set via secedit or net accounts.</span>
net accounts</code></pre>
        <p>For bulk configuration, <code>secedit</code> can export, edit, and re-import the local security database:</p>
        <pre><code>secedit /export /cfg C:\secpol.cfg
<span class="cmt">:: edit secpol.cfg, then:</span>
secedit /configure /db secedit.sdb /cfg C:\secpol.cfg</code></pre>
      ` },
      { title: 'Group Policy (gpedit) for Password Rules', html: `
        <p>On Pro/Enterprise/Server editions, <strong>gpedit.msc</strong> (Local Group Policy Editor) also exposes these settings under:</p>
        <pre><code>Computer Configuration → Windows Settings → Security Settings →
  Account Policies → Password Policy / Account Lockout Policy</code></pre>
        <p>Group Policy and <code>secpol.msc</code> edit the same underlying settings; changes in one appear in the other. Use whichever is faster for you.</p>
        <div class="callout tip"><strong>Run gpupdate.</strong> After policy changes, run <code>gpupdate /force</code> to apply immediately.</div>
      ` },
      { title: 'Password Policy Checklist', html: `
        <ol>
          <li>Read the README for required values.</li>
          <li><code>net accounts</code> &mdash; note current length, age, history, lockout.</li>
          <li>Set minimum length (usually 12), complexity on, max age &le; 60, history &ge; 24.</li>
          <li>Set lockout threshold (5&ndash;10), duration, reset window.</li>
          <li>Force a password change for accounts whose password is known-weak.</li>
          <li><code>gpupdate /force</code> if you used Group Policy.</li>
          <li>Log the before/after values.</li>
        </ol>
      ` }
    ],
    quiz: [
      { q: 'Which command shows and sets local password policy from the CLI?', opts: ['net user', 'net accounts', 'net share', 'ipconfig'], answer: 1, explain: 'net accounts views and sets password and lockout policy.' },
      { q: 'A lockout threshold of "Never" means:', opts: ['Accounts lock after 1 try', 'Brute-force attempts are never blocked', 'Passwords never expire', 'The account is disabled'], answer: 1, explain: 'Never means no lockout, so guessing is not rate-limited.' },
      { q: 'Password complexity requires at least how many character categories?', opts: ['1', '2', '3', '4'], answer: 2, explain: 'Complexity requires three of: upper, lower, digit, symbol.' },
      { q: 'Which tool is the GUI for local security settings?', opts: ['lusrmgr.msc', 'secpol.msc', 'services.msc', 'devmgmt.msc'], answer: 1, explain: 'secpol.msc opens Local Security Policy.' },
      { q: 'After changing Group Policy you should run:', opts: ['gpupdate /force', 'ipconfig /flushdns', 'sfc /scannow', 'net user'], answer: 0, explain: 'gpupdate /force applies policy changes immediately.' }
    ]
  },

  /* ===================== WIN 3 ===================== */
  {
    id: 'win-3', track: 'windows', num: 3,
    title: 'Windows Defender & Antivirus',
    summary: 'Ensure real-time protection is on, update signatures, run scans, and check third-party antivirus status.',
    tags: ['windows', 'defender', 'antivirus', 'malware', 'scan', 'security center'],
    slides: [
      { title: 'Antivirus Is a Scored Category', html: `
        <p>Malware is one of the cleanup categories in the results email, and antivirus status is part of the maintenance category. On every Windows image you must confirm that <strong>some</strong> antivirus is present, enabled, and up to date.</p>
        <p>Windows ships with <strong>Microsoft Defender Antivirus</strong>, which is excellent when fully enabled. A common trick in images is to disable it or to install a fake/broken third-party AV that leaves the system unprotected.</p>
      ` },
      { title: 'Windows Security at a Glance', html: `
        <p>Open <strong>Windows Security</strong> from the Start menu, or run:</p>
        <pre><code>windowsdefender:</code></pre>
        <p>Check each section:</p>
        <ul>
          <li><strong>Virus &amp; threat protection</strong> &mdash; real-time protection ON, definitions current.</li>
          <li><strong>Account protection</strong> &mdash; Windows Hello / sign-in options.</li>
          <li><strong>Firewall &amp; network protection</strong> &mdash; all profiles on.</li>
          <li><strong>App &amp; browser control</strong> &mdash; SmartScreen.</li>
        </ul>
        <div class="callout danger">If real-time protection is off or greyed out, that is a finding. Malware often disables Defender via registry keys or Group Policy &mdash; you may need to fix the policy too.</div>
      ` },
      { title: 'Defender from PowerShell', html: `
        <p>PowerShell gives you precise control and is scriptable:</p>
        <pre><code><span class="cmt"># Overall status</span>
Get-MpComputerStatus

<span class="cmt"># Key fields to check</span>
Get-MpComputerStatus | Select RealTimeProtectionEnabled, AntivirusEnabled, AntivirusSignatureLastUpdated, AMServiceEnabled

<span class="cmt"># Turn real-time protection back on</span>
Set-MpPreference -DisableRealtimeMonitoring $false

<span class="cmt"># Update signatures</span>
Update-MpSignature

<span class="cmt"># Quick scan</span>
Start-MpScan -ScanType QuickScan
<span class="cmt"># Full scan (slower, use if time allows)</span>
Start-MpScan -ScanType FullScan</code></pre>
      ` },
      { title: 'When Defender Is Disabled by Policy', html: `
        <p>Attackers (and image authors) sometimes disable Defender through Group Policy so it cannot be re-enabled from the UI. Check:</p>
        <pre><code>gpedit.msc
Computer Configuration → Administrative Templates → Windows Components →
  Microsoft Defender Antivirus</code></pre>
        <p>Look for "Turn off Microsoft Defender Antivirus" set to <strong>Enabled</strong> &mdash; it should be <strong>Not Configured</strong> or <strong>Disabled</strong>. Registry path:</p>
        <pre><code>HKLM\SOFTWARE\Policies\Microsoft\Windows Defender
<span class="cmt">:: DisableAntiSpyware should not be 1</span></code></pre>
        <div class="callout tip">After fixing the policy, run <code>gpupdate /force</code>, then re-check with <code>Get-MpComputerStatus</code>.</div>
      ` },
      { title: 'Third-Party Antivirus', html: `
        <p>If the image has a third-party AV (McAfee, Norton, etc.), confirm it is actually running and updated, not just installed. A "trial expired" or "disabled" third-party AV is a finding.</p>
        <p>Check the <strong>Security and Maintenance</strong> control panel or:</p>
        <pre><code><span class="cmt"># See registered AV products (Security Center)</span>
Get-CimInstance -Namespace root/SecurityCenter2 -ClassName AntiVirusProduct</code></pre>
        <p>If a broken AV is installed and Defender is disabled because of it, either repair the AV or remove it so Defender can take over.</p>
      ` },
      { title: 'Hunting Malware Files', html: `
        <p>Beyond scanning, look for obvious rogue files. Common places malware hides:</p>
        <ul>
          <li><code>C:\Users\&lt;user&gt;\Downloads</code> &mdash; a favourite drop location.</li>
          <li><code>C:\Users\Public</code> and the root of <code>C:\</code>.</li>
          <li><code>%TEMP%</code> and <code>%APPDATA%</code>.</li>
          <li>Startup folders and Run registry keys (see the Services module).</li>
        </ul>
        <div class="callout warn"><strong>Careful.</strong> Only delete files you are confident are malicious or against policy. Deleting a needed file loses points. When in doubt, quarantine via Defender rather than deleting.</div>
      ` },
      { title: 'Defender Checklist', html: `
        <ol>
          <li>Open Windows Security; confirm real-time protection is ON.</li>
          <li><code>Get-MpComputerStatus</code> &mdash; check <code>RealTimeProtectionEnabled</code> and signature date.</li>
          <li>If disabled by policy, fix gpedit / registry, then <code>gpupdate /force</code>.</li>
          <li><code>Update-MpSignature</code> then run a quick scan.</li>
          <li>Check for broken third-party AV.</li>
          <li>Look for obvious malware in Downloads / Public / Temp.</li>
          <li>Log what you changed.</li>
        </ol>
      ` }
    ],
    quiz: [
      { q: 'Which PowerShell command shows Defender\u2019s real-time protection status?', opts: ['Get-MpComputerStatus', 'Get-Process', 'net accounts', 'Get-EventLog'], answer: 0, explain: 'Get-MpComputerStatus reports Defender status and signature dates.' },
      { q: 'A registry value that disables Defender is:', opts: ['DisableAntiSpyware = 1', 'EnableFirewall = 0', 'Guest = 1', 'AutoUpdate = 0'], answer: 0, explain: 'DisableAntiSpyware under the Windows Defender policy key disables it.' },
      { q: 'To force an immediate signature update you run:', opts: ['Update-MpSignature', 'sfc /scannow', 'ipconfig /renew', 'gpupdate /force'], answer: 0, explain: 'Update-MpSignature downloads the latest definitions.' },
      { q: 'If a broken third-party AV blocks Defender, you should:', opts: ['Leave it', 'Repair or remove it so protection works', 'Disable the firewall', 'Ignore it'], answer: 1, explain: 'Protection must actually be active; a dead AV leaves the system exposed.' },
      { q: 'A common malware drop folder to inspect is:', opts: ['C:\\Windows\\System32', 'C:\\Users\\<user>\\Downloads', 'C:\\Program Files', 'C:\\Windows\\Fonts'], answer: 1, explain: 'Downloads is a frequent location for dropped malicious files.' }
    ]
  },

  /* ===================== WIN 4 ===================== */
  {
    id: 'win-4', track: 'windows', num: 4,
    title: 'Windows Update & Patching',
    summary: 'Check for and install missing updates, understand update settings, and know why patching is a scored maintenance category.',
    tags: ['windows', 'update', 'patch', 'wsus', 'wuauserv', 'maintenance'],
    slides: [
      { title: 'Why Updates Are Scored', html: `
        <p>Unpatched software is one of the biggest real-world risks, and it is an easy finding in competition. The results categories include <strong>Updates</strong> under maintenance. Images are often built with updates deliberately missing or with the update service disabled.</p>
        <p>Your job: confirm the update service works, check for pending updates, install them, and make sure automatic updates are not blocked by policy.</p>
      ` },
      { title: 'Checking for Updates in the GUI', html: `
        <p>Open <strong>Settings &rarr; Windows Update</strong>, or run:</p>
        <pre><code>ms-settings:windowsupdate</code></pre>
        <p>Click <strong>Check for updates</strong>. If updates are pending, install them. Note the <strong>last checked</strong> time &mdash; a very old date is a hint the service is broken.</p>
        <div class="callout warn"><strong>Time budget.</strong> Updates can take a long time to download and install. Start them early and continue other work while they run. Some images let you score the "updates available = 0" state only after installing.</div>
      ` },
      { title: 'The Update Service', html: `
        <p>Updates depend on the <strong>Windows Update</strong> service (<code>wuauserv</code>). If it is stopped or disabled, updates fail. Check in <code>services.msc</code> or:</p>
        <pre><code><span class="cmt"># Check the service</span>
Get-Service wuauserv
<span class="cmt"># Set it to start automatically and start it</span>
Set-Service wuauserv -StartupType Automatic
Start-Service wuauserv</code></pre>
        <p>Also check <strong>Background Intelligent Transfer Service</strong> (<code>BITS</code>) and <strong>Windows Update Medic Service</strong>, which can be disabled by malware to block patching.</p>
      ` },
      { title: 'Updates via Command Line', html: `
        <p>You can trigger updates from the command line:</p>
        <pre><code><span class="cmt">:: Open the update UI</span>
control /name Microsoft.WindowsUpdate

<span class="cmt">:: Force a policy refresh</span>
gpupdate /force

<span class="cmt">:: Restart the update service</span>
net stop wuauserv
net start wuauserv</code></pre>
        <p>For deeper control, the <strong>PSWindowsUpdate</strong> module (if installed) can list and install updates:</p>
        <pre><code>Get-WindowsUpdate
Install-WindowsUpdate -AcceptAll</code></pre>
      ` },
      { title: 'Group Policy and Registry Blocks', html: `
        <p>Malware and image authors block updates through policy. Check:</p>
        <pre><code>gpedit.msc
Computer Configuration → Administrative Templates → Windows Components →
  Windows Update</code></pre>
        <ul>
          <li>"Configure Automatic Updates" &mdash; should allow updates (often "Enabled" with auto-install, or "Not Configured").</li>
          <li>"Remove access to use all Windows Update features" &mdash; should be Not Configured.</li>
        </ul>
        <p>Registry location for the update policy:</p>
        <pre><code>HKLM\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate\AU</code></pre>
      ` },
      { title: 'Windows Server Differences', html: `
        <p>On Windows Server images, updates may be managed through <strong>Server Manager</strong> or configured via <strong>WSUS</strong>. The same principles apply:</p>
        <ul>
          <li>Confirm the update service runs.</li>
          <li>Check for and install updates.</li>
          <li>Ensure automatic updates are not disabled by policy.</li>
        </ul>
        <div class="callout tip">Server images also add roles and features to the attack surface &mdash; a topic covered in the Services module.</div>
      ` },
      { title: 'Update Checklist', html: `
        <ol>
          <li>Open Windows Update; click Check for updates.</li>
          <li>Install all pending updates (start early &mdash; they are slow).</li>
          <li>Confirm <code>wuauserv</code> and BITS are running and set to Automatic.</li>
          <li>Check gpedit / registry for update blocks; remove them.</li>
          <li><code>gpupdate /force</code>.</li>
          <li>Re-check until "You're up to date".</li>
          <li>Log the changes.</li>
        </ol>
      ` }
    ],
    quiz: [
      { q: 'Which service must run for Windows Update to work?', opts: ['wuauserv', 'spooler', 'dhcp', 'termservice'], answer: 0, explain: 'wuauserv is the Windows Update service; BITS is also required.' },
      { q: 'A very old "last checked for updates" date suggests:', opts: ['Updates are current', 'The update service is broken or blocked', 'The firewall is off', 'The account is disabled'], answer: 1, explain: 'It hints the update service is stopped or blocked by policy.' },
      { q: 'Which command forces Group Policy to reapply immediately?', opts: ['gpupdate /force', 'ipconfig /all', 'net user', 'sfc /scannow'], answer: 0, explain: 'gpupdate /force reapplies policy settings.' },
      { q: 'Why start updates early in a round?', opts: ['They delete users', 'They can take a long time to install', 'They disable the firewall', 'They change the README'], answer: 1, explain: 'Downloads and installs are slow; start early and work on other items meanwhile.' },
      { q: 'Updates fall under which results category?', opts: ['Forensics', 'Maintenance', 'User Policy', 'Cisco'], answer: 1, explain: 'Updates and antivirus are maintenance categories.' }
    ]
  },

  /* ===================== WIN 5 ===================== */
  {
    id: 'win-5', track: 'windows', num: 5,
    title: 'Services & Startup Programs',
    summary: 'Disable insecure and unnecessary services, trim startup items, and understand how services widen the attack surface.',
    tags: ['windows', 'services', 'startup', 'msconfig', 'attack surface', 'telnet'],
    slides: [
      { title: 'Services Are Doors', html: `
        <p>A <strong>service</strong> is a background program that runs without a logged-in user. Each running service can listen on a network port, read files, or run code &mdash; every one is a potential way in. The results category <strong>Insecure Services</strong> rewards you for closing unnecessary doors.</p>
        <p>Your job: find services that are unnecessary or insecure, and disable or stop them &mdash; <em>unless the README says the company needs them.</em></p>
      ` },
      { title: 'The Services Console', html: `
        <p>Open <strong>Services</strong> from Run:</p>
        <pre><code>services.msc</code></pre>
        <p>For each service, note the <strong>Status</strong> (Running/Stopped) and <strong>Startup Type</strong> (Automatic/Manual/Disabled). To disable a service: right-click &rarr; Properties &rarr; set Startup type to <strong>Disabled</strong>, then click <strong>Stop</strong>.</p>
        <div class="callout danger"><strong>Do not disable core services.</strong> Disabling something Windows needs (RPC, DCOM, DHCP Client, DNS Client, Plug and Play) can break the machine and lose points. Focus on clearly insecure or unnecessary ones.</div>
      ` },
      { title: 'Common Insecure Services to Look For', html: `
        <div class="table-wrap"><table>
          <thead><tr><th>Service / feature</th><th>Why risky</th><th>Action</th></tr></thead>
          <tbody>
            <tr><td>Telnet</td><td>Unencrypted remote shell</td><td>Disable</td></tr>
            <tr><td>FTP Server</td><td>Cleartext credentials</td><td>Disable unless required</td></tr>
            <tr><td>Remote Registry</td><td>Remote registry edits</td><td>Disable</td></tr>
            <tr><td>Simple TCP/IP Services</td><td>Legacy echo/chargen</td><td>Disable</td></tr>
            <tr><td>SNMP</td><td>Often default community strings</td><td>Disable unless needed</td></tr>
            <tr><td>Windows Remote Management</td><td>Remote access</td><td>Restrict</td></tr>
            <tr><td>Print Spooler</td><td>PrintNightmare-type flaws</td><td>Disable if no printers needed</td></tr>
          </tbody>
        </table></div>
      ` },
      { title: 'Managing Services from the Command Line', html: `
        <p>PowerShell is faster for bulk work:</p>
        <pre><code><span class="cmt"># List running services</span>
Get-Service | Where-Object Status -eq 'Running'

<span class="cmt"># Find a specific one</span>
Get-Service -Name TlntSvr

<span class="cmt"># Stop and disable it</span>
Stop-Service -Name TlntSvr -Force
Set-Service -Name TlntSvr -StartupType Disabled</code></pre>
        <p>Legacy commands still work:</p>
        <pre><code>sc query TlntSvr
sc config TlntSvr start= disabled
sc stop TlntSvr</code></pre>
      ` },
      { title: 'Startup Programs', html: `
        <p>Programs that launch at startup are also attack surface and often against policy (games, chat clients, unknown executables). Check four places:</p>
        <ul>
          <li><strong>Task Manager &rarr; Startup</strong> tab.</li>
          <li><strong>Startup folders</strong>: <code>shell:startup</code> and <code>shell:common startup</code>.</li>
          <li><strong>Registry Run keys</strong>: <code>HKLM\...\Run</code> and <code>HKCU\...\Run</code>.</li>
          <li><strong>Task Scheduler</strong> for scheduled launches.</li>
        </ul>
        <pre><code><span class="cmt"># List startup items (PowerShell)</span>
Get-CimInstance Win32_StartupCommand | Select Name, Command, Location, User</code></pre>
      ` },
      { title: 'Scheduled Tasks', html: `
        <p>Malware often persists via <strong>Task Scheduler</strong>. Open it with:</p>
        <pre><code>taskschd.msc</code></pre>
        <p>Look for tasks with suspicious names, tasks pointing to files in Temp/Downloads, or tasks that run as SYSTEM. Disable or delete ones that are clearly malicious or against policy.</p>
        <div class="callout tip">Legitimate Windows tasks exist too &mdash; do not delete Microsoft maintenance tasks you do not understand.</div>
      ` },
      { title: 'Services Checklist', html: `
        <ol>
          <li>Read the README for required services (web, mail, file share).</li>
          <li>Open <code>services.msc</code>; scan for Telnet, FTP, Remote Registry, SNMP.</li>
          <li>Disable clearly insecure/unnecessary services; stop them.</li>
          <li>Review Task Manager &rarr; Startup and the Run registry keys.</li>
          <li>Review Task Scheduler for rogue tasks.</li>
          <li>Reboot if needed and confirm nothing required broke.</li>
          <li>Log every service you changed.</li>
        </ol>
      ` }
    ],
    quiz: [
      { q: 'Which tool manages Windows services?', opts: ['services.msc', 'secpol.msc', 'lusrmgr.msc', 'diskmgmt.msc'], answer: 0, explain: 'services.msc is the Services console.' },
      { q: 'Which service is a classic insecure finding?', opts: ['DHCP Client', 'Telnet', 'DNS Client', 'Plug and Play'], answer: 1, explain: 'Telnet is an unencrypted remote shell and should be disabled.' },
      { q: 'Which registry keys commonly hold startup programs?', opts: ['HKLM\\...\\Run', 'HKLM\\...\\Services', 'HKCU\\...\\Printers', 'HKLM\\...\\Fonts'], answer: 0, explain: 'Run keys under HKLM and HKCU launch programs at logon.' },
      { q: 'Malware persistence is often found in:', opts: ['Task Scheduler', 'The Recycle Bin', 'Fonts', 'The clock'], answer: 0, explain: 'Scheduled tasks are a common persistence mechanism.' },
      { q: 'Disabling which service can break Windows and lose points?', opts: ['Telnet', 'SNMP', 'Remote Procedure Call (RPC)', 'FTP'], answer: 2, explain: 'Core services like RPC are required; disabling them breaks the system.' }
    ]
  },

  /* ===================== WIN 6 ===================== */
  {
    id: 'win-6', track: 'windows', num: 6,
    title: 'Software Removal & Unauthorized Programs',
    summary: 'Uninstall prohibited software, games and hacking tools, and understand the policy-violation category.',
    tags: ['windows', 'software', 'uninstall', 'policy', 'games', 'winget'],
    slides: [
      { title: 'The Policy-Violation Category', html: `
        <p>Scenarios often include software the company forbids: games, torrent clients, remote-access tools, or "hacking" utilities. Removing these falls under <strong>Policy violations</strong> and <strong>Malware</strong> in the results. The README or a company policy file usually lists what is banned.</p>
        <p>Your job: identify prohibited or unnecessary programs and uninstall them cleanly.</p>
      ` },
      { title: 'Finding Installed Programs', html: `
        <p>The GUI is <strong>Settings &rarr; Apps &rarr; Installed apps</strong>, or the classic <strong>Programs and Features</strong>:</p>
        <pre><code>appwiz.cpl</code></pre>
        <p>From PowerShell you can enumerate everything installed, including silent installs:</p>
        <pre><code><span class="cmt"># 64-bit and 32-bit uninstall entries</span>
Get-ItemProperty HKLM:\Software\Microsoft\Windows\CurrentVersion\Uninstall\* |
  Select DisplayName, Publisher
Get-ItemProperty HKLM:\Software\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall\* |
  Select DisplayName, Publisher</code></pre>
      ` },
      { title: 'Uninstalling Cleanly', html: `
        <p>Prefer the proper uninstaller over deleting folders, so registry entries and services are removed too.</p>
        <pre><code><span class="cmt"># Using winget (if available)</span>
winget list
winget uninstall "Program Name"

<span class="cmt"># Using the MSI product code</span>
Get-WmiObject -Class Win32_Product | Where-Object Name -like "*Game*" |
  ForEach-Object { $_.Uninstall() }</code></pre>
        <div class="callout warn"><strong>Win32_Product is slow.</strong> Querying it triggers a consistency check on every MSI. Use it sparingly, or use the registry enumeration above to find names first.</div>
      ` },
      { title: 'What Usually Counts as Prohibited', html: `
        <div class="table-wrap"><table>
          <thead><tr><th>Category</th><th>Examples</th></tr></thead>
          <tbody>
            <tr><td>Games</td><td>Steam titles, Minecraft, solitaire packs</td></tr>
            <tr><td>P2P / torrent</td><td>uTorrent, BitTorrent</td></tr>
            <tr><td>Remote access</td><td>TeamViewer, AnyDesk (if not authorized)</td></tr>
            <tr><td>Hacking tools</td><td>Wireshark, Nmap, password crackers (unless required)</td></tr>
            <tr><td>Media / chat</td><td>Unauthorized media players, chat clients</td></tr>
            <tr><td>Toolbars / adware</td><td>Bundled browser toolbars</td></tr>
          </tbody>
        </table></div>
        <div class="callout tip"><strong>Read the policy.</strong> Some scenarios explicitly allow certain tools (e.g., a networking tool for an IT role). Do not remove something the README permits.</div>
      ` },
      { title: 'Browser Extensions & Toolbars', html: `
        <p>Adware often installs browser extensions. Check each browser's extension page and remove anything unfamiliar. Also check for rogue <strong>proxy settings</strong> (Settings &rarr; Network &rarr; Proxy) and changed <strong>DNS</strong> or <strong>hosts file</strong> entries:</p>
        <pre><code>C:\Windows\System32\drivers\etc\hosts</code></pre>
        <p>A hosts file full of redirects is a strong sign of compromise.</p>
      ` },
      { title: 'Software Removal Checklist', html: `
        <ol>
          <li>Read the README / policy for prohibited software.</li>
          <li>Enumerate installed programs (Settings, appwiz.cpl, PowerShell).</li>
          <li>Uninstall prohibited or unnecessary programs via their uninstallers.</li>
          <li>Remove rogue browser extensions and toolbars.</li>
          <li>Check proxy settings and the hosts file.</li>
          <li>Re-run a Defender scan after removals.</li>
          <li>Log what you removed.</li>
        </ol>
      ` }
    ],
    quiz: [
      { q: 'Which control panel opens Programs and Features?', opts: ['appwiz.cpl', 'secpol.msc', 'services.msc', 'ncpa.cpl'], answer: 0, explain: 'appwiz.cpl opens the classic uninstall list.' },
      { q: 'Why prefer the uninstaller over deleting the folder?', opts: ['It is slower', 'It also removes registry entries and services', 'It disables the firewall', 'It changes the README'], answer: 1, explain: 'Proper uninstallers clean up registry and service entries too.' },
      { q: 'A hosts file full of redirects suggests:', opts: ['Normal Windows behaviour', 'Possible compromise/adware', 'A firewall rule', 'A password policy'], answer: 1, explain: 'Redirect entries in the hosts file are a common malware symptom.' },
      { q: 'Which should you do BEFORE removing software?', opts: ['Reboot', 'Read the policy/README to see what is prohibited', 'Disable Defender', 'Delete the guest account'], answer: 1, explain: 'You must know what is actually prohibited before removing anything.' },
      { q: 'Which command lists installed programs from the registry?', opts: ['Get-ItemProperty HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\*', 'net user', 'ipconfig', 'sfc /scannow'], answer: 0, explain: 'That registry path holds installed-program entries.' }
    ]
  },

  /* ===================== WIN 7 ===================== */
  {
    id: 'win-7', track: 'windows', num: 7,
    title: 'Group Policy & Local Security',
    summary: 'Use gpedit.msc and secpol.msc to enforce security settings, and understand how policy overrides local configuration.',
    tags: ['windows', 'gpedit', 'group policy', 'secpol', 'audit', 'uac'],
    slides: [
      { title: 'What Group Policy Does', html: `
        <p><strong>Group Policy</strong> is how administrators enforce settings across a machine. In competition you use the <strong>Local Group Policy Editor</strong> (<code>gpedit.msc</code>) and <strong>Local Security Policy</strong> (<code>secpol.msc</code>).</p>
        <p>Policy is powerful because it <em>overrides</em> local settings &mdash; which is exactly why attackers use it to disable protections, and why you must check it when a setting refuses to change.</p>
      ` },
      { title: 'Opening the Editors', html: `
        <pre><code><span class="cmt">:: Local Group Policy Editor (Pro/Enterprise/Server)</span>
gpedit.msc

<span class="cmt">:: Local Security Policy</span>
secpol.msc</code></pre>
        <p>Two main branches in gpedit:</p>
        <ul>
          <li><strong>Computer Configuration</strong> &mdash; applies to the whole machine.</li>
          <li><strong>User Configuration</strong> &mdash; applies to users.</li>
        </ul>
        <div class="callout tip"><strong>Home editions.</strong> Windows Home lacks gpedit.msc; use the registry or <code>secedit</code> instead.</div>
      ` },
      { title: 'Security Settings You Should Review', html: `
        <p>Under <strong>Computer Configuration &rarr; Windows Settings &rarr; Security Settings</strong>:</p>
        <div class="table-wrap"><table>
          <thead><tr><th>Area</th><th>What to check</th></tr></thead>
          <tbody>
            <tr><td>Account Policies</td><td>Password &amp; lockout (see the Password module)</td></tr>
            <tr><td>Local Policies &rarr; Audit Policy</td><td>Logon and object access auditing enabled</td></tr>
            <tr><td>Local Policies &rarr; User Rights</td><td>Who may log on locally / remotely</td></tr>
            <tr><td>Local Policies &rarr; Security Options</td><td>UAC, guest, anonymous access</td></tr>
            <tr><td>Windows Firewall</td><td>Profiles on</td></tr>
          </tbody>
        </table></div>
      ` },
      { title: 'User Account Control (UAC)', html: `
        <p><strong>UAC</strong> prompts for elevation when an admin-level action is attempted. Malware sometimes lowers it. Check under:</p>
        <pre><code>Computer Configuration → Windows Settings → Security Settings →
  Local Policies → Security Options →
  "User Account Control: Run all administrators in Admin Approval Mode"</code></pre>
        <p>It should be <strong>Enabled</strong>. The registry equivalent is under <code>HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System</code> (<code>EnableLUA = 1</code>).</p>
      ` },
      { title: 'Auditing and Logging', html: `
        <p>Auditing records security-relevant events so they can be reviewed. Enable at least:</p>
        <ul>
          <li><strong>Audit logon events</strong> &mdash; success and failure.</li>
          <li><strong>Audit account management</strong> &mdash; user/group changes.</li>
          <li><strong>Audit policy change</strong> &mdash; changes to security policy.</li>
        </ul>
        <p>View events in <strong>Event Viewer</strong> (<code>eventvwr.msc</code>), especially the <strong>Security</strong> log. Failed logons (Event ID 4625) can reveal brute-force attempts.</p>
      ` },
      { title: 'Applying and Verifying Policy', html: `
        <p>After changes, apply and verify:</p>
        <pre><code>gpupdate /force

<span class="cmt">:: See the resultant policy set</span>
gpresult /r
<span class="cmt">:: Full HTML report</span>
gpresult /h C:\report.html</code></pre>
        <div class="callout warn"><strong>Policy beats UI.</strong> If a checkbox in the normal Settings app is greyed out, a policy is controlling it. Change the policy, not the app.</div>
      ` },
      { title: 'Group Policy Checklist', html: `
        <ol>
          <li>Open <code>secpol.msc</code>; review Account Policies.</li>
          <li>Open <code>gpedit.msc</code>; review Security Options (UAC, guest, anonymous).</li>
          <li>Enable logon and account-management auditing.</li>
          <li>Check User Rights Assignment for unexpected privileges.</li>
          <li>Look for policies that disable Defender, updates, or the firewall.</li>
          <li><code>gpupdate /force</code> and verify with <code>gpresult /r</code>.</li>
        </ol>
      ` }
    ],
    quiz: [
      { q: 'Which tool opens the Local Group Policy Editor?', opts: ['gpedit.msc', 'lusrmgr.msc', 'services.msc', 'perfmon.msc'], answer: 0, explain: 'gpedit.msc opens Local Group Policy Editor.' },
      { q: 'If a Settings toggle is greyed out, the cause is usually:', opts: ['A hardware fault', 'A Group Policy controlling it', 'A missing driver', 'The guest account'], answer: 1, explain: 'Policy overrides local settings and can grey them out.' },
      { q: 'Which command applies policy changes immediately?', opts: ['gpupdate /force', 'net user', 'sfc /scannow', 'chkdsk'], answer: 0, explain: 'gpupdate /force reapplies policy.' },
      { q: 'UAC should normally be:', opts: ['Disabled', 'Enabled (Admin Approval Mode)', 'Set to never notify', 'Removed via registry'], answer: 1, explain: 'UAC should run administrators in Admin Approval Mode.' },
      { q: 'Which Event ID indicates a failed logon?', opts: ['4624', '4625', '4688', '1000'], answer: 1, explain: 'Event ID 4625 is a failed logon; 4624 is a success.' }
    ]
  },

  /* ===================== WIN 8 ===================== */
  {
    id: 'win-8', track: 'windows', num: 8,
    title: 'Windows Firewall & File Sharing',
    summary: 'Turn on all firewall profiles, manage inbound rules, and lock down SMB shares and file permissions.',
    tags: ['windows', 'firewall', 'smb', 'shares', 'permissions', 'net share'],
    slides: [
      { title: 'The Firewall Is a Scored Category', html: `
        <p>The Windows Defender Firewall has three <strong>profiles</strong>: <strong>Domain</strong>, <strong>Private</strong>, and <strong>Public</strong>. All three should be <strong>on</strong>. A common finding is the Public profile turned off.</p>
        <pre><code><span class="cmt"># Check all profiles</span>
Get-NetFirewallProfile | Select Name, Enabled

<span class="cmt"># Turn them all on</span>
Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled True</code></pre>
        <div class="callout danger">Output like <code>Public False</code> is a finding on its own. Enable it and re-check.</div>
      ` },
      { title: 'Managing Firewall Rules', html: `
        <p>Open the advanced console:</p>
        <pre><code>wf.msc</code></pre>
        <p>Review <strong>Inbound Rules</strong>. Remove or disable rules that open unnecessary ports. Be careful with rules Windows needs (core networking, DHCP).</p>
        <pre><code><span class="cmt"># List enabled inbound allow rules</span>
Get-NetFirewallRule -Direction Inbound -Enabled True -Action Allow |
  Select DisplayName, Profile</code></pre>
      ` },
      { title: 'File Sharing and SMB', html: `
        <p>Open SMB shares expose files to the network. List them:</p>
        <pre><code>net share
<span class="cmt"># PowerShell</span>
Get-SmbShare</code></pre>
        <p>Administrative shares (<code>C$</code>, <code>ADMIN$</code>, <code>IPC$</code>) are normal. Non-default shares pointing at user data are worth reviewing &mdash; restrict their permissions or remove them if the README does not require them.</p>
        <div class="callout tip">If the scenario runs a file server, harden the share (least-privilege permissions) rather than deleting it.</div>
      ` },
      { title: 'NTFS Permissions', html: `
        <p>Share permissions and <strong>NTFS permissions</strong> both apply; the most restrictive wins. Check the <strong>Security</strong> tab of a folder (or use icacls):</p>
        <pre><code><span class="cmt">:: View permissions on a folder</span>
icacls "C:\CompanyData"

<span class="cmt">:: Remove Everyone's full control</span>
icacls "C:\CompanyData" /remove:g Everyone

<span class="cmt">:: Grant a group modify</span>
icacls "C:\CompanyData" /grant "Users:(OI)(CI)M"</code></pre>
        <p>Watch for <strong>Everyone</strong> or <strong>ANONYMOUS LOGON</strong> with write or full control &mdash; classic findings.</p>
      ` },
      { title: 'Network Settings & Discovery', html: `
        <p>Turn off features that expose the machine on untrusted networks:</p>
        <ul>
          <li><strong>Network discovery</strong> and <strong>File and printer sharing</strong> &mdash; off on Public networks.</li>
          <li><strong>Remote Desktop</strong> &mdash; disabled unless required.</li>
          <li><strong>SMBv1</strong> &mdash; disable the legacy, vulnerable protocol.</li>
        </ul>
        <pre><code><span class="cmt"># Disable SMBv1 (PowerShell, admin)</span>
Disable-WindowsOptionalFeature -Online -FeatureName smb1protocol -NoRestart</code></pre>
      ` },
      { title: 'Firewall & Sharing Checklist', html: `
        <ol>
          <li><code>Get-NetFirewallProfile</code> &mdash; ensure Domain, Private, Public all True.</li>
          <li>Review inbound rules in <code>wf.msc</code>; close unnecessary ports.</li>
          <li><code>net share</code> &mdash; review non-default shares.</li>
          <li><code>icacls</code> &mdash; remove Everyone/Anonymous write access.</li>
          <li>Disable Network Discovery / File Sharing on Public networks.</li>
          <li>Disable SMBv1; disable Remote Desktop if not required.</li>
          <li>Log changes.</li>
        </ol>
      ` }
    ],
    quiz: [
      { q: 'Which PowerShell command checks firewall profile status?', opts: ['Get-NetFirewallProfile', 'net share', 'ipconfig', 'Get-Service'], answer: 0, explain: 'Get-NetFirewallProfile shows each profile\u2019s Enabled state.' },
      { q: 'How many Windows Firewall profiles are there?', opts: ['1', '2', '3', '4'], answer: 2, explain: 'Domain, Private, and Public.' },
      { q: 'Which tool opens the advanced firewall console?', opts: ['wf.msc', 'secpol.msc', 'services.msc', 'diskmgmt.msc'], answer: 0, explain: 'wf.msc is Windows Firewall with Advanced Security.' },
      { q: 'A classic NTFS permission finding is:', opts: ['A group with Modify', 'Everyone with Full Control', 'SYSTEM with Full Control', 'Administrators with Full Control'], answer: 1, explain: 'Everyone/Anonymous with write or full control is a finding.' },
      { q: 'Which legacy protocol should be disabled?', opts: ['SMBv3', 'SMBv1', 'TCP', 'HTTPS'], answer: 1, explain: 'SMBv1 is legacy and vulnerable; disable it.' }
    ]
  }
);
