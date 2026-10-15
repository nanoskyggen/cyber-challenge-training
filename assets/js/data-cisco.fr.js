/* ============================================================
   DONNÉES — Volet Réseautique Cisco
   Durcissement de Cisco IOS, commutation et le défi Packet Tracer
   ============================================================ */
window.CDA_DATA_FR = window.CDA_DATA_FR || { tracks: [], modules: [] };

window.CDA_DATA_FR.modules.push(
  /* ===================== CISCO 1 ===================== */
  {
    id: 'cisco-1', track: 'cisco', num: 1,
    title: 'Fondamentaux de Cisco IOS et durcissement des appareils',
    summary: 'Naviguez dans IOS, sécurisez les lignes console et VTY, chiffrez les mots de passe, activez SSH et fermez le plan de gestion que les attaquants adorent.',
    tags: ['cisco', 'ios', 'ssh', 'vty', 'console', 'enable secret', 'hardening'],
    slides: [
      { title: 'Découvrir Cisco IOS', html: `
        <p>Le <strong>Défi réseautique Cisco</strong> est une partie notée de CyberPatriot. On vous donne des commutateurs et des routeurs dans <strong>Cisco Packet Tracer</strong> et vous devez les durcir, puis accomplir une petite tâche réseau. Tout se fait par l\u2019interface de ligne de commande, <strong>IOS</strong>.</p>
        <p>IOS comporte trois modes principaux, et vous devez gravir l\u2019échelle pour faire des changements :</p>
        <div class="pillarGrid">
          <div class="pillarCard"><h3>EXEC utilisateur</h3><p class="small">Invite : <code>Switch&gt;</code>. Vue en lecture seule. Atteint à la connexion.</p></div>
          <div class="pillarCard"><h3>EXEC privilégié</h3><p class="small">Invite : <code>Switch#</code>. Atteint avec <code>enable</code>. Toutes les commandes <code>show</code>.</p></div>
          <div class="pillarCard"><h3>Configuration globale</h3><p class="small">Invite : <code>Switch(config)#</code>. Atteint avec <code>configure terminal</code>. Modifiez les réglages ici.</p></div>
        </div>
        <pre><code>Switch&gt; enable
Switch# configure terminal
Switch(config)#</code></pre>
      ` },
      { title: 'Identité de l\u2019appareil et bannières', html: `
        <p>Commencez par les bases : un nom d\u2019hôte clair et une bannière d\u2019avertissement légale. La bannière compte &mdash; c\u2019est un élément de durcissement noté, car elle établit que l\u2019accès non autorisé est interdit.</p>
        <pre><code>Switch(config)# hostname SW1
SW1(config)# banner motd #Authorized access only. Disconnect immediately.#</code></pre>
        <p>Le <code>#</code> est un délimiteur ; vous pouvez utiliser n\u2019importe quel caractère absent du message. La bannière apparaît avant la connexion.</p>
      ` },
      { title: 'Mots de passe et chiffrement des secrets', html: `
        <p>Il y a plusieurs mots de passe à définir, et le <em>type</em> compte. <code>enable secret</code> stocke une empreinte forte ; l\u2019ancien <code>enable password</code> est faible et ne devrait jamais être utilisé.</p>
        <pre><code><span class="cmt">! Mot de passe fort et haché pour le mode privilégié</span>
SW1(config)# enable secret Str0ngPass!

<span class="cmt">! Chiffrer tout mot de passe en clair restant dans la configuration</span>
SW1(config)# service password-encryption

<span class="cmt">! Longueur minimale du mot de passe</span>
SW1(config)# security passwords min-length 10</code></pre>
        <div class="callout tip"><strong>service password-encryption</strong> masque les mots de passe en clair dans <code>show running-config</code>. C\u2019est un chiffrement faible, mais c\u2019est une case à cocher notée.</div>
      ` },
      { title: 'Sécuriser la ligne console', html: `
        <p>Le port console correspond à un accès physique. Verrouillez-le avec un mot de passe et un délai pour qu\u2019un terminal laissé sans surveillance ne puisse pas être détourné.</p>
        <pre><code>SW1(config)# line console 0
SW1(config-line)# password C0nsolePass!
SW1(config-line)# login
SW1(config-line)# exec-timeout 5 0
SW1(config-line)# logging synchronous</code></pre>
        <p><code>exec-timeout 5 0</code> déconnecte une session inactive après 5 minutes et 0 seconde.</p>
      ` },
      { title: 'Activer SSH sur les lignes VTY', html: `
        <p>La gestion à distance devrait utiliser <strong>SSH</strong>, jamais Telnet. Cette séquence génère une clé RSA, active SSHv2 et force les lignes VTY à n\u2019accepter que SSH.</p>
        <pre><code>SW1(config)# ip domain-name cyber.local
SW1(config)# username admin privilege 15 secret Adm1nPass!
SW1(config)# crypto key generate rsa
<span class="cmt">! Lorsque le module est demandé, choisissez 1024 ou 2048</span>
SW1(config)# ip ssh version 2

SW1(config)# line vty 0 4
SW1(config-line)# transport input ssh
SW1(config-line)# login local
SW1(config-line)# exec-timeout 5 0</code></pre>
        <div class="callout warn"><strong>transport input ssh</strong> est la ligne clé. Elle refuse Telnet, fermant la faille en clair. <code>login local</code> fait que l\u2019appareil vérifie la base de noms d\u2019utilisateurs locale.</div>
      ` },
      { title: 'Désactiver les services de gestion inutilisés', html: `
        <p>Les appareils Cisco sont livrés avec des services qui élargissent la surface d\u2019attaque. Désactivez ceux dont le scénario n\u2019a pas besoin.</p>
        <pre><code>SW1(config)# no ip http server        <span class="cmt">! désactiver l'interface web</span>
SW1(config)# no ip http secure-server <span class="cmt">! désactiver l'interface HTTPS</span>
SW1(config)# no cdp run               <span class="cmt">! arrêter la publicité via CDP</span>
SW1(config)# no ip domain-lookup      <span class="cmt">! arrêter les recherches DNS sur les fautes de frappe</span></code></pre>
        <p>Enregistrez votre travail une fois terminé &mdash; les changements non enregistrés sont perdus au rechargement :</p>
        <pre><code>SW1# copy running-config startup-config
<span class="cmt">! ou simplement :</span>
SW1# write memory</code></pre>
      ` },
      { title: 'Liste de vérification — durcissement IOS', html: `
        <ol>
          <li>Définissez un nom d\u2019hôte et une bannière d\u2019avertissement à la connexion.</li>
          <li><code>enable secret</code> (pas <code>enable password</code>).</li>
          <li><code>service password-encryption</code> et <code>security passwords min-length</code>.</li>
          <li>Ligne console : mot de passe, <code>login</code>, <code>exec-timeout</code>.</li>
          <li>Créez un utilisateur admin local ; générez les clés RSA ; <code>ip ssh version 2</code>.</li>
          <li>Lignes VTY : <code>transport input ssh</code>, <code>login local</code>, délai.</li>
          <li>Désactivez le serveur HTTP, CDP et la recherche de domaine si inutilisés.</li>
          <li><code>copy running-config startup-config</code>.</li>
        </ol>
      ` }
    ],
    quiz: [
      { q: 'Quelle commande entre en mode de configuration globale ?', opts: ['enable', 'configure terminal', 'show run', 'copy run start'], answer: 1, explain: 'configure terminal (config t) entre en configuration globale.' },
      { q: 'Quelle commande stocke un mot de passe privilégié fort et haché ?', opts: ['enable password', 'enable secret', 'line password', 'service password-encryption'], answer: 1, explain: 'enable secret utilise une empreinte forte.' },
      { q: 'Quelle commande VTY force l\u2019accès SSH seulement ?', opts: ['transport input ssh', 'login local', 'exec-timeout 5', 'ip ssh version 2'], answer: 0, explain: 'transport input ssh refuse Telnet sur les lignes VTY.' },
      { q: 'Quelle commande désactive le serveur web de l\u2019appareil ?', opts: ['no ip http server', 'no cdp run', 'no ip domain-lookup', 'shutdown'], answer: 0, explain: 'no ip http server désactive l\u2019interface de gestion HTTP.' },
      { q: 'Quelle commande enregistre la configuration en cours dans la configuration de démarrage ?', opts: ['save', 'copy running-config startup-config', 'commit', 'export'], answer: 1, explain: 'copy run start (ou write memory) rend la configuration persistante.' }
    ]
  },

  /* ===================== CISCO 2 ===================== */
  {
    id: 'cisco-2', track: 'cisco', num: 2,
    title: 'Commutation : VLAN et sécurité des ports',
    summary: 'Créez des VLAN, configurez les ports d\u2019accès et de liaison, et verrouillez les ports de commutation avec la sécurité des ports pour arrêter les appareils pirates.',
    tags: ['cisco', 'vlan', 'trunk', 'switchport', 'port security', 'mac', 'layer 2'],
    slides: [
      { title: 'Pourquoi les VLAN existent', html: `
        <p>Un <strong>VLAN</strong> (réseau local virtuel) divise un commutateur physique en plusieurs réseaux logiques isolés. Les appareils de VLAN différents ne peuvent pas communiquer directement, ce qui limite jusqu\u2019où un attaquant peut se déplacer.</p>
        <p>Deux types de ports comptent :</p>
        <div class="pillarGrid">
          <div class="pillarCard"><h3>Port d'accès</h3><p class="small">Se connecte à un appareil final (PC, imprimante). Transporte le trafic d'<em>un seul</em> VLAN.</p></div>
          <div class="pillarCard"><h3>Port de liaison (trunk)</h3><p class="small">Relie les commutateurs entre eux. Transporte <em>plusieurs</em> VLAN, en étiquetant les trames avec 802.1Q.</p></div>
        </div>
      ` },
      { title: 'Créer et nommer des VLAN', html: `
        <pre><code>SW1(config)# vlan 10
SW1(config-vlan)# name Staff
SW1(config-vlan)# exit

SW1(config)# vlan 20
SW1(config-vlan)# name Guests
SW1(config-vlan)# exit

<span class="cmt">! Vérifier</span>
SW1# show vlan brief</code></pre>
        <div class="callout tip"><strong>Le VLAN 1 est spécial.</strong> C\u2019est le VLAN par défaut et il ne devrait pas transporter le trafic des utilisateurs. De nombreux guides de durcissement disent de déplacer la gestion hors du VLAN 1 et de le laisser inutilisé.</div>
      ` },
      { title: 'Configurer les ports d\u2019accès', html: `
        <p>Placez les ports des appareils finaux dans le bon VLAN. Utilisez <code>interface range</code> pour en faire plusieurs d\u2019un coup.</p>
        <pre><code>SW1(config)# interface range fastEthernet 0/1 - 10
SW1(config-if-range)# switchport mode access
SW1(config-if-range)# switchport access vlan 10
SW1(config-if-range)# exit

SW1(config)# interface range fastEthernet 0/11 - 15
SW1(config-if-range)# switchport mode access
SW1(config-if-range)# switchport access vlan 20</code></pre>
        <p>Définissez toujours <code>switchport mode access</code> explicitement &mdash; cela empêche un appareil de négocier une liaison et de sauter entre VLAN.</p>
      ` },
      { title: 'Configurer les liaisons (trunks)', html: `
        <p>Les liaisons entre commutateurs doivent transporter les VLAN utilisés. Restreignez une liaison aux seuls VLAN dont elle a besoin.</p>
        <pre><code>SW1(config)# interface gigabitEthernet 0/1
SW1(config-if)# switchport mode trunk
SW1(config-if)# switchport trunk allowed vlan 10,20
SW1(config-if)# switchport trunk native vlan 99
SW1(config-if)# exit</code></pre>
        <div class="callout warn"><strong>VLAN natif.</strong> Les trames du VLAN natif ne sont pas étiquetées, ce qui est un risque de sécurité s\u2019il s\u2019agit du VLAN 1. Changez-le pour un VLAN inutilisé (par ex. 99) aux deux extrémités de la liaison.</div>
      ` },
      { title: 'Sécurité des ports', html: `
        <p>La sécurité des ports limite quelles adresses MAC peuvent apparaître sur un port. Elle empêche un attaquant de brancher un appareil pirate ou d\u2019inonder la table MAC.</p>
        <pre><code>SW1(config)# interface fastEthernet 0/1
SW1(config-if)# switchport mode access
SW1(config-if)# switchport port-security
SW1(config-if)# switchport port-security maximum 1
SW1(config-if)# switchport port-security mac-address sticky
SW1(config-if)# switchport port-security violation shutdown
SW1(config-if)# exit</code></pre>
        <p>Trois modes de violation :</p>
        <div class="table-wrap"><table>
          <thead><tr><th>Mode</th><th>Comportement</th></tr></thead>
          <tbody>
            <tr><td>protect</td><td>Écarte silencieusement les trames fautives</td></tr>
            <tr><td>restrict</td><td>Écarte les trames, consigne et incrémente un compteur</td></tr>
            <tr><td>shutdown</td><td>Désactive le port (err-disabled) &mdash; le plus strict</td></tr>
          </tbody>
        </table></div>
      ` },
      { title: 'Désactiver les ports inutilisés', html: `
        <p>Un port inutilisé est une porte ouverte. Désactivez chaque port qui n\u2019est pas utilisé et placez-le dans un VLAN inutilisé.</p>
        <pre><code>SW1(config)# interface range fastEthernet 0/16 - 24
SW1(config-if-range)# shutdown
SW1(config-if-range)# switchport mode access
SW1(config-if-range)# switchport access vlan 999
SW1(config-if-range)# exit

<span class="cmt">! Vérifier l'état des ports</span>
SW1# show interfaces status</code></pre>
        <div class="callout tip"><strong>VLAN trou noir.</strong> Placer les ports inutilisés dans un VLAN dédié inutilisé (999) signifie que même si l\u2019un est réactivé, il ne peut rien atteindre.</div>
      ` },
      { title: 'Liste de vérification — commutation', html: `
        <ol>
          <li><code>show vlan brief</code> &mdash; confirmez que les VLAN requis existent.</li>
          <li>Ports d\u2019accès réglés à <code>mode access</code> dans le bon VLAN.</li>
          <li>Liaisons réglées à <code>mode trunk</code> avec <code>allowed vlan</code> restreint.</li>
          <li>VLAN natif changé hors du VLAN 1.</li>
          <li>Sécurité des ports sur les ports utilisateurs (maximum, sticky, violation).</li>
          <li>Ports inutilisés désactivés et déplacés vers un VLAN inutilisé.</li>
          <li>Enregistrez la configuration.</li>
        </ol>
      ` }
    ],
    quiz: [
      { q: 'Quel type de port transporte plusieurs VLAN entre commutateurs ?', opts: ['Accès', 'Liaison (trunk)', 'Console', 'Auxiliaire'], answer: 1, explain: 'Les ports de liaison transportent plusieurs VLAN avec des étiquettes 802.1Q.' },
      { q: 'Quelle commande place un port dans le VLAN 10 ?', opts: ['switchport access vlan 10', 'vlan 10', 'switchport mode trunk', 'name Staff'], answer: 0, explain: 'switchport access vlan 10 assigne le VLAN d\u2019accès.' },
      { q: 'Quelle violation de sécurité des ports désactive le port ?', opts: ['protect', 'restrict', 'shutdown', 'deny'], answer: 2, explain: 'shutdown met le port en err-disabled.' },
      { q: 'Pourquoi changer le VLAN natif à partir du VLAN 1 ?', opts: ['C\u2019est plus rapide', 'Les trames non étiquetées sur le VLAN 1 sont un risque', 'C\u2019est exigé pour les liaisons', 'Pour activer SSH'], answer: 1, explain: 'Les trames du VLAN natif ne sont pas étiquetées ; le déplacer hors du VLAN 1 réduit le risque.' },
      { q: 'Que faire des ports de commutation inutilisés ?', opts: ['Les laisser ouverts', 'Les désactiver et les déplacer vers un VLAN inutilisé', 'Les régler en trunk', 'Activer seulement la sécurité des ports'], answer: 1, explain: 'Désactivez et mettez en trou noir les ports inutilisés.' }
    ]
  },

  /* ===================== CISCO 3 ===================== */
  {
    id: 'cisco-3', track: 'cisco', num: 3,
    title: 'Routage, ACL et le défi Packet Tracer',
    summary: 'Configurez les interfaces et les routes statiques, contrôlez le trafic avec les ACL et abordez la tâche réseautique Packet Tracer de façon méthodique.',
    tags: ['cisco', 'routing', 'static route', 'acl', 'packet tracer', 'interfaces'],
    slides: [
      { title: 'Configurer les interfaces', html: `
        <p>Un routeur a besoin d\u2019adresses sur ses interfaces avant de pouvoir router. Un commutateur a besoin d\u2019une adresse de gestion (une SVI) pour être joignable.</p>
        <pre><code><span class="cmt">! Interface de routeur</span>
R1(config)# interface gigabitEthernet 0/0
R1(config-if)# ip address 192.168.10.1 255.255.255.0
R1(config-if)# no shutdown
R1(config-if)# exit

<span class="cmt">! Adresse de gestion de commutateur (SVI)</span>
SW1(config)# interface vlan 10
SW1(config-if)# ip address 192.168.10.2 255.255.255.0
SW1(config-if)# no shutdown</code></pre>
        <div class="callout warn"><strong>no shutdown.</strong> Les interfaces Cisco sont administrativement désactivées par défaut. L\u2019oublier est la raison la plus courante pour laquelle une liaison « ne fonctionne pas ».</div>
      ` },
      { title: 'Routage statique', html: `
        <p>Si le scénario utilise le routage statique, vous indiquez à chaque appareil où envoyer le trafic qu\u2019il ne connaît pas. La route par défaut est le fourre-tout.</p>
        <pre><code><span class="cmt">! Route vers un réseau précis via un saut suivant</span>
R1(config)# ip route 192.168.20.0 255.255.255.0 10.0.0.2

<span class="cmt">! Route par défaut (envoyer tout ce qui est inconnu vers la passerelle)</span>
R1(config)# ip route 0.0.0.0 0.0.0.0 10.0.0.2

<span class="cmt">! Vérifier la table de routage</span>
R1# show ip route</code></pre>
        <p>Repérez les codes de route : <code>C</code> connecté, <code>S</code> statique, <code>O</code> OSPF, <code>D</code> EIGRP, <code>R</code> RIP.</p>
      ` },
      { title: 'Listes de contrôle d\u2019accès (ACL)', html: `
        <p>Une <strong>ACL</strong> filtre le trafic en faisant correspondre les paquets et en les autorisant ou les refusant. Elles sont traitées de haut en bas, et il y a un <code>deny any</code> implicite à la fin.</p>
        <pre><code><span class="cmt">! ACL standard : correspondance par source seulement</span>
R1(config)# access-list 10 permit 192.168.10.0 0.0.0.255
R1(config)# access-list 10 deny any

<span class="cmt">! ACL étendue : correspondance source, destination, protocole, port</span>
R1(config)# access-list 100 permit tcp 192.168.10.0 0.0.0.255 any eq 80
R1(config)# access-list 100 permit tcp 192.168.10.0 0.0.0.255 any eq 443
R1(config)# access-list 100 deny ip any any</code></pre>
        <div class="callout tip"><strong>Masques génériques.</strong> Cisco utilise des masques génériques, pas des masques de sous-réseau. <code>0.0.0.255</code> correspond à tout un /24. <code>0.0.0.0</code> correspond à un seul hôte.</div>
      ` },
      { title: 'Appliquer les ACL aux interfaces', html: `
        <p>Une ACL ne fait rien tant que vous ne l\u2019appliquez pas à une interface, dans une direction.</p>
        <pre><code>R1(config)# interface gigabitEthernet 0/0
R1(config-if)# ip access-group 100 in
R1(config-if)# exit

<span class="cmt">! Vérifier</span>
R1# show ip interface gigabitEthernet 0/0
R1# show access-lists</code></pre>
        <p>Les ACL <strong>standard</strong> devraient être placées près de la <em>destination</em> ; les ACL <strong>étendues</strong> près de la <em>source</em>. C\u2019est la règle classique d\u2019examen.</p>
      ` },
      { title: 'Le défi Packet Tracer', html: `
        <p>Dans le défi Cisco de CyberPatriot, vous téléchargez un fichier <strong>Packet Tracer</strong>, durcissez les appareils et accomplissez une tâche &mdash; puis soumettez. Une méthode reproductible rapporte des points :</p>
        <ol>
          <li><strong>Lisez le fichier d\u2019instructions</strong> de l\u2019activité. Il énumère les exigences exactes.</li>
          <li><strong>Inventoriez les appareils.</strong> Notez les noms d\u2019hôtes, les interfaces et les configurations existantes.</li>
          <li><strong>Durcissez chaque appareil</strong> en utilisant la liste de vérification du module 1 (bannière, secrets, SSH, délais).</li>
          <li><strong>Réalisez la tâche de topologie</strong> (VLAN, routage, ACL) exactement comme spécifié.</li>
          <li><strong>Vérifiez avec les commandes show</strong> : <code>show run</code>, <code>show ip route</code>, <code>show vlan brief</code>, <code>show ip interface brief</code>.</li>
          <li><strong>Testez la connectivité</strong> avec ping/traceroute depuis les PC simulés.</li>
          <li><strong>Enregistrez</strong> (<code>copy run start</code>) et soumettez le fichier.</li>
        </ol>
        <div class="callout danger"><strong>Vérifiez votre score.</strong> Le rapport de notation vous indique quels éléments ne sont pas encore satisfaits. Relisez les instructions &mdash; de petites différences de formulation (numéro de VLAN, ordre des ACL) coûtent des points.</div>
      ` },
      { title: 'Commandes de vérification utiles', html: `
        <p>Ces commandes <code>show</code> sont vos yeux. Mémorisez-les.</p>
        <div class="table-wrap"><table>
          <thead><tr><th>Commande</th><th>Ce qu\u2019elle montre</th></tr></thead>
          <tbody>
            <tr><td><code>show running-config</code></td><td>La configuration active complète</td></tr>
            <tr><td><code>show ip interface brief</code></td><td>Les IP des interfaces et l\u2019état up/down</td></tr>
            <tr><td><code>show ip route</code></td><td>La table de routage</td></tr>
            <tr><td><code>show vlan brief</code></td><td>Les VLAN et leurs ports membres</td></tr>
            <tr><td><code>show interfaces status</code></td><td>VLAN, vitesse et état par port</td></tr>
            <tr><td><code>show access-lists</code></td><td>Les règles ACL et les compteurs d\u2019accès</td></tr>
            <tr><td><code>show port-security</code></td><td>L\u2019état de la sécurité des ports par port</td></tr>
          </tbody>
        </table></div>
      ` }
    ],
    quiz: [
      { q: 'Pourquoi une interface peut-elle rester down après l\u2019avoir configurée ?', opts: ['no shutdown manquant', 'Mauvais nom d\u2019hôte', 'Pas de bannière', 'Pas d\u2019ACL'], answer: 0, explain: 'Les interfaces Cisco sont administrativement down jusqu\u2019à no shutdown.' },
      { q: 'Quelle commande ajoute une route par défaut ?', opts: ['ip route 0.0.0.0 0.0.0.0 <saut suivant>', 'ip default-gateway <ip>', 'route default', 'ip route any'], answer: 0, explain: 'La route tout à zéro est la route par défaut.' },
      { q: 'Quelle est la règle implicite à la fin de chaque ACL ?', opts: ['permit any', 'deny any', 'log all', 'drop ssh'], answer: 1, explain: 'Chaque ACL se termine par un deny any implicite.' },
      { q: 'Les ACL étendues devraient être placées le plus près de :', opts: ['La destination', 'La source', 'Le cœur', 'La passerelle'], answer: 1, explain: 'Placez les ACL étendues près de la source ; les standard près de la destination.' },
      { q: 'Quelle commande montre la table de routage ?', opts: ['show ip route', 'show vlan', 'show run', 'show interfaces status'], answer: 0, explain: 'show ip route affiche la table de routage.' }
    ]
  }
);
