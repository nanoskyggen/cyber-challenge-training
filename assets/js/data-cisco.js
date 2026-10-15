/* ============================================================
   DATA — Cisco Networking Track
   Cisco IOS hardening, switching and the Packet Tracer Challenge
   ============================================================ */
window.CDA_DATA = window.CDA_DATA || { tracks: [], modules: [] };

window.CDA_DATA.modules.push(
  /* ===================== CISCO 1 ===================== */
  {
    id: 'cisco-1', track: 'cisco', num: 1,
    title: 'Cisco IOS Fundamentals & Device Hardening',
    summary: 'Navigate IOS, secure console and VTY lines, encrypt passwords, enable SSH, and shut down the management plane attackers love.',
    tags: ['cisco', 'ios', 'ssh', 'vty', 'console', 'enable secret', 'hardening'],
    slides: [
      { title: 'Meet Cisco IOS', html: `
        <p>The <strong>Cisco Networking Challenge</strong> is a scored part of CyberPatriot. You are given switches and routers in <strong>Cisco Packet Tracer</strong> and must harden them, then complete a small networking task. Everything is done through the command-line interface, <strong>IOS</strong>.</p>
        <p>IOS has three main modes, and you must climb the ladder to make changes:</p>
        <div class="pillarGrid">
          <div class="pillarCard"><h3>User EXEC</h3><p class="small">Prompt: <code>Switch&gt;</code>. Read-only view. Entered at login.</p></div>
          <div class="pillarCard"><h3>Privileged EXEC</h3><p class="small">Prompt: <code>Switch#</code>. Reached with <code>enable</code>. Full show commands.</p></div>
          <div class="pillarCard"><h3>Global Config</h3><p class="small">Prompt: <code>Switch(config)#</code>. Reached with <code>configure terminal</code>. Change settings here.</p></div>
        </div>
        <pre><code>Switch&gt; enable
Switch# configure terminal
Switch(config)#</code></pre>
      ` },
      { title: 'Device Identity and Banners', html: `
        <p>Start with the basics: a clear hostname and a legal warning banner. The banner matters &mdash; it is a scored hardening item because it establishes that unauthorised access is prohibited.</p>
        <pre><code>Switch(config)# hostname SW1
SW1(config)# banner motd #Authorized access only. Disconnect immediately.#</code></pre>
        <p>The <code>#</code> is a delimiter; you may use any character that does not appear in the message. The banner appears before login.</p>
      ` },
      { title: 'Passwords and Secret Encryption', html: `
        <p>There are several passwords to set, and the <em>type</em> matters. <code>enable secret</code> stores a strong hash; the older <code>enable password</code> is weak and should never be used.</p>
        <pre><code><span class="cmt">! Strong hashed password for privileged mode</span>
SW1(config)# enable secret Str0ngPass!

<span class="cmt">! Encrypt any remaining plaintext passwords in the config</span>
SW1(config)# service password-encryption

<span class="cmt">! Minimum password length</span>
SW1(config)# security passwords min-length 10</code></pre>
        <div class="callout tip"><strong>service password-encryption</strong> hides plaintext passwords in <code>show running-config</code>. It is a weak cipher, but it is a scored checkbox.</div>
      ` },
      { title: 'Securing the Console Line', html: `
        <p>The console port is physical access. Lock it with a password and a timeout so an unattended terminal cannot be hijacked.</p>
        <pre><code>SW1(config)# line console 0
SW1(config-line)# password C0nsolePass!
SW1(config-line)# login
SW1(config-line)# exec-timeout 5 0
SW1(config-line)# logging synchronous</code></pre>
        <p><code>exec-timeout 5 0</code> logs out an idle session after 5 minutes and 0 seconds.</p>
      ` },
      { title: 'Enabling SSH on VTY Lines', html: `
        <p>Remote management should use <strong>SSH</strong>, never Telnet. This sequence generates an RSA key, enables SSHv2, and forces the VTY lines to accept only SSH.</p>
        <pre><code>SW1(config)# ip domain-name cyber.local
SW1(config)# username admin privilege 15 secret Adm1nPass!
SW1(config)# crypto key generate rsa
<span class="cmt">! When prompted for modulus, choose 1024 or 2048</span>
SW1(config)# ip ssh version 2

SW1(config)# line vty 0 4
SW1(config-line)# transport input ssh
SW1(config-line)# login local
SW1(config-line)# exec-timeout 5 0</code></pre>
        <div class="callout warn"><strong>transport input ssh</strong> is the key line. It refuses Telnet, closing the cleartext hole. <code>login local</code> makes the device check the local username database.</div>
      ` },
      { title: 'Disabling Unused Management Services', html: `
        <p>Cisco devices ship with services that broaden the attack surface. Turn off the ones the scenario does not need.</p>
        <pre><code>SW1(config)# no ip http server        <span class="cmt">! disable web UI</span>
SW1(config)# no ip http secure-server <span class="cmt">! disable HTTPS UI</span>
SW1(config)# no cdp run               <span class="cmt">! stop advertising via CDP</span>
SW1(config)# no ip domain-lookup      <span class="cmt">! stop DNS lookups on typos</span></code></pre>
        <p>Save your work when done &mdash; unsaved changes are lost on reload:</p>
        <pre><code>SW1# copy running-config startup-config
<span class="cmt">! or simply:</span>
SW1# write memory</code></pre>
      ` },
      { title: 'IOS Hardening Checklist', html: `
        <ol>
          <li>Set a hostname and a login warning banner.</li>
          <li><code>enable secret</code> (not <code>enable password</code>).</li>
          <li><code>service password-encryption</code> and <code>security passwords min-length</code>.</li>
          <li>Console line: password, <code>login</code>, <code>exec-timeout</code>.</li>
          <li>Create a local admin user; generate RSA keys; <code>ip ssh version 2</code>.</li>
          <li>VTY lines: <code>transport input ssh</code>, <code>login local</code>, timeout.</li>
          <li>Disable HTTP server, CDP, and domain lookup if unused.</li>
          <li><code>copy running-config startup-config</code>.</li>
        </ol>
      ` }
    ],
    quiz: [
      { q: 'Which command enters global configuration mode?', opts: ['enable', 'configure terminal', 'show run', 'copy run start'], answer: 1, explain: 'configure terminal (config t) enters global config.' },
      { q: 'Which stores a strong hashed privileged password?', opts: ['enable password', 'enable secret', 'line password', 'service password-encryption'], answer: 1, explain: 'enable secret uses a strong hash.' },
      { q: 'Which VTY command forces SSH-only access?', opts: ['transport input ssh', 'login local', 'exec-timeout 5', 'ip ssh version 2'], answer: 0, explain: 'transport input ssh refuses Telnet on the VTY lines.' },
      { q: 'Which command disables the device web server?', opts: ['no ip http server', 'no cdp run', 'no ip domain-lookup', 'shutdown'], answer: 0, explain: 'no ip http server turns off the HTTP management UI.' },
      { q: 'Which command saves the running config to startup config?', opts: ['save', 'copy running-config startup-config', 'commit', 'export'], answer: 1, explain: 'copy run start (or write memory) persists the config.' }
    ]
  },

  /* ===================== CISCO 2 ===================== */
  {
    id: 'cisco-2', track: 'cisco', num: 2,
    title: 'Switching: VLANs & Port Security',
    summary: 'Create VLANs, configure access and trunk ports, and lock down switch ports with port security to stop rogue devices.',
    tags: ['cisco', 'vlan', 'trunk', 'switchport', 'port security', 'mac', 'layer 2'],
    slides: [
      { title: 'Why VLANs Exist', html: `
        <p>A <strong>VLAN</strong> (Virtual LAN) splits one physical switch into several isolated logical networks. Devices in different VLANs cannot talk directly, which limits how far an attacker can move.</p>
        <p>Two port types matter:</p>
        <div class="pillarGrid">
          <div class="pillarCard"><h3>Access port</h3><p class="small">Connects to an end device (PC, printer). Carries traffic for <em>one</em> VLAN.</p></div>
          <div class="pillarCard"><h3>Trunk port</h3><p class="small">Connects switches to each other. Carries <em>many</em> VLANs, tagging frames with 802.1Q.</p></div>
        </div>
      ` },
      { title: 'Creating and Naming VLANs', html: `
        <pre><code>SW1(config)# vlan 10
SW1(config-vlan)# name Staff
SW1(config-vlan)# exit

SW1(config)# vlan 20
SW1(config-vlan)# name Guests
SW1(config-vlan)# exit

<span class="cmt">! Verify</span>
SW1# show vlan brief</code></pre>
        <div class="callout tip"><strong>VLAN 1 is special.</strong> It is the default VLAN and should not carry user traffic. Many hardening guides say to move management off VLAN 1 and leave it unused.</div>
      ` },
      { title: 'Configuring Access Ports', html: `
        <p>Put end-device ports into the correct VLAN. Use <code>interface range</code> to do many at once.</p>
        <pre><code>SW1(config)# interface range fastEthernet 0/1 - 10
SW1(config-if-range)# switchport mode access
SW1(config-if-range)# switchport access vlan 10
SW1(config-if-range)# exit

SW1(config)# interface range fastEthernet 0/11 - 15
SW1(config-if-range)# switchport mode access
SW1(config-if-range)# switchport access vlan 20</code></pre>
        <p>Always set <code>switchport mode access</code> explicitly &mdash; it prevents a device from negotiating a trunk and hopping VLANs.</p>
      ` },
      { title: 'Configuring Trunks', html: `
        <p>Trunk links between switches must carry the VLANs in use. Restrict a trunk to only the VLANs it needs.</p>
        <pre><code>SW1(config)# interface gigabitEthernet 0/1
SW1(config-if)# switchport mode trunk
SW1(config-if)# switchport trunk allowed vlan 10,20
SW1(config-if)# switchport trunk native vlan 99
SW1(config-if)# exit</code></pre>
        <div class="callout warn"><strong>Native VLAN.</strong> Frames on the native VLAN are untagged, which is a security risk if it is VLAN 1. Change it to an unused VLAN (e.g. 99) on both ends of the trunk.</div>
      ` },
      { title: 'Port Security', html: `
        <p>Port security limits which MAC addresses may appear on a port. It stops an attacker from plugging in a rogue device or flooding the MAC table.</p>
        <pre><code>SW1(config)# interface fastEthernet 0/1
SW1(config-if)# switchport mode access
SW1(config-if)# switchport port-security
SW1(config-if)# switchport port-security maximum 1
SW1(config-if)# switchport port-security mac-address sticky
SW1(config-if)# switchport port-security violation shutdown
SW1(config-if)# exit</code></pre>
        <p>Three violation modes:</p>
        <div class="table-wrap"><table>
          <thead><tr><th>Mode</th><th>Behaviour</th></tr></thead>
          <tbody>
            <tr><td>protect</td><td>Drops offending frames silently</td></tr>
            <tr><td>restrict</td><td>Drops frames, logs and increments a counter</td></tr>
            <tr><td>shutdown</td><td>Disables the port (err-disabled) &mdash; the strictest</td></tr>
          </tbody>
        </table></div>
      ` },
      { title: 'Disabling Unused Ports', html: `
        <p>An unused port is an open door. Shut down every port that is not in use, and place it in an unused VLAN.</p>
        <pre><code>SW1(config)# interface range fastEthernet 0/16 - 24
SW1(config-if-range)# shutdown
SW1(config-if-range)# switchport mode access
SW1(config-if-range)# switchport access vlan 999
SW1(config-if-range)# exit

<span class="cmt">! Verify port status</span>
SW1# show interfaces status</code></pre>
        <div class="callout tip"><strong>Black-hole VLAN.</strong> Placing unused ports in a dedicated unused VLAN (999) means even if one is re-enabled, it cannot reach anything.</div>
      ` },
      { title: 'Switching Checklist', html: `
        <ol>
          <li><code>show vlan brief</code> &mdash; confirm required VLANs exist.</li>
          <li>Access ports set to <code>mode access</code> in the right VLAN.</li>
          <li>Trunks set to <code>mode trunk</code> with <code>allowed vlan</code> restricted.</li>
          <li>Native VLAN changed off VLAN 1.</li>
          <li>Port security on user ports (maximum, sticky, violation).</li>
          <li>Unused ports shut down and moved to an unused VLAN.</li>
          <li>Save config.</li>
        </ol>
      ` }
    ],
    quiz: [
      { q: 'Which port type carries multiple VLANs between switches?', opts: ['Access', 'Trunk', 'Console', 'Auxiliary'], answer: 1, explain: 'Trunk ports carry multiple VLANs using 802.1Q tags.' },
      { q: 'Which command puts a port into VLAN 10?', opts: ['switchport access vlan 10', 'vlan 10', 'switchport mode trunk', 'name Staff'], answer: 0, explain: 'switchport access vlan 10 assigns the access VLAN.' },
      { q: 'Which port-security violation disables the port?', opts: ['protect', 'restrict', 'shutdown', 'deny'], answer: 2, explain: 'shutdown err-disables the port.' },
      { q: 'Why change the native VLAN from VLAN 1?', opts: ['It is faster', 'Untagged frames on VLAN 1 are a risk', 'It is required for trunks', 'To enable SSH'], answer: 1, explain: 'Native VLAN frames are untagged; moving it off VLAN 1 reduces risk.' },
      { q: 'What should you do with unused switch ports?', opts: ['Leave them open', 'Shut them down and move to an unused VLAN', 'Set them to trunk', 'Enable port security only'], answer: 1, explain: 'Disable and black-hole unused ports.' }
    ]
  },

  /* ===================== CISCO 3 ===================== */
  {
    id: 'cisco-3', track: 'cisco', num: 3,
    title: 'Routing, ACLs & the Packet Tracer Challenge',
    summary: 'Configure interfaces and static routes, control traffic with ACLs, and approach the Packet Tracer networking task methodically.',
    tags: ['cisco', 'routing', 'static route', 'acl', 'packet tracer', 'interfaces'],
    slides: [
      { title: 'Configuring Interfaces', html: `
        <p>A router needs addresses on its interfaces before it can route. A switch needs a management address (an SVI) to be reachable.</p>
        <pre><code><span class="cmt">! Router interface</span>
R1(config)# interface gigabitEthernet 0/0
R1(config-if)# ip address 192.168.10.1 255.255.255.0
R1(config-if)# no shutdown
R1(config-if)# exit

<span class="cmt">! Switch management address (SVI)</span>
SW1(config)# interface vlan 10
SW1(config-if)# ip address 192.168.10.2 255.255.255.0
SW1(config-if)# no shutdown</code></pre>
        <div class="callout warn"><strong>no shutdown.</strong> Cisco interfaces are administratively down by default. Forgetting this is the most common reason a link "does not work".</div>
      ` },
      { title: 'Static Routing', html: `
        <p>If the scenario uses static routing, you tell each device where to send traffic it does not know about. The default route is the catch-all.</p>
        <pre><code><span class="cmt">! Route to a specific network via a next-hop</span>
R1(config)# ip route 192.168.20.0 255.255.255.0 10.0.0.2

<span class="cmt">! Default route (send everything unknown to the gateway)</span>
R1(config)# ip route 0.0.0.0 0.0.0.0 10.0.0.2

<span class="cmt">! Verify the routing table</span>
R1# show ip route</code></pre>
        <p>Look for the route codes: <code>C</code> connected, <code>S</code> static, <code>O</code> OSPF, <code>D</code> EIGRP, <code>R</code> RIP.</p>
      ` },
      { title: 'Access Control Lists (ACLs)', html: `
        <p>An <strong>ACL</strong> filters traffic by matching packets and permitting or denying them. They are processed top-down, and there is an implicit <code>deny any</code> at the end.</p>
        <pre><code><span class="cmt">! Standard ACL: match by source only</span>
R1(config)# access-list 10 permit 192.168.10.0 0.0.0.255
R1(config)# access-list 10 deny any

<span class="cmt">! Extended ACL: match source, dest, protocol, port</span>
R1(config)# access-list 100 permit tcp 192.168.10.0 0.0.0.255 any eq 80
R1(config)# access-list 100 permit tcp 192.168.10.0 0.0.0.255 any eq 443
R1(config)# access-list 100 deny ip any any</code></pre>
        <div class="callout tip"><strong>Wildcard masks.</strong> Cisco uses wildcard masks, not subnet masks. <code>0.0.0.255</code> matches a whole /24. <code>0.0.0.0</code> matches one host.</div>
      ` },
      { title: 'Applying ACLs to Interfaces', html: `
        <p>An ACL does nothing until you apply it to an interface, in a direction.</p>
        <pre><code>R1(config)# interface gigabitEthernet 0/0
R1(config-if)# ip access-group 100 in
R1(config-if)# exit

<span class="cmt">! Verify</span>
R1# show ip interface gigabitEthernet 0/0
R1# show access-lists</code></pre>
        <p><strong>Standard</strong> ACLs should be placed close to the <em>destination</em>; <strong>extended</strong> ACLs close to the <em>source</em>. That is the classic exam rule.</p>
      ` },
      { title: 'The Packet Tracer Challenge', html: `
        <p>In the CyberPatriot Cisco challenge you download a <strong>Packet Tracer</strong> file, harden the devices, and complete a task &mdash; then submit. A repeatable method wins points:</p>
        <ol>
          <li><strong>Read the instructions file</strong> in the activity. It lists the exact requirements.</li>
          <li><strong>Inventory the devices.</strong> Note hostnames, interfaces, and existing configs.</li>
          <li><strong>Harden every device</strong> using the module 1 checklist (banner, secrets, SSH, timeouts).</li>
          <li><strong>Build the topology task</strong> (VLANs, routing, ACLs) exactly as specified.</li>
          <li><strong>Verify with show commands</strong>: <code>show run</code>, <code>show ip route</code>, <code>show vlan brief</code>, <code>show ip interface brief</code>.</li>
          <li><strong>Test connectivity</strong> with ping/traceroute from the simulated PCs.</li>
          <li><strong>Save</strong> (<code>copy run start</code>) and submit the file.</li>
        </ol>
        <div class="callout danger"><strong>Check your score.</strong> The scoring report tells you which items are still unmet. Re-read the instructions &mdash; small wording differences (VLAN number, ACL order) cost points.</div>
      ` },
      { title: 'Useful Verification Commands', html: `
        <p>These <code>show</code> commands are your eyes. Memorise them.</p>
        <div class="table-wrap"><table>
          <thead><tr><th>Command</th><th>What it shows</th></tr></thead>
          <tbody>
            <tr><td><code>show running-config</code></td><td>The full active configuration</td></tr>
            <tr><td><code>show ip interface brief</code></td><td>Interface IPs and up/down status</td></tr>
            <tr><td><code>show ip route</code></td><td>The routing table</td></tr>
            <tr><td><code>show vlan brief</code></td><td>VLANs and their member ports</td></tr>
            <tr><td><code>show interfaces status</code></td><td>Per-port VLAN, speed, status</td></tr>
            <tr><td><code>show access-lists</code></td><td>ACL rules and hit counts</td></tr>
            <tr><td><code>show port-security</code></td><td>Port-security state per port</td></tr>
          </tbody>
        </table></div>
      ` }
    ],
    quiz: [
      { q: 'Why might an interface stay down after configuring it?', opts: ['Missing no shutdown', 'Wrong hostname', 'No banner', 'No ACL'], answer: 0, explain: 'Cisco interfaces are administratively down until no shutdown.' },
      { q: 'Which command adds a default route?', opts: ['ip route 0.0.0.0 0.0.0.0 <next-hop>', 'ip default-gateway <ip>', 'route default', 'ip route any'], answer: 0, explain: 'The all-zeros route is the default route.' },
      { q: 'What is the implicit rule at the end of every ACL?', opts: ['permit any', 'deny any', 'log all', 'drop ssh'], answer: 1, explain: 'Every ACL ends with an implicit deny any.' },
      { q: 'Extended ACLs should be placed closest to the:', opts: ['Destination', 'Source', 'Core', 'Gateway'], answer: 1, explain: 'Place extended ACLs near the source; standard near the destination.' },
      { q: 'Which command shows the routing table?', opts: ['show ip route', 'show vlan', 'show run', 'show interfaces status'], answer: 0, explain: 'show ip route displays the routing table.' }
    ]
  }
);
